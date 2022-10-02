import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-updateuser',
  templateUrl: './updateUser.component.html',
  styleUrls: ['./updateUser.component.css']
})
export class UpdateUserComponent implements OnInit {
  constructor(
    private fb: UntypedFormBuilder,
    private auth: AuthService,
    private toastr: ToastrService) { }
  updateForm: UntypedFormGroup;
  user: any;
  ngOnInit(): any {
    this.updateForm = new UntypedFormGroup({
      username: new UntypedFormControl('', Validators.required),
      password: new UntypedFormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]),
      confirmPassword: new UntypedFormControl('', Validators.required)
    }, this.passwordMatchValidator);
  }
  createUpdateForm(): any {
    this.updateForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }
  passwordMatchValidator(g: UntypedFormGroup): any {
    return g.get('password').value === g.get('confirmPassword').value ? null : { misMatch: true };
  }
  updateUser(): void {
    this.user = Object.assign({}, this.updateForm.value);
    this.auth.updateUser(this.user, this.user.username).subscribe(() => {
      this.toastr.success('User has been updated !');
    }, error => {
      this.toastr.error('User hasnot been updated !');
    });
  }
}
