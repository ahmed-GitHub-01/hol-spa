import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/_services/auth.service';
import { CallCenterService } from 'src/app/_services/callCenter.service';
import { LoadingService } from 'src/app/_services/loading.service';
import { ReportService } from 'src/app/_services/report.service';

@Component({
  selector: 'app-branchreport',
  templateUrl: './branchreport.component.html',
  styleUrls: ['./branchreport.component.scss']
})
export class BranchreportComponent implements OnInit {

  @ViewChild('staticTabs', { static: false }) staticTabs?: TabsetComponent;

  constructor(
    public loader: LoadingService,
    private call: CallCenterService,
    private toastr: ToastrService,
    private report: ReportService,
    public datepipe: DatePipe,
    private auth: AuthService) { }

  loading$ = this.loader.loading$;
  sector = [];
  valueSectorPayment = this.sector[0];
  valueSectorStatment = this.sector[0];
  valueSectorFiles = this.sector[0];
  company = [];
  valueCompanyPayment = this.company[0];
  valueCompanyStatment = this.company[0];
  valueCompanyFiles = this.company[0];
  resultPayment = [];
  dtp1Payment;
  dtp2Payment;
  dtp1Statment;
  dtp2Statment;
  dtp1Files;
  dtp2Files;
  tableAppear = 0;
  resultStatment = [];
  resultFiles = [];
  ngOnInit(): any {
    this.sectors();
  }

  sectors(): any {
    this.call.sectors().subscribe((res: any) => {
      this.sector = res;
    }, (error: any) => {
    });
  }

  companySlecetPayment(): any {
    this.call.companySlecet(this.valueSectorPayment).subscribe((res) => {
      this.company = res;
    }, (error: any) => {
    });
  }

  companySlecetStatment(): any {
    this.call.companySlecet(this.valueSectorStatment).subscribe((res: any) => {
      this.company = res;
    }, (error: any) => {
    });
  }

  companySlecetFiles(): any {
    this.call.companySlecet(this.valueSectorFiles).subscribe((res: any) => {
      this.company = res;
    }, (error: any) => {
    });
  }
  paymentResult(): any {
    this.loader.show();
    const data1 = this.datepipe.transform(this.dtp1Payment, 'yyyy-MM-dd');
    const data2 = this.datepipe.transform(this.dtp2Payment, 'yyyy-MM-dd');
    this.tableAppear = 1;
    this.report.paymentReport(
      this.valueSectorPayment, this.valueCompanyPayment, this.auth.decodedToken.unique_name[3], data1, data2
    ).subscribe((res: any) => {
      this.resultPayment = res;
      this.staticTabs.tabs[1].active = true;
      this.loader.hide();
    }, (error: any) => {
      this.loader.hide();
    });
  }

  statmentReport(): any {
    this.loader.show();
    const data1 = this.datepipe.transform(this.dtp1Statment, 'yyyy-MM-dd');
    const data2 = this.datepipe.transform(this.dtp2Statment, 'yyyy-MM-dd');
    this.tableAppear = 2;
    this.report.statmentReport(
      this.valueSectorStatment, this.valueCompanyStatment, this.auth.decodedToken.unique_name[3], data1, data2
    ).subscribe((res: any) => {
      this.resultStatment = res;
      this.staticTabs.tabs[1].active = true;
      this.loader.hide();
    }, (error: any) => {
      this.loader.hide();
    });
  }

  filesReport(): any {
    this.loader.show();
    this.tableAppear = 3;
    this.report.filesReport(this.valueSectorFiles, this.valueCompanyFiles, this.auth.decodedToken.unique_name[3]).subscribe((res: any) => {
      this.resultFiles = res;
      this.staticTabs.tabs[1].active = true;
      this.loader.hide();
    }, (error: any) => {
      this.loader.hide();
    });
  }

  statmentReportReview(): any {
    this.loader.show();
    const data1 = this.datepipe.transform(this.dtp1Statment, 'yyyy-MM-dd');
    const data2 = this.datepipe.transform(this.dtp2Statment, 'yyyy-MM-dd');
    this.tableAppear = 2;
    this.report.statmentReportReview(
      this.valueSectorStatment, this.valueCompanyStatment, this.auth.decodedToken.unique_name[3], data1, data2
    ).subscribe((res: any) => {
      this.resultStatment = res;
      this.staticTabs.tabs[1].active = true;
      this.loader.hide();
    }, (error: any) => {
      this.loader.hide();
    });
  }
}
