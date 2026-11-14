/* Exercise 14: How much will our road trip cost?
   Situation: Estimate fuel spending and split it between travellers.
   Concepts: input, arithmetic and validation. */
#include <stdio.h>

int main(void) {
    double distance, mileage, fuelPrice, fuelNeeded, totalCost;
    int travellers;

    printf("Planned distance (km): ");
    if (scanf("%lf", &distance) != 1 || distance <= 0) return 1;

    printf("Vehicle mileage (km per litre): ");
    if (scanf("%lf", &mileage) != 1 || mileage <= 0) return 1;

    printf("Fuel price per litre (Rs.): ");
    if (scanf("%lf", &fuelPrice) != 1 || fuelPrice < 0) return 1;

    printf("Number of people sharing the fuel cost: ");
    if (scanf("%d", &travellers) != 1 || travellers <= 0) return 1;

    fuelNeeded = distance / mileage;
    totalCost = fuelNeeded * fuelPrice;

    printf("\nEstimated fuel needed: %.2f litres\n", fuelNeeded);
    printf("Estimated fuel cost: Rs. %.2f\n", totalCost);
    printf("Each person pays: Rs. %.2f\n", totalCost / travellers);
    printf("This estimate does not include tolls, food or other trip expenses.\n");
    return 0;
}