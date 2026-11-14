/* Exercise 12: What will my take-home salary be?
   Situation: Estimate monthly pay after adding allowances and deductions.
   Concepts: variables, percentages and arithmetic.
   Note: This is a practice estimate, not an official payroll calculation. */
#include <stdio.h>

int main(void) {
    double basicSalary, allowancePercent, deductionPercent;
    double allowance, deductions, takeHome;

    printf("Monthly basic salary (Rs.): ");
    if (scanf("%lf", &basicSalary) != 1 || basicSalary < 0) return 1;

    printf("Allowance percentage: ");
    if (scanf("%lf", &allowancePercent) != 1 ||
        allowancePercent < 0 || allowancePercent > 100) return 1;

    printf("Deduction percentage on basic salary: ");
    if (scanf("%lf", &deductionPercent) != 1 ||
        deductionPercent < 0 || deductionPercent > 100) return 1;

    allowance = basicSalary * allowancePercent / 100.0;
    deductions = basicSalary * deductionPercent / 100.0;
    takeHome = basicSalary + allowance - deductions;

    printf("\nBasic salary: Rs. %.2f\n", basicSalary);
    printf("Allowance:    Rs. %.2f\n", allowance);
    printf("Deductions:   Rs. %.2f\n", deductions);
    printf("Estimated take-home: Rs. %.2f\n", takeHome);
    return 0;
}