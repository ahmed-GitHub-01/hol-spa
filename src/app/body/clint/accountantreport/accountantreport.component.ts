import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/_services/auth.service';
import { ClintService } from 'src/app/_services/clint.service';

@Component({
  selector: 'app-accountantreport',
  templateUrl: './accountantreport.component.html',
  styleUrls: ['./accountantreport.component.scss']
})
export class AccountantreportComponent implements OnInit {
  accPay: any = [];
  constructor(
    private title: Title,
    private client: ClintService,
    private toastr: ToastrService,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    this.title.setTitle('المدفوعات');
    this.paymentInOffice();
  }

  paymentInOffice(): any {
    this.client.paymentInOffice(this.auth.decodedToken.unique_name[0]).subscribe((res) => {
      this.accPay = res;
    }, (error) => {
      this.toastr.error(error);
    });
  }
}
