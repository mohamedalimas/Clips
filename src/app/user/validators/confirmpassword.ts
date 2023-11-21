import { ValidationErrors , AbstractControl,ValidatorFn } from '@angular/forms';
export class Confirmpassword {
    static match(control : AbstractControl , matchingcontrol : AbstractControl) : ValidatorFn{
        return (group : AbstractControl) : ValidationErrors | null => {  
           let error = control.value === matchingcontrol.value ? null : {nomatching: true}
           matchingcontrol.setErrors(error)
           return error
        }
    }
}
