import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function ValidaSenhaForte(): ValidatorFn {
    return (control:AbstractControl) : ValidationErrors | null => {
        const value = control.value;
        if (!value)
            return null

        const hasMinimunEightDigits = value.length > 7
        const hasUpperCase = /[A-Z]+/.test(value);
        const hasLowerCase = /[a-z]+/.test(value);
        const hasNumeric = /[0-9]+/.test(value);
        const passwordValid = hasMinimunEightDigits  && hasUpperCase && hasLowerCase && hasNumeric;
        return !passwordValid ? { senhaFraca: true } : null;
    }
}

