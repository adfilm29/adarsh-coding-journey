/* Exercise 19: Can I afford all my monthly subscriptions?
   Situation: Add streaming, music, storage and other monthly plans,
   then compare the total with the amount set aside.
   Concepts: loops, totals and conditions. */
#include <stdio.h>

int main(void) {
    int count;
    double cost, total = 0.0, budget;

    printf("How many monthly subscriptions do you pay for? ");
    if (scanf("%d", &count) != 1 || count < 0) return 1;

    for (int i = 1; i <= count; i++) {
        printf("Monthly cost of subscription %d (Rs.): ", i);
        if (scanf("%lf", &cost) != 1 || cost < 0) return 1;
        total += cost;
    }

    printf("Your monthly subscription budget (Rs.): ");
    if (scanf("%lf", &budget) != 1 || budget < 0) return 1;

    printf("\nSubscriptions cost: Rs. %.2f per month\n", total);
    if (total > budget) {
        printf("You are over budget by Rs. %.2f.\n", total - budget);
    } else {
        printf("You have Rs. %.2f left in this budget.\n", budget - total);
    }
    printf("Yearly subscription cost at the same rates: Rs. %.2f\n", total * 12.0);
    return 0;
}