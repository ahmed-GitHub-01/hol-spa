import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-forgetPassword',
  templateUrl: './forgetPassword.component.html',
  styleUrls: ['./forgetPassword.component.scss']
})
export class ForgetPasswordComponent implements OnInit {
  forgetForm: UntypedFormGroup;
  msgValidate = {
    email: {
      required: 'E-Mail is required.',
      pattern: 'E-Mail is not right.'
    }
  };
  constructor(private fb: UntypedFormBuilder) { }

  ngOnInit(): any {
    this.forgetForm = this.fb.group({
      email: ['', Validators.required]
    });
  }
  requestPassword(): any { }
}
