const places = [
 {id:1,name:"Bara Imambara",category:"Heritage",emoji:"🏛️",area:"Husainabad",hours:2,cost:80,description:"Explore the grand 18th-century complex and its famous labyrinth, Bhul-Bhulaiya.",tone:"#514534"},
 {id:2,name:"Chota Imambara",category:"Heritage",emoji:"🕌",area:"Husainabad",hours:1,cost:50,description:"Admire ornate interiors, chandeliers and elegant Awadhi architecture.",tone:"#39483e"},
 {id:3,name:"Rumi Darwaza",category:"Heritage",emoji:"🚪",area:"Husainabad",hours:.5,cost:0,description:"Pause by Lucknow’s celebrated gateway and take in its striking silhouette.",tone:"#5a4936"},
 {id:4,name:"British Residency",category:"Heritage",emoji:"🏚️",area:"Qaiserbagh",hours:1.5,cost:25,description:"Walk through atmospheric ruins that preserve an important chapter of history.",tone:"#484536"},
 {id:5,name:"Ambedkar Memorial Park",category:"Culture",emoji:"🏛️",area:"Gomti Nagar",hours:1.5,cost:20,description:"A monumental public space known for sandstone architecture and open courtyards.",tone:"#55443b"},
 {id:6,name:"Janeshwar Mishra Park",category:"Nature",emoji:"🌳",area:"Gomti Nagar",hours:1.5,cost:10,description:"Take a breather among lawns, lakeside paths and wide green spaces.",tone:"#334c3c"},
 {id:7,name:"Gomti Riverfront",category:"Nature",emoji:"🌊",area:"Gomti Nagar",hours:1,cost:0,description:"Enjoy an easy evening stroll beside the river. Check access locally.",tone:"#354b4c"},
 {id:8,name:"Hazratganj",category:"Shopping",emoji:"🛍️",area:"Hazratganj",hours:1.5,cost:0,description:"Browse a lively central district for shops, cafés and old-Lucknow atmosphere.",tone:"#50443a"},
 {id:9,name:"Chattar Manzil",category:"Culture",emoji:"🏰",area:"Qaiserbagh",hours:1,cost:0,description:"See the distinctive palace exterior and learn about its layered history.",tone:"#465044"},
 {id:10,name:"Aminabad Market",category:"Shopping",emoji:"🧵",area:"Aminabad",hours:2,cost:0,description:"Explore busy lanes known for traditional shopping, textiles and local finds.",tone:"#594338"}
];
const $ = s => document.querySelector(s);
const money = n => "₹" + Math.round(n).toLocaleString("en-IN");
let category = "All", search = "";
let trip;
try { trip = JSON.parse(localStorage.getItem("nawabiSafarTrip") || "[]"); if (!Array.isArray(trip)) trip = []; }
catch (error) { trip = []; }

function notify(message) {
 const toast = $("#toast");
 toast.textContent = message; toast.classList.add("show");
 clearTimeout(notify.timer); notify.timer = setTimeout(() => toast.classList.remove("show"), 2200);
}
function visiblePlaces() {
 return places.filter(p => (category === "All" || p.category === category) &&
  (p.name + " " + p.category + " " + p.area + " " + p.description).toLowerCase().includes(search));
}
function renderPlaces() {
 const grid = $("#placeGrid"); grid.innerHTML = "";
 visiblePlaces().forEach(p => {
  const added = trip.includes(p.id), card = document.createElement("article");
  card.className = "place-card";
  card.innerHTML = '<div class="place-art" style="background:' + p.tone + '"><span class="place-number">' + String(p.id).padStart(2,"0") + '</span><span class="place-type">' + p.category.toUpperCase() + '</span><span class="place-emoji">' + p.emoji + '</span></div>' +
   '<div class="place-body"><h3>' + p.name + '</h3><p>' + p.description + '</p><div class="place-meta"><span>⌖ ' + p.area + '</span><span>◷ ' + p.hours + ' hr</span></div><button class="add-place ' + (added ? "added" : "") + '" data-add="' + p.id + '">' + (added ? "✓ Added to your safar" : "+ Add to my safar") + '</button></div>';
  grid.appendChild(card);
 });
 $("#emptyMessage").classList.toggle("hidden", visiblePlaces().length !== 0);
 grid.querySelectorAll("[data-add]").forEach(button => button.addEventListener("click", () => togglePlace(Number(button.dataset.add))));
 document.querySelectorAll(".filter").forEach(button => button.classList.toggle("active", button.dataset.category === category));
}
function renderTrip() {
 const list = $("#itineraryList"); list.innerHTML = "";
 const chosen = trip.map(id => places.find(p => p.id === id)).filter(Boolean);
 if (!chosen.length) list.innerHTML = '<div class="empty-itinerary"><span>✧</span><b>Your story starts here.</b><p>Add places from Discover to create your own Lucknow itinerary.</p></div>';
 chosen.forEach((p,index) => {
  const row = document.createElement("div"); row.className = "stop";
  row.innerHTML = '<span class="stop-index">' + String(index+1).padStart(2,"0") + '</span><div class="stop-info"><b>' + p.name + '</b><small>' + p.area + ' · ' + p.hours + ' hr · ' + money(p.cost) + ' indicative entry estimate</small></div><button class="remove" data-remove="' + p.id + '" aria-label="Remove ' + p.name + '">×</button>';
  list.appendChild(row);
 });
 list.querySelectorAll("[data-remove]").forEach(button => button.addEventListener("click", () => togglePlace(Number(button.dataset.remove))));
 const totalHours = chosen.reduce((sum,p) => sum + p.hours,0), totalCost = chosen.reduce((sum,p) => sum + p.cost,0);
 $("#itineraryCount").textContent = chosen.length + " stop" + (chosen.length === 1 ? "" : "s") + " selected";
 $("#summaryPlaces").textContent = chosen.length;
 $("#summaryTime").textContent = totalHours.toFixed(1).replace(".0","") + " hrs";
 $("#summaryCost").textContent = money(totalCost);
 const budget = Math.max(0, Number($("#budgetInput").value) || 0);
 $("#budgetMeter").style.width = (budget ? Math.min(100,totalCost / budget * 100) : 0) + "%";
 $("#budgetNote").textContent = !chosen.length ? "Add places to see how your budget looks." :
  budget === 0 ? "Enter a budget above ₹0 to compare." :
  totalCost > budget ? "Your selected entry estimates exceed budget by " + money(totalCost-budget) + "." :
  "You have about " + money(budget-totalCost) + " left for food, travel and extras.";
 $("#savedCount").textContent = chosen.length;
}
function render() { renderPlaces(); renderTrip(); }
function togglePlace(id) {
 trip = trip.includes(id) ? trip.filter(item => item !== id) : trip.concat(id);
 render(); notify(trip.includes(id) ? "Added to your itinerary" : "Removed from your itinerary");
}
function itineraryText() {
 const chosen = trip.map(id => places.find(p => p.id === id)).filter(Boolean);
 if (!chosen.length) return "My Nawabi Safar itinerary is empty.";
 return "MY NAWABI SAFAR — LUCKNOW\n\n" + chosen.map((p,i) => (i+1) + ". " + p.name + " — " + p.area + " (" + p.hours + " hr, " + money(p.cost) + " indicative entry estimate)").join("\n") +
  "\n\nEstimated visit time: " + chosen.reduce((sum,p) => sum+p.hours,0) + " hours" +
  "\nEstimated entry costs: " + money(chosen.reduce((sum,p) => sum+p.cost,0)) +
  "\n\nNote: Estimates are illustrative. Verify current timings, access and ticket prices before travelling.";
}
$("#filters").addEventListener("click", event => {
 const button = event.target.closest("[data-category]"); if (!button) return;
 category = button.dataset.category; renderPlaces();
});
$("#searchInput").addEventListener("input", event => { search = event.target.value.toLowerCase().trim(); renderPlaces(); });
$("#budgetInput").addEventListener("input", renderTrip);
$("#clearTrip").addEventListener("click", () => { trip = []; render(); notify("Itinerary cleared"); });
$("#saveTrip").addEventListener("click", () => {
 localStorage.setItem("nawabiSafarTrip", JSON.stringify(trip)); notify("Your safar is saved on this device");
});
$("#savedButton").addEventListener("click", () => $("#planner").scrollIntoView({behavior:"smooth"}));
$("#copyTrip").addEventListener("click", async () => {
 try { await navigator.clipboard.writeText(itineraryText()); notify("Itinerary copied to clipboard"); }
 catch (error) { notify("Clipboard unavailable in this browser"); }
});
render();
