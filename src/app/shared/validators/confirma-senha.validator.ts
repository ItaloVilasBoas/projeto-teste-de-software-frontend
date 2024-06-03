import { AbstractControl, FormControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function ValidaSenhasIguais(senha: FormControl): ValidatorFn {
    return (control:AbstractControl) : ValidationErrors | null => {
        const value = control.value;
        if (!value)
            return null
        return !(value === senha.value) ? { senhaDiferente: true } : null;
    }
}
