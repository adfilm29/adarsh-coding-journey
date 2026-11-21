(() => {
  "use strict";

  const canvas = document.getElementById("gameCanvas");
  const ctx = canvas.getContext("2d");
  const SIZE = 20;
  const CELL = canvas.width / SIZE;
  const $ = (id) => document.getElementById(id);

  const ui = {
    score: $("score"), best: $("best"), level: $("level"),
    state: $("gameState"), status: $("statusText"), overlay: $("overlay"),
    overlayIcon: $("overlayIcon"), overlayKicker: $("overlayKicker"),
    overlayTitle: $("overlayTitle"), overlayMessage: $("overlayMessage"),
    overlayButton: $("overlayButton"), start: $("startButton"),
    pause: $("pauseButton"), restart: $("restartButton"),
    difficulty: $("difficulty"), sound: $("soundToggle")
  };

  const speeds = { easy: 175, normal: 125, hard: 88 };
  let snake, direction, nextDirection, fly, frog, score, best, timer;
  let state = "ready";
  let tickCount = 0;
  let audioContext = null;
  let soundEnabled = true;

  try { best = Number(localStorage.getItem("snakeFrogBest")) || 0; }
  catch (_) { best = 0; }
  ui.best.textContent = String(best).padStart(3, "0");

  function randomCell() {
    return { x: Math.floor(Math.random() * SIZE), y: Math.floor(Math.random() * SIZE) };
  }

  function occupied(point, extra = []) {
    return snake.some((part) => part.x === point.x && part.y === point.y) ||
      extra.some((part) => part.x === point.x && part.y === point.y);
  }

  function safeRandomCell() {
    let point;
    let attempts = 0;
    do {
      point = randomCell();
      attempts += 1;
      if (attempts > 500) return { x: SIZE - 2, y: SIZE - 2 };
    } while (occupied(point, [frog]));
    return point;
  }

  function resetGame() {
    snake = [
      { x: 9, y: 10 }, { x: 8, y: 10 }, { x: 7, y: 10 },
      { x: 6, y: 10 }
    ];
    direction = { x: 1, y: 0 };
    nextDirection = { x: 1, y: 0 };
    score = 0;
    tickCount = 0;
    frog = { x: 14, y: 6 };
    fly = safeRandomCell();
    updateStats();
    draw();
  }

  function updateStats() {
    ui.score.textContent = String(score).padStart(3, "0");
    ui.best.textContent = String(best).padStart(3, "0");
    ui.level.textContent = "LEVEL " + String(Math.min(9, 1 + Math.floor(score / 50))).padStart(2, "0");
  }

  function setState(next) {
    state = next;
    const running = state === "running";
    ui.pause.disabled = !running && state !== "paused";
    ui.pause.querySelector("b").textContent = state === "paused" ? "Resume game" : "Pause game";
    ui.pause.querySelector("small").textContent = state === "paused" ? "Back to the garden" : "Take a breather";
    ui.state.textContent = ({ ready: "PRESS START", running: "● LIVE", paused: "Ⅱ PAUSED", over: "ROUND OVER" })[state];
    ui.status.textContent = ({ ready: "READY TO PLAY", running: "GAME IN PROGRESS", paused: "GAME PAUSED", over: "RUN COMPLETE" })[state];
    ui.overlay.classList.toggle("hidden", running);
    if (running) {
      ui.start.querySelector("b").textContent = "Game running";
      ui.start.disabled = true;
    } else {
      ui.start.querySelector("b").textContent = state === "paused" ? "Resume game" : state === "over" ? "Play again" : "Start game";
      ui.start.disabled = false;
    }
    if (state !== "running" && timer) {
      clearTimeout(timer);
      timer = null;
    }
    if (running) scheduleTick();
  }

  function showOverlay(icon, kicker, title, message, button) {
    ui.overlayIcon.textContent = icon;
    ui.overlayKicker.textContent = kicker;
    ui.overlayTitle.textContent = title;
    ui.overlayMessage.textContent = message;
    ui.overlayButton.innerHTML = button + ' <span>↗</span>';
  }

  function startGame() {
    if (state === "over") resetGame();
    if (state === "ready") resetGame();
    if (state === "paused") {
      setState("running");
      return;
    }
    if (state === "running") return;
    showOverlay("🐍", "A LITTLE ARCADE MAGIC", "Ready, player?", "Collect the glowing flies. Watch out for the frog — and your own tail.", "START GAME");
    setState("running");
  }

  function pauseGame() {
    if (state === "running") {
      showOverlay("⏸", "TAKE YOUR TIME", "Game paused", "The garden can wait. Resume when you're ready.", "RESUME GAME");
      setState("paused");
    } else if (state === "paused") {
      setState("running");
    }
  }

  function restartGame() {
    resetGame();
    showOverlay("🐍", "FRESH ROUND", "Ready, player?", "Collect the glowing flies. Watch out for the frog — and your own tail.", "START GAME");
    setState("ready");
  }

  function scheduleTick() {
    if (state !== "running") return;
    const speed = Math.max(58, speeds[ui.difficulty.value] - Math.floor(score / 50) * 6);
    timer = window.setTimeout(() => {
      step();
      if (state === "running") scheduleTick();
    }, speed);
  }

  function moveFrog() {
    if (tickCount % 2 !== 0) return;
    const options = [
      { x: 0, y: -1 }, { x: 0, y: 1 }, { x: -1, y: 0 }, { x: 1, y: 0 }
    ];
    const choices = options
      .map((v) => ({ x: frog.x + v.x, y: frog.y + v.y }))
      .filter((p) => p.x >= 0 && p.x < SIZE && p.y >= 0 && p.y < SIZE)
      .filter((p) => !snake.some((part) => part.x === p.x && part.y === p.y))
      .filter((p) => Math.abs(p.x - fly.x) + Math.abs(p.y - fly.y) > 0);

    if (!choices.length) return;
    // Usually wander randomly, but occasionally move toward the snake.
    const head = snake[0];
    choices.sort((a, b) => {
      const da = Math.abs(a.x - head.x) + Math.abs(a.y - head.y);
      const db = Math.abs(b.x - head.x) + Math.abs(b.y - head.y);
      return Math.random() < 0.35 ? da - db : Math.random() - 0.5;
    });
    frog = choices[0];
  }

  function step() {
    direction = nextDirection;
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
    const ateFly = head.x === fly.x && head.y === fly.y;
    const bodyToCheck = ateFly ? snake : snake.slice(0, -1);

    if (head.x < 0 || head.x >= SIZE || head.y < 0 || head.y >= SIZE ||
        bodyToCheck.some((part) => part.x === head.x && part.y === head.y) ||
        (head.x === frog.x && head.y === frog.y)) {
      endGame();
      return;
    }

    snake.unshift(head);
    if (ateFly) {
      score += 10;
      playTone(660, 0.09, "sine");
      if (score > best) {
        best = score;
        try { localStorage.setItem("snakeFrogBest", String(best)); } catch (_) {}
      }
      fly = safeRandomCell();
      // Don't spawn the fly on the frog or snake; safeRandomCell checks both.
    } else {
      snake.pop();
    }

    tickCount += 1;
    moveFrog();
    updateStats();
    draw();
  }

  function endGame() {
    playTone(150, 0.22, "sawtooth");
    showOverlay("💥", "THAT'S A WRAP", "Garden game over", "You scored " + score + " points. One more round? Your best is " + best + ".", "PLAY AGAIN");
    setState("over");
    draw();
  }

  function setDirection(name) {
    const vectors = {
      up: { x: 0, y: -1 }, down: { x: 0, y: 1 },
      left: { x: -1, y: 0 }, right: { x: 1, y: 0 }
    };
    const candidate = vectors[name];
    if (!candidate) return;
    if (candidate.x === -direction.x && candidate.y === -direction.y) return;
    nextDirection = candidate;
    if (state === "ready") startGame();
  }

  function roundedRect(x, y, w, h, r) {
    ctx.beginPath();
    ctx.roundRect(x, y, w, h, r);
    ctx.fill();
  }

  function drawGrid() {
    ctx.fillStyle = "#0d1e16";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    for (let y = 0; y < SIZE; y += 1) {
      for (let x = 0; x < SIZE; x += 1) {
        ctx.fillStyle = (x + y) % 2 === 0 ? "#10241a" : "#11271c";
        ctx.fillRect(x * CELL, y * CELL, CELL, CELL);
      }
    }
    ctx.strokeStyle = "rgba(184,223,174,.045)";
    ctx.lineWidth = 1;
    for (let i = 0; i <= SIZE; i += 1) {
      ctx.beginPath(); ctx.moveTo(i * CELL, 0); ctx.lineTo(i * CELL, canvas.height); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(0, i * CELL); ctx.lineTo(canvas.width, i * CELL); ctx.stroke();
    }
    // Subtle garden specks.
    for (let i = 0; i < 28; i += 1) {
      const x = (i * 137 + 41) % canvas.width;
      const y = (i * 211 + 73) % canvas.height;
      ctx.fillStyle = "rgba(179,218,135,.12)";
      ctx.fillRect(x, y, 2, 2);
    }
  }

  function drawFly() {
    const cx = (fly.x + 0.5) * CELL;
    const cy = (fly.y + 0.5) * CELL;
    const pulse = 1 + Math.sin(Date.now() / 180) * 0.12;
    const glow = ctx.createRadialGradient(cx, cy, 2, cx, cy, 18 * pulse);
    glow.addColorStop(0, "rgba(255,204,102,.45)");
    glow.addColorStop(1, "rgba(255,204,102,0)");
    ctx.fillStyle = glow; ctx.beginPath(); ctx.arc(cx, cy, 18 * pulse, 0, Math.PI * 2); ctx.fill();
    ctx.save(); ctx.translate(cx, cy);
    ctx.fillStyle = "#ffd477";
    ctx.beginPath(); ctx.ellipse(-4, -3, 4, 2.5, -.5, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(4, -3, 4, 2.5, .5, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = "#fff2be"; ctx.beginPath(); ctx.arc(0, 1, 3, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = "#fff7d4"; ctx.beginPath(); ctx.arc(0, -1, 1.2, 0, Math.PI * 2); ctx.fill();
    ctx.restore();
  }

  function drawFrog() {
    const x = frog.x * CELL, y = frog.y * CELL;
    ctx.save();
    // Soft shadow
    ctx.fillStyle = "rgba(0,0,0,.25)"; ctx.beginPath(); ctx.ellipse(x + 15, y + 17, 11, 4, 0, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = "#75c96f";
    roundedRect(x + 4, y + 7, 22, 17, 7);
    ctx.fillStyle = "#9be582";
    ctx.beginPath(); ctx.arc(x + 9, y + 8, 5, 0, Math.PI * 2); ctx.arc(x + 21, y + 8, 5, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = "#10251a";
    ctx.beginPath(); ctx.arc(x + 9, y + 8, 1.8, 0, Math.PI * 2); ctx.arc(x + 21, y + 8, 1.8, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = "#315d37"; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(x + 15, y + 15, 4, .25, Math.PI - .25); ctx.stroke();
    ctx.restore();
  }

  function drawSnake() {
    snake.forEach((part, index) => {
      const inset = index === 0 ? 2 : 3;
      const x = part.x * CELL + inset;
      const y = part.y * CELL + inset;
      const size = CELL - inset * 2;
      const gradient = ctx.createLinearGradient(x, y, x + size, y + size);
      gradient.addColorStop(0, index === 0 ? "#d7ff87" : "#9cda69");
      gradient.addColorStop(1, index === 0 ? "#86d96f" : "#4c9d5d");
      ctx.fillStyle = gradient;
      roundedRect(x, y, size, size, 6);
      if (index === 0) {
        ctx.fillStyle = "#17351f";
        let eyes;
        if (direction.x === 1) eyes = [[x + size - 5, y + 5], [x + size - 5, y + size - 5]];
        else if (direction.x === -1) eyes = [[x + 5, y + 5], [x + 5, y + size - 5]];
        else if (direction.y === -1) eyes = [[x + 5, y + 5], [x + size - 5, y + 5]];
        else eyes = [[x + 5, y + size - 5], [x + size - 5, y + size - 5]];
        eyes.forEach(([ex, ey]) => { ctx.beginPath(); ctx.arc(ex, ey, 1.7, 0, Math.PI * 2); ctx.fill(); });
      } else {
        ctx.fillStyle = "rgba(235,255,194,.12)";
        ctx.beginPath(); ctx.arc(x + size / 2, y + size / 2, 2, 0, Math.PI * 2); ctx.fill();
      }
    });
  }

  function draw() {
    drawGrid();
    if (fly) drawFly();
    if (frog) drawFrog();
    if (snake) drawSnake();
  }

  function playTone(frequency, duration, type) {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      audioContext = audioContext || new AudioCtx();
      if (audioContext.state === "suspended") audioContext.resume();
      const oscillator = audioContext.createOscillator();
      const gain = audioContext.createGain();
      oscillator.type = type;
      oscillator.frequency.value = frequency;
      gain.gain.setValueAtTime(0.055, audioContext.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration);
      oscillator.connect(gain); gain.connect(audioContext.destination);
      oscillator.start(); oscillator.stop(audioContext.currentTime + duration);
    } catch (_) { /* Audio is optional; gameplay must continue without it. */ }
  }

  document.addEventListener("keydown", (event) => {
    const keys = {
      ArrowUp: "up", KeyW: "up", ArrowDown: "down", KeyS: "down",
      ArrowLeft: "left", KeyA: "left", ArrowRight: "right", KeyD: "right"
    };
    if (keys[event.code]) {
      event.preventDefault();
      setDirection(keys[event.code]);
    } else if (event.code === "Space") {
      event.preventDefault();
      if (state === "ready") startGame(); else pauseGame();
    } else if (event.code === "KeyR") {
      restartGame();
    }
  });

  document.querySelectorAll("[data-dir]").forEach((button) => {
    button.addEventListener("click", () => setDirection(button.dataset.dir));
  });
  ui.start.addEventListener("click", startGame);
  ui.pause.addEventListener("click", pauseGame);
  ui.restart.addEventListener("click", restartGame);
  ui.overlayButton.addEventListener("click", () => {
    if (state === "paused") setState("running");
    else startGame();
  });
  ui.difficulty.addEventListener("change", () => {
    if (state === "running") {
      clearTimeout(timer);
      scheduleTick();
    }
  });
  ui.sound.addEventListener("change", () => { soundEnabled = ui.sound.checked; });

  // Prevent swipe/scroll gestures from hijacking the on-screen controls.
  document.querySelectorAll(".dpad").forEach((button) => {
    button.addEventListener("pointerdown", (event) => event.preventDefault());
  });

  resetGame();
  showOverlay("🐍", "A LITTLE ARCADE MAGIC", "Ready, player?", "Collect the glowing flies. Watch out for the frog — and your own tail.", "START GAME");
  setState("ready");
})();