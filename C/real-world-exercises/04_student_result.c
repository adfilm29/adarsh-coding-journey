/* Exercise 4: Student marks and result calculator
   Real-world use: calculate percentage and a simple grade. */
#include <stdio.h>

int main(void) {
    const int SUBJECTS = 5;
    int marks, total = 0;
    double percentage;

    // Read marks for five subjects and reject values outside 0-100.
    for (int subject = 1; subject <= SUBJECTS; subject++) {
        printf("Marks for subject %d (0-100): ", subject);
        if (scanf("%d", &marks) != 1 || marks < 0 || marks > 100) {
            printf("Invalid marks. Enter a value from 0 to 100.\n");
            return 1;
        }
        total += marks;
    }

    percentage = (double) total / SUBJECTS;
    printf("\nTotal: %d / %d\n", total, SUBJECTS * 100);
    printf("Percentage: %.2f%%\n", percentage);

    // This is a sample grading scale; use your institution's official rules.
    if (percentage >= 90) printf("Grade: A\n");
    else if (percentage >= 75) printf("Grade: B\n");
    else if (percentage >= 60) printf("Grade: C\n");
    else if (percentage >= 40) printf("Grade: D\n");
    else printf("Result: Needs improvement\n");

    return 0;
}
