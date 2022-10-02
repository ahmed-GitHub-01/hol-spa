import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faBell, faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { MessageSignalrService } from '../signalrServices/message-signalr.service';
import { AuthService } from '../_services/auth.service';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})

export class NavComponent implements OnInit {
  user = 'User Login';
  faPaperPlan = faBell;
  faenvelope = faEnvelope;
  constructor(
    private router: Router, private toastr: ToastrService,
    public auth: AuthService, private message: MessageSignalrService) { }
  ngOnInit(): any {
  }

  loggedIn(): any {
    return this.auth.loggedIn();
  }

  logout(): any {
    localStorage.removeItem('_expiredTime');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('roule');
    this.router.navigate(['/login']);
    this.message.stopHubConnection();
    this.toastr.info('! تم تسجيل الخروج بنجاح');
  }

  dashbord(): any {
    this.user = 'User Login';
    const user = localStorage.getItem('user');
    if (user === 'clint') {
      this.user = 'User Login';
      this.router.navigate(['/clintdashbord']);
    } else if (user === 'emp') {
      this.user = this.auth.decodedToken?.unique_name[1];
      this.router.navigate(['/dashbord']);
    }
  }
}
