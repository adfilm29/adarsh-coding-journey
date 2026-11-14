/* Exercise 13: Am I meeting the college attendance requirement?
   Situation: Check current attendance and estimate how many more classes
   you must attend in a row to reach 75%.
   Concepts: arithmetic, conditions and type conversion.
   Note: 75% is a sample requirement; check your college rules. */
#include <stdio.h>
#include <math.h>

int main(void) {
    int attended, held;
    double percentage, classesNeeded;

    printf("Classes attended: ");
    if (scanf("%d", &attended) != 1 || attended < 0) return 1;

    printf("Total classes held: ");
    if (scanf("%d", &held) != 1 || held <= 0 || attended > held) {
        printf("Total classes must be positive and cannot be less than classes attended.\n");
        return 1;
    }

    percentage = (double) attended / held * 100.0;
    printf("\nYour attendance: %.2f%%\n", percentage);

    if (percentage >= 75.0) {
        printf("You currently meet the sample 75%% requirement.\n");
    } else {
        classesNeeded = ceil((0.75 * held - attended) / 0.25);
        printf("Attend the next %.0f classes without missing one to reach 75%%.\n",
               classesNeeded);
    }
    return 0;
}