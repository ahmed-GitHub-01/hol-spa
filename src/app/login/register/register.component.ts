import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  model: any = {};
  constructor(private route: Router, public auth: AuthService, private toastr: ToastrService) { }
  ngOnInit(): any {
  }
  Cancel(): void {
    this.route.navigate(['/profile']);
  }
  register(): void {
    this.auth.register(this.model).subscribe(
      () => {
        this.toastr.success('تاكيد', 'Create new user !');
      },
      error => {
        console.log(error);
      }
    );
  }
}
