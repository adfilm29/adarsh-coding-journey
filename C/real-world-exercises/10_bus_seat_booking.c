/* Exercise 10: Mini bus seat booking
   Real-world use: reserve seats and display remaining availability.
   This beginner version stores bookings only while the program runs. */
#include <stdio.h>

int main(void) {
    const int TOTAL_SEATS = 10;
    int booked[TOTAL_SEATS] = {0};
    int choice, seat, available;

    do {
        available = 0;
        for (int i = 0; i < TOTAL_SEATS; i++) {
            if (booked[i] == 0) available++;
        }

        printf("\n--- BUS BOOKING ---\n");
        printf("Available seats: %d/%d\n", available, TOTAL_SEATS);
        printf("1. View seats\n");
        printf("2. Book a seat\n");
        printf("3. Cancel a booking\n");
        printf("4. Exit\n");
        printf("Choose: ");

        if (scanf("%d", &choice) != 1) return 1;

        if (choice == 1) {
            // Display X for booked seats and O for available seats.
            for (int i = 0; i < TOTAL_SEATS; i++) {
                printf("Seat %d: %s\n", i + 1, booked[i] ? "Booked" : "Available");
            }
        } else if (choice == 2 || choice == 3) {
            printf("Enter seat number (1-%d): ", TOTAL_SEATS);
            if (scanf("%d", &seat) != 1 || seat < 1 || seat > TOTAL_SEATS) {
                printf("Invalid seat number.\n");
                continue;
            }

            // Convert the displayed seat number to its array index.
            if (choice == 2 && booked[seat - 1] == 0) {
                booked[seat - 1] = 1;
                printf("Seat %d booked successfully.\n", seat);
            } else if (choice == 3 && booked[seat - 1] == 1) {
                booked[seat - 1] = 0;
                printf("Booking for seat %d cancelled.\n", seat);
            } else {
                printf("That action cannot be completed for this seat.\n");
            }
        } else if (choice != 4) {
            printf("Choose an option from 1 to 4.\n");
        }
    } while (choice != 4);

    printf("Booking program closed.\n");
    return 0;
}
