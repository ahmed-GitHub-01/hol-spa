import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/_services/auth.service';
import * as AOS from 'aos';

@Component({
  selector: 'app-clintdashbord',
  templateUrl: './clintdashbord.component.html',
  styleUrls: ['./clintdashbord.component.scss'],
})
export class ClintdashbordComponent implements OnInit {
  app = 0;
  sectors;
  constructor(
    private title: Title,
    private toastr: ToastrService,
    private router: Router,
    private auth: AuthService,
  ) { }


  ngOnInit(): any {
    AOS.init();
    this.title.setTitle('الموكلين');
    if (this.auth.decodedToken?.unique_name[2] === '1') {
      this.sectors = 1;
    }
  }

  logout(): any {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
    this.toastr.info('! تم تسجيل الخروج بنجاح');
  }


  toggleMenu(): void {
    const toggle = document.querySelector('.toggle');
    const navigation = document.querySelector('.navigation');
    const main = document.querySelector('.main');
    toggle.classList.toggle('active');
    navigation.classList.toggle('active');
    main.classList.toggle('active');
  }

  selectApp(evt: number): any {
    this.app = evt;
  }


  uploadPdf(id: number): any {

  }

}
