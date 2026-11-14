/* Exercise 5: Everyday unit converter
   Real-world use: convert kilometres/miles and Celsius/Fahrenheit. */
#include <stdio.h>

int main(void) {
    int choice;
    double value, converted;

    printf("UNIT CONVERTER\n");
    printf("1. Kilometres to miles\n");
    printf("2. Miles to kilometres\n");
    printf("3. Celsius to Fahrenheit\n");
    printf("4. Fahrenheit to Celsius\n");
    printf("Choose an option: ");

    if (scanf("%d", &choice) != 1) return 1;
    printf("Enter value: ");
    if (scanf("%lf", &value) != 1) return 1;

    // Select the correct conversion formula.
    switch (choice) {
        case 1: converted = value * 0.621371; break;
        case 2: converted = value / 0.621371; break;
        case 3: converted = (value * 9.0 / 5.0) + 32.0; break;
        case 4: converted = (value - 32.0) * 5.0 / 9.0; break;
        default:
            printf("Invalid option.\n");
            return 1;
    }

    printf("Converted value: %.2f\n", converted);
    return 0;
}
