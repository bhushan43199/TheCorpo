import { Directive, forwardRef, Attribute, Input } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';

@Directive({
    selector: '[validateEqual]',
    providers: [
        { provide: NG_VALIDATORS, useExisting: forwardRef(() => ChangePasswordEqualValidator), multi: true }
    ]
})
export class ChangePasswordEqualValidator implements Validator {

    @Input() validateEqual: string;
    validate(control: AbstractControl): { [key: string]: any } | null {

        const controlTocompare = control.parent.get(this.validateEqual);
        if (controlTocompare && controlTocompare.value !== control.value) {
            return { 'notEqual': true };
        }

        return null;
    }
}