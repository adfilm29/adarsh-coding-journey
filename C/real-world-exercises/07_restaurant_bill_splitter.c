/* Exercise 7: Restaurant bill and tip splitter
   Real-world use: split a restaurant bill fairly among friends. */
#include <stdio.h>

int main(void) {
    double bill, tipPercent, tip, grandTotal, perPerson;
    int people;

    printf("Bill amount (Rs.): ");
    if (scanf("%lf", &bill) != 1 || bill < 0) return 1;

    printf("Tip percentage: ");
    if (scanf("%lf", &tipPercent) != 1 || tipPercent < 0) return 1;

    printf("Number of people: ");
    if (scanf("%d", &people) != 1 || people <= 0) {
        printf("Number of people must be at least one.\n");
        return 1;
    }

    // Calculate the tip, final bill and each person's share.
    tip = bill * tipPercent / 100.0;
    grandTotal = bill + tip;
    perPerson = grandTotal / people;

    printf("\nTip:          Rs. %.2f\n", tip);
    printf("Total bill:   Rs. %.2f\n", grandTotal);
    printf("Each person:  Rs. %.2f\n", perPerson);
    return 0;
}
