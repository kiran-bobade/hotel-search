import { Validator, AbstractControl, ValidationErrors, NG_VALIDATORS } from '@angular/forms';
import { Directive, Input } from '@angular/core';

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[mustHaveDiff]',
    providers: [{ provide: NG_VALIDATORS, useExisting: MustHaveDiffDirective, multi: true }]
})
export class MustHaveDiffDirective implements Validator {

    @Input() mustHaveDiff: string[] = [];

    validate(control: any): ValidationErrors {
        console.log('control', control);

        const control1 = control.controls[this.mustHaveDiff[0]];
        const operator = this.mustHaveDiff[1];
        const control2 = control.controls[this.mustHaveDiff[2]];
        let date1;
        let date2;
        if (control1 && control1.value && control1.value.hasOwnProperty('year')) {
            date1 = new Date(control1.value.year, control1.value.month, control1.value.day);
        }
        if (control2 && control2.value && control2.value.hasOwnProperty('year')) {
            date2 = new Date(control2.value.year, control2.value.month, control2.value.day);
        }

        if (date1 && date2) {
            if (operator === '>') {
                if (date1 < date2) {
                    control1.setErrors({ mustHaveDiff: true });
                    control2.setErrors({ mustHaveDiff: true });
                }
            }

            if (operator === '<') {
                if (date1 > date2) {
                    control1.setErrors({ mustHaveDiff: true });
                    control2.setErrors({ mustHaveDiff: true });
                }
            }
        }
        return null;
    }

    registerOnValidatorChange?(fn: () => void): void {

    }
}
