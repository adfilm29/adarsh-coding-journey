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

## 20 real-life practice problems

These exercises are written as everyday situations rather than textbook-only titles. Each source file starts with a short story explaining when someone might use the program and what it practises.

All solutions are in [real-world-exercises](./real-world-exercises/). Try writing your own version before reading the solution.

| # | Human-friendly problem | What you are solving | Main concepts |
|---|---|---|---|
| 01 | Can you prepare a grocery bill? | Add item prices, quantities and a sample discount | Variables, loops, arithmetic |
| 02 | Where did my weekly pocket money go? | Compare seven days of spending with a budget | Loops, conditions, totals |
| 03 | What might my electricity bill be? | Estimate a household bill using sample unit rates | If/else, tiered calculations |
| 04 | How did I do in my subjects? | Calculate total marks, percentage and a sample grade | Loops, validation, conditions |
| 05 | Can you convert this for me? | Convert distance and temperature | Switch, formulas |
| 06 | Can I use this ATM menu? | Check a sample balance, deposit and withdraw | Do-while, switch, conditions |
| 07 | How much does everyone owe after dinner? | Add a tip and split the bill | Arithmetic, input |
| 08 | What should I pay for parking? | Estimate a parking charge from hours | Conditions, arithmetic |
| 09 | Do we have enough stock in the shop? | Record a sale and check remaining stock | Conditions, variables |
| 10 | Is there a seat left on the bus? | View, book and cancel seats | Arrays, loops, menu |
| 11 | Will my mobile data last until Sunday? | Work out a safe daily data allowance | Variables, arithmetic, conditions |
| 12 | What will my take-home salary be? | Estimate pay after sample allowances and deductions | Percentages, arithmetic |
| 13 | Am I meeting the college attendance requirement? | Check attendance and estimate classes needed to reach 75% | Arithmetic, conditions |
| 14 | How much will our road trip cost? | Estimate fuel use and split the cost between travellers | Input, arithmetic |
| 15 | When should I refill the water tank? | Estimate how many days the remaining water may last | Division, conditions |
| 16 | How long until I reach my savings goal? | Estimate the months needed to reach a target | Arithmetic, rounding |
| 17 | What will my food delivery order cost? | Add a sample delivery fee to the food order | Conditions, arithmetic |
| 18 | How much is the laundry bill? | Calculate a receipt from the number of clothes | Multiplication, addition |
| 19 | Can I afford all my monthly subscriptions? | Add recurring costs and compare them with a budget | Loops, totals, conditions |
| 20 | Will we have enough tickets for everyone? | Count ticket types, check capacity and estimate sales | Constants, arithmetic, conditions |

## How to compile and run

With GCC installed, open a terminal in the exercise folder. For example:

```bash
gcc 01_grocery_bill.c -o grocery_bill
./grocery_bill
```

On Windows, run the generated program with:

```powershell
.\grocery_bill.exe
```

For exercises that use `ceil()` (13 and 16), link the math library when using GCC:

```bash
gcc 13_am_i_attendance_eligible.c -o attendance -lm
gcc 16_how_long_until_i_reach_my_savings_goal.c -o savings_goal -lm
```

Change the source and output filenames for the exercise you want to run.

## How to practise properly

1. Read the situation and identify the inputs, calculations and expected output.
2. Try writing the program yourself before opening the solution.
3. Type the code rather than copy-pasting it.
4. Compile and fix errors and warnings you understand.
5. Test normal, boundary and invalid inputs.
6. Explain each statement in your own words.
7. Add one improvement after the basic version works.

## Important notes

- These are beginner learning exercises, not production billing, banking, transport, payroll or booking systems.
- Electricity, parking, laundry, delivery, ticket and grading rates are sample values for practice. Real organisations use their own rules.
- The ATM, bus booking and event ticket examples are simulations; they do not connect to real services or save transactions permanently.
- Salary deductions are simplified, and attendance eligibility rules should be checked against your college's official policy.

## Next step

After completing these problems, practise functions, arrays, strings and file handling. Then upgrade selected programs to save records between runs.
