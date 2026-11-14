/* Exercise 20: Will we have enough tickets for everyone?
   Situation: A student event has a limited number of tickets at
   student, regular and VIP prices. Calculate sales and remaining stock.
   Concepts: constants, arithmetic and conditions.
   Note: This is an in-memory counter, not a real ticketing system. */
#include <stdio.h>

int main(void) {
    const int TICKET_LIMIT = 100;
    const double STUDENT_PRICE = 120.0;
    const double REGULAR_PRICE = 180.0;
    const double VIP_PRICE = 300.0;
    int student, regular, vip, sold;
    double revenue;

    printf("Student tickets at Rs. 120: ");
    if (scanf("%d", &student) != 1 || student < 0) return 1;

    printf("Regular tickets at Rs. 180: ");
    if (scanf("%d", &regular) != 1 || regular < 0) return 1;

    printf("VIP tickets at Rs. 300: ");
    if (scanf("%d", &vip) != 1 || vip < 0) return 1;

    sold = student + regular + vip;
    if (sold > TICKET_LIMIT) {
        printf("Only %d tickets are available. You entered %d.\n",
               TICKET_LIMIT, sold);
        return 1;
    }

    revenue = student * STUDENT_PRICE +
              regular * REGULAR_PRICE +
              vip * VIP_PRICE;

    printf("\nTickets sold: %d/%d\n", sold, TICKET_LIMIT);
    printf("Tickets remaining: %d\n", TICKET_LIMIT - sold);
    printf("Expected ticket revenue: Rs. %.2f\n", revenue);
    return 0;
}