/* Exercise 3: Simple electricity bill estimator
   Real-world use: estimate a household electricity bill from units used. */
#include <stdio.h>

int main(void) {
    double units, energyCharge, fixedCharge = 75.0, total;

    printf("Enter electricity units used: ");
    if (scanf("%lf", &units) != 1 || units < 0) {
        printf("Units cannot be negative.\n");
        return 1;
    }

    // Apply a simple sample tariff. Actual tariffs vary by location/provider.
    if (units <= 100) {
        energyCharge = units * 3.0;
    } else if (units <= 200) {
        energyCharge = 100 * 3.0 + (units - 100) * 5.0;
    } else {
        energyCharge = 100 * 3.0 + 100 * 5.0 + (units - 200) * 7.0;
    }

    total = energyCharge + fixedCharge;
    printf("\nUnits used:     %.1f\n", units);
    printf("Energy charge:  Rs. %.2f\n", energyCharge);
    printf("Fixed charge:   Rs. %.2f\n", fixedCharge);
    printf("Estimated bill: Rs. %.2f\n", total);
    return 0;
}
