import { Directive, Input, OnChanges , SimpleChanges } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator, ValidatorFn } from '@angular/forms';

export function confirmPasswordValidator(confirmPassword: String): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    let password: string = control.value;
    let isInValid = (password !== confirmPassword) ? true : false;
    return isInValid ? {'cnfPassword': {value: 'Invalid'}} : null;
  };
}

@Directive({
  selector: '[cnfPassword][formControlName],[cnfPassword][formControl],[cnfPassword][ngModel]',
  providers: [{provide: NG_VALIDATORS, useExisting: ConfirmPasswordValidatorDirective, multi: true}]
})
export class ConfirmPasswordValidatorDirective implements Validator, OnChanges {
  @Input('cnfPassword')
  confirmPassword: string;
  private _onChange: () => void;

  validate(control: AbstractControl): {[key: string]: any} | null {
    return this.confirmPassword ? 
          confirmPasswordValidator(this.confirmPassword)(control): null;
  }

  registerOnValidatorChange(fn: () => void): void { this._onChange = fn; }

  ngOnChanges(changes: SimpleChanges) {
    if ('confirmPassword' in changes) {
      if (this._onChange) this._onChange();
    }
  }  
} 