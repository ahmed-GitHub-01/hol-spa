import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MessageSignalrService } from 'src/app/signalrServices/message-signalr.service';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  model: any = {};
  model1: any = {};
  constructor(
    private auth: AuthService,
    private route: Router,
    private toastr: ToastrService,
    private title: Title,
    private message: MessageSignalrService
  ) {
  }
  ngOnInit(): any {
    this.title.setTitle('Login');
  }
  login(): any {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('roule');
    this.auth.login(this.model).subscribe(
      (next) => {

      },
      (error) => {
        this.toastr.error(error);
      }, () => {
        this.message.createHubConnection();
        this.route.navigate(['/dashbord']);
      }
    );
  }

  loginClint(): any {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('roule');
    const textToSplit = this.model1.Code;
    const split = textToSplit.split('-');
    if (split[1] === undefined) {
      this.auth.loginClint(this.model1).subscribe(
        (next) => { },
        (error) => {
          this.toastr.error(error);
        }, () => {
          this.route.navigate(['/clintdashbord']);
        }
      );
    } else {
      this.auth.loginSubClint(this.model1, split[0]).subscribe(
        (next) => { },
        (error) => {
          this.toastr.error(error);
        }, () => {
          this.route.navigate(['/clintdashbord']);
        }
      );
    }
  }
}
