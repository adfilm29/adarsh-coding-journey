/* Exercise 8: Parking fee calculator
   Real-world use: calculate a parking charge from hours parked. */
#include <stdio.h>

int main(void) {
    int hours;
    double fee;

    printf("How many whole or partial hours was the vehicle parked? ");
    if (scanf("%d", &hours) != 1 || hours <= 0) {
        printf("Enter at least one hour.\n");
        return 1;
    }

    // Sample pricing: Rs. 30 for the first hour, then Rs. 20 per extra hour.
    fee = 30.0;
    if (hours > 1) {
        fee += (hours - 1) * 20.0;
    }

    // Apply a sample daily maximum charge.
    if (fee > 200.0) fee = 200.0;

    printf("Parking duration: %d hour(s)\n", hours);
    printf("Parking fee: Rs. %.2f\n", fee);
    return 0;
}
