# C Programming

This folder is for C notes, examples, assignments and practice problems.

## Learning order

1. Program structure, compilation and `main()`
2. Character set, keywords and identifiers
3. Variables, constants and data types
4. Input and output — `printf` and `scanf`
5. Operators and expressions
6. Conditions — `if`, `else` and `switch`
7. Loops — `for`, `while` and `do while`
8. Functions and recursion
9. Arrays and strings
10. Pointers and structures

## 10 real-world beginner exercises

All solutions are in [real-world-exercises](./real-world-exercises/). Read the comments in each source file, type the code yourself, compile it, and test different inputs.

| # | Exercise | Real-world situation | Main concepts |
|---|---|---|---|
| 01 | Grocery bill | Calculate product totals and a discount | Variables, loops, arithmetic |
| 02 | Weekly budget | Track spending against a budget | Loops, conditions, totals |
| 03 | Electricity bill | Estimate a household bill | If/else, tiered calculations |
| 04 | Student result | Calculate percentage and grade | Loops, validation, conditions |
| 05 | Unit converter | Convert distance and temperature | Switch, formulas |
| 06 | ATM simulation | Check balance, deposit and withdraw | Do-while, switch, conditions |
| 07 | Restaurant bill splitter | Add a tip and divide the bill | Arithmetic, input |
| 08 | Parking fee | Calculate parking charges | Conditions, arithmetic |
| 09 | Shop inventory | Update stock after a sale | Conditions, variables |
| 10 | Bus seat booking | Book, cancel and view seats | Arrays, loops, menu |

## How to compile and run

With GCC installed, open a terminal in the exercise folder:

```bash
gcc 01_grocery_bill.c -o grocery_bill
./grocery_bill
```

On Windows, run the generated program with:

```powershell
.\grocery_bill.exe
```

Change the filename for each exercise. For example, compile `06_atm_menu.c` to `atm_menu`.

## How to practise properly

1. Read the problem statement and predict the output.
2. Try writing the program yourself before looking at the solution.
3. Type the solution rather than copy-pasting it.
4. Compile and fix every warning or error you understand.
5. Test normal, boundary and invalid inputs.
6. Explain each statement in your own words.
7. Improve one feature after the basic version works.

## Important notes

- These are educational simulations, not production billing, banking, transport or inventory systems.
- Electricity, parking and grade rules are sample rules. Real providers and institutions use their own policies.
- The ATM exercise does not connect to a bank, and the bus booking exercise does not save bookings after the program exits.

## Next step

After these exercises, learn functions and file handling, then upgrade the budget tracker, inventory manager and bus booking system to save data in files.
