/* Exercise 1: Grocery bill calculator
   Real-world use: calculate a customer's shopping total and discount. */
#include <stdio.h>

int main(void) {
    int itemCount;
    double price, quantity, subtotal = 0.0;
    double discount, finalTotal;

    printf("How many different items? ");
    if (scanf("%d", &itemCount) != 1 || itemCount <= 0) {
        printf("Please enter a valid item count.\n");
        return 1;
    }

    // Repeat once for each product and add its price to the subtotal.
    for (int i = 1; i <= itemCount; i++) {
        printf("Item %d price: ", i);
        if (scanf("%lf", &price) != 1 || price < 0) return 1;

        printf("Item %d quantity: ", i);
        if (scanf("%lf", &quantity) != 1 || quantity < 0) return 1;

        subtotal += price * quantity;
    }

    // Give a 5% discount when the subtotal reaches 1000.
    discount = (subtotal >= 1000.0) ? subtotal * 0.05 : 0.0;
    finalTotal = subtotal - discount;

    printf("\n----- BILL -----\n");
    printf("Subtotal:    Rs. %.2f\n", subtotal);
    printf("Discount:    Rs. %.2f\n", discount);
    printf("Final total: Rs. %.2f\n", finalTotal);
    return 0;
}
