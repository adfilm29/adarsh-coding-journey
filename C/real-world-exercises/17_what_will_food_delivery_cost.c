/* Exercise 17: What will my food delivery order cost?
   Situation: Add delivery charges to an order using sample distance bands.
   Concepts: conditions, arithmetic and input validation.
   Note: The delivery rates below are made-up practice rates. */
#include <stdio.h>

int main(void) {
    double foodTotal, distance, deliveryFee, finalTotal;

    printf("Food order total (Rs.): ");
    if (scanf("%lf", &foodTotal) != 1 || foodTotal < 0) return 1;

    printf("Delivery distance (km): ");
    if (scanf("%lf", &distance) != 1 || distance < 0) return 1;

    if (foodTotal >= 499.0) {
        deliveryFee = 0.0;
    } else if (distance <= 3.0) {
        deliveryFee = 25.0;
    } else if (distance <= 7.0) {
        deliveryFee = 40.0;
    } else {
        deliveryFee = 60.0;
    }

    finalTotal = foodTotal + deliveryFee;
    printf("\nFood total: Rs. %.2f\n", foodTotal);
    printf("Delivery fee: Rs. %.2f\n", deliveryFee);
    printf("Amount to pay: Rs. %.2f\n", finalTotal);
    return 0;
}