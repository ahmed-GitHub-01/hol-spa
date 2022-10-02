import { Component, OnDestroy, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from './_services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import idleTimer from './_guards/idleTimer.js';
import { HttpClient } from '@angular/common/http';
import { MessageSignalrService } from './signalrServices/message-signalr.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, OnDestroy {
  [x: string]: any;
  jwtHelper = new JwtHelperService();
  constructor(
    private authService: AuthService,
    private message: MessageSignalrService
  ) { }
  // href = '';
  ngOnInit(): any {
    const token = localStorage.getItem('token');
    this.authService.decodedToken = this.jwtHelper.decodeToken(token);
    if (token) {
      this.message.createHubConnection();
    }
    // this.timer = new idleTimer({
    //   timeout: 500000000,
    //   onTimeout: () => {
    //     this.href = this.router.url;
    //     if (this.href !== '/login') {
    //       alert('Time Out!');
    //       localStorage.removeItem('token');
    //       localStorage.removeItem('roule');
    //       localStorage.removeItem('user');
    //       this.router.navigate(['/login']);
    //     }
    //   }
    // });
  }

  ngOnDestroy(): void {
    this.message.stopHubConnection();
  }
}
