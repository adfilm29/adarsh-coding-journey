/* Exercise 9: Small shop inventory manager
   Real-world use: update stock after sales and show remaining inventory. */
#include <stdio.h>

int main(void) {
    int stock, sold;

    printf("Current stock quantity: ");
    if (scanf("%d", &stock) != 1 || stock < 0) return 1;

    printf("Quantity sold: ");
    if (scanf("%d", &sold) != 1 || sold < 0) return 1;

    // A shop cannot sell more items than it has in stock.
    if (sold > stock) {
        printf("Sale rejected: not enough stock.\n");
        return 1;
    }

    stock -= sold;
    printf("Sale recorded.\n");
    printf("Remaining stock: %d\n", stock);

    if (stock <= 5) {
        printf("Low-stock alert: consider reordering.\n");
    }
    return 0;
}
