import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from './user';
import { Observable } from 'rxjs';

@Component({
   selector: 'app-template-form',
   templateUrl: './template-driven-form.component.html'
})
export class TemplateDrivenFormComponent implements OnInit {
  constructor() {
  }
  ngOnInit() {
  }
  onFormSubmit(form: NgForm) {
     let user: User = form.value;
     console.log(user);
     form.resetForm();
  }
} 