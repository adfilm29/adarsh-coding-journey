/* Exercise 16: How long until I reach my savings goal?
   Situation: Work out how many months are needed to reach a target.
   Concepts: arithmetic, conditions and rounding up. */
#include <stdio.h>
#include <math.h>

int main(void) {
    double saved, goal, monthlySaving;
    double monthsNeeded;

    printf("How much have you saved already (Rs.)? ");
    if (scanf("%lf", &saved) != 1 || saved < 0) return 1;

    printf("What is your savings target (Rs.)? ");
    if (scanf("%lf", &goal) != 1 || goal <= 0) return 1;

    if (saved >= goal) {
        printf("You have already reached your savings goal.\n");
        return 0;
    }

    printf("How much can you save each month (Rs.)? ");
    if (scanf("%lf", &monthlySaving) != 1 || monthlySaving <= 0) return 1;

    monthsNeeded = ceil((goal - saved) / monthlySaving);
    printf("\nYou still need Rs. %.2f.\n", goal - saved);
    printf("At this saving rate, you need about %.0f month(s).\n", monthsNeeded);
    printf("This estimate assumes you save the same amount every month.\n");
    return 0;
}