import { FormGroup, AbstractControl } from "@angular/forms";
export function NoWhiteSpace(control: AbstractControl) {
    if (control.value &&  control.value.length>0 && control.value.tream().length === 0) {
      return { noWhiteSpace: true };
    }
    return null;
  }