/* Exercise 2: Weekly spending and budget checker
   Real-world use: track expenses and see how much money remains. */
#include <stdio.h>

int main(void) {
    double dailyExpense, weeklyTotal = 0.0, weeklyBudget;

    printf("Enter your weekly budget (Rs.): ");
    if (scanf("%lf", &weeklyBudget) != 1 || weeklyBudget < 0) return 1;

    // Collect spending for seven days.
    for (int day = 1; day <= 7; day++) {
        printf("Expense on day %d (Rs.): ", day);
        if (scanf("%lf", &dailyExpense) != 1 || dailyExpense < 0) return 1;
        weeklyTotal += dailyExpense;
    }

    printf("\nTotal spent: Rs. %.2f\n", weeklyTotal);
    printf("Budget:      Rs. %.2f\n", weeklyBudget);

    // Compare total spending with the budget.
    if (weeklyTotal > weeklyBudget) {
        printf("Over budget by Rs. %.2f\n", weeklyTotal - weeklyBudget);
    } else {
        printf("Money remaining: Rs. %.2f\n", weeklyBudget - weeklyTotal);
    }
    return 0;
}
