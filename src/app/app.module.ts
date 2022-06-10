import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { ReactiveFormComponent } from './reactive-form.component';
import { TemplateDrivenFormComponent } from './template-driven-form.component';
import { PwdMatchUsernameValidatorDirective } from './custom-validators/pwd-match-username-validator';
import { ConfirmPasswordValidatorDirective } from './custom-validators/confirm-password-validator';

@NgModule({
  imports: [
      BrowserModule,
      ReactiveFormsModule,
      FormsModule
  ],
  declarations: [
      AppComponent,
      ReactiveFormComponent,
      TemplateDrivenFormComponent,
      PwdMatchUsernameValidatorDirective,
      ConfirmPasswordValidatorDirective
  ],
  providers: [
  ],
  bootstrap: [
      AppComponent
  ]
})
export class AppModule { } 