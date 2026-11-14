/* Exercise 15: When should I refill the water tank?
   Situation: Estimate how many days the water left at home may last.
   Concepts: input, division and if/else. */
#include <stdio.h>

int main(void) {
    double capacity, currentWater, dailyUse;

    printf("Tank capacity (litres): ");
    if (scanf("%lf", &capacity) != 1 || capacity <= 0) return 1;

    printf("Water currently in the tank (litres): ");
    if (scanf("%lf", &currentWater) != 1 ||
        currentWater < 0 || currentWater > capacity) return 1;

    printf("Average household use per day (litres): ");
    if (scanf("%lf", &dailyUse) != 1 || dailyUse <= 0) return 1;

    printf("\nTank is %.1f%% full.\n", currentWater / capacity * 100.0);
    printf("Estimated water remaining: %.1f days\n", currentWater / dailyUse);

    if (currentWater / dailyUse < 1.0) {
        printf("The tank may run out within a day. Plan a refill.\n");
    } else {
        printf("There is more than one day's estimated water left.\n");
    }
    return 0;
}