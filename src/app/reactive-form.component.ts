import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { User } from './user';
import { pwdMatchUsernameValidator } from './custom-validators/pwd-match-username-validator';
import { confirmPasswordValidator } from './custom-validators/confirm-password-validator';

@Component({
   selector: 'app-reactive-form',
   templateUrl: './reactive-form.component.html'
})
export class ReactiveFormComponent implements OnInit {
  userForm: FormGroup; 
  constructor(private formBuilder:FormBuilder) {
  }
  ngOnInit() {
    this.userForm = this.formBuilder.group({
      username: ['', [ Validators.required ]],
      password: ['', [ Validators.required ]],      
      confirmPassword: ['', [ Validators.required ]],          
      notificationMode: ['', [ Validators.required ]],       
      email: '',
      mobileNumber: ''
    });
    this.handleFormChanges();
  }
  handleFormChanges() {
    this.username.valueChanges.subscribe(
      uname => {
        this.password.setValidators([Validators.required, pwdMatchUsernameValidator(uname)]);
        this.password.updateValueAndValidity();
      }
    );
    this.password.valueChanges.subscribe(
      pwd => {
        const uname = this.username.value;
        this.password.setValidators([Validators.required, pwdMatchUsernameValidator(uname)]);

        this.confirmPassword.setValidators([Validators.required, confirmPasswordValidator(pwd)]);        
        this.confirmPassword.updateValueAndValidity();
      }
    );    
    this.confirmPassword.valueChanges.subscribe(
      () => {
        const pwd = this.password.value;
        this.confirmPassword.setValidators([Validators.required, confirmPasswordValidator(pwd)]);
      }
    );     
    this.notificationMode.valueChanges.subscribe(
      mode => {
        if (mode==='email') {
           this.email.setValidators([Validators.required, Validators.email]);
           this.mobileNumber.clearValidators();
        } else if (mode === 'mobile') {
           this.mobileNumber.setValidators([Validators.required]);
           this.email.clearValidators();
        } else if (mode==='both') {
          this.email.setValidators([Validators.required, Validators.email]);
          this.mobileNumber.setValidators([Validators.required]);          
        }
        this.email.updateValueAndValidity();
        this.mobileNumber.updateValueAndValidity();
      }
    ); 
  }
  onFormSubmit() {
    let user: User = this.userForm.value;
    console.log(user);
    this.userForm.reset();
  }
  get username() {
    return this.userForm.get('username');
  }
  get password() {
    return this.userForm.get('password');
  }  
  get confirmPassword() {
    return this.userForm.get('confirmPassword');
  }   
  get notificationMode() {
    return this.userForm.get('notificationMode');
  }        
  get email() {
    return this.userForm.get('email');
  }  
  get mobileNumber() {
    return this.userForm.get('mobileNumber');
  }   
} 