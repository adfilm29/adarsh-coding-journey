/* Exercise 18: How much is the laundry bill?
   Situation: A local laundry shop charges different rates for each item.
   Concepts: input, multiplication and addition.
   Note: These are sample prices for practice. */
#include <stdio.h>

int main(void) {
    int shirts, trousers, bedsheets;
    double total;

    printf("Number of shirts (Rs. 12 each): ");
    if (scanf("%d", &shirts) != 1 || shirts < 0) return 1;

    printf("Number of trousers (Rs. 20 each): ");
    if (scanf("%d", &trousers) != 1 || trousers < 0) return 1;

    printf("Number of bedsheets (Rs. 40 each): ");
    if (scanf("%d", &bedsheets) != 1 || bedsheets < 0) return 1;

    total = shirts * 12.0 + trousers * 20.0 + bedsheets * 40.0;

    printf("\n--- LAUNDRY RECEIPT ---\n");
    printf("Shirts:     %d x Rs. 12 = Rs. %.2f\n", shirts, shirts * 12.0);
    printf("Trousers:   %d x Rs. 20 = Rs. %.2f\n", trousers, trousers * 20.0);
    printf("Bedsheets:  %d x Rs. 40 = Rs. %.2f\n", bedsheets, bedsheets * 40.0);
    printf("Total bill: Rs. %.2f\n", total);
    return 0;
}