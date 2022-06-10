import { Directive, Input, OnChanges , SimpleChanges } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator, ValidatorFn } from '@angular/forms';

export function pwdMatchUsernameValidator(username: String): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    let password: string = control.value;
    let isInValid = (password === username) ? true : false;
    return isInValid ? {'matchForUsername': {value: 'Invalid'}} : null;
  };
}

@Directive({
  selector: '[matchForUsername][formControlName],[matchForUsername][formControl],[matchForUsername][ngModel]',
  providers: [{provide: NG_VALIDATORS, useExisting: PwdMatchUsernameValidatorDirective, multi: true}]
})
export class PwdMatchUsernameValidatorDirective implements Validator, OnChanges {
  @Input('matchForUsername')
  changedUsername: string;
  private _onChange: () => void;

  validate(control: AbstractControl): {[key: string]: any} | null {
    return this.changedUsername ? 
        pwdMatchUsernameValidator(this.changedUsername)(control): null;
  }

  registerOnValidatorChange(fn: () => void): void { this._onChange = fn; }

  ngOnChanges(changes: SimpleChanges) {
    if ('changedUsername' in changes) {
      if (this._onChange) this._onChange();
    }
  }  
} 