/* Exercise 6: ATM menu simulation
   Real-world use: practise menu-driven banking operations.
   This is only a learning simulation; it does not connect to a bank. */
#include <stdio.h>

int main(void) {
    int choice;
    double balance = 5000.0, amount;

    do {
        printf("\n--- ATM MENU ---\n");
        printf("1. Check balance\n");
        printf("2. Deposit money\n");
        printf("3. Withdraw money\n");
        printf("4. Exit\n");
        printf("Choose: ");

        if (scanf("%d", &choice) != 1) return 1;

        switch (choice) {
            case 1:
                printf("Available balance: Rs. %.2f\n", balance);
                break;
            case 2:
                printf("Deposit amount: Rs. ");
                if (scanf("%lf", &amount) != 1 || amount <= 0) {
                    printf("Enter a positive amount.\n");
                    break;
                }
                balance += amount;
                printf("Deposit successful.\n");
                break;
            case 3:
                printf("Withdrawal amount: Rs. ");
                if (scanf("%lf", &amount) != 1 || amount <= 0) {
                    printf("Enter a positive amount.\n");
                    break;
                }
                if (amount > balance) {
                    printf("Insufficient balance.\n");
                } else {
                    balance -= amount;
                    printf("Please collect your cash.\n");
                }
                break;
            case 4:
                printf("Thank you. Session ended.\n");
                break;
            default:
                printf("Choose an option from 1 to 4.\n");
        }
    } while (choice != 4);

    return 0;
}
