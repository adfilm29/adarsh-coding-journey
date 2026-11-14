/* Exercise 11: Will my mobile data last until the end of the plan?
   Situation: You want to know how much data you can use each day.
   Concepts: variables, input, arithmetic and if/else. */
#include <stdio.h>

int main(void) {
    double planData, usedData, remainingData;
    int daysLeft;

    printf("Total data in your plan (GB): ");
    if (scanf("%lf", &planData) != 1 || planData <= 0) return 1;

    printf("Data you have already used (GB): ");
    if (scanf("%lf", &usedData) != 1 || usedData < 0 || usedData > planData) {
        printf("Please enter a used-data value between 0 and your plan limit.\n");
        return 1;
    }

    printf("Days left before your plan renews: ");
    if (scanf("%d", &daysLeft) != 1 || daysLeft <= 0) return 1;

    remainingData = planData - usedData;
    printf("\nData remaining: %.2f GB\n", remainingData);
    printf("Suggested daily limit: %.2f GB\n", remainingData / daysLeft);

    if (remainingData == 0) {
        printf("You have used your full data allowance.\n");
    } else if (remainingData / daysLeft < 0.5) {
        printf("Use data carefully; your daily allowance is under 0.5 GB.\n");
    } else {
        printf("You have some room for normal daily use.\n");
    }
    return 0;
}