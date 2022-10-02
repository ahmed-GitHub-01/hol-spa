import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../_services/auth.service';
import IdleTimer from './idleTimer.js';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) { }
  href = '';
  timer;
  canActivate(): boolean {
    this.timer = new IdleTimer({
      timeout: 900,
      onTimeout: () => {
        this.href = this.router.url;
        if (this.href !== '/login') {
          alert('Time Out!');
          localStorage.removeItem('token');
          localStorage.removeItem('roule');
          localStorage.removeItem('user');
          this.router.navigate(['/login']);
        }
      }
    });
    if (this.authService.loggedIn()) {
      return true;
    }
    this.toastr.error('يجب تسجل الدخول');
    this.router.navigate(['/login']);
    return false;
  }
}
