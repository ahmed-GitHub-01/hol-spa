import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { ToastrService } from 'ngx-toastr';
import { CallCenterService } from 'src/app/_services/callCenter.service';
import { LoadingService } from 'src/app/_services/loading.service';
import { ReportService } from 'src/app/_services/report.service';

@Component({
  selector: 'app-mainreport',
  templateUrl: './mainreport.component.html',
  styleUrls: ['./mainreport.component.scss']
})
export class MainreportComponent implements OnInit {
  @ViewChild('staticTabs', { static: false }) staticTabs?: TabsetComponent;
  constructor(
    private call: CallCenterService,
    private toastr: ToastrService,
    private report: ReportService,
    public datepipe: DatePipe,
    public loader: LoadingService
  ) { }
  loading$ = this.loader.loading$;
  sector = [];
  valueSectorPayment = this.sector[0];
  valueSectorStatment = this.sector[0];
  valueSectorFiles = this.sector[0];
  company = [];
  valueCompanyPayment = this.company[0];
  valueCompanyStatment = this.company[0];
  valueCompanyFiles = this.company[0];
  group: any = [
    { name: 'All' },
    { name: 'Cairo' },
    { name: 'Cairo 2' },
    { name: 'Alex' },
  ];
  valueGroubPayment = this.group[0].name;
  valueGroubStatment = this.group[0].name;
  valueGroubFiles = this.group[0].name;
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

  ngOnInit(): void {
    this.sectors();
  }

  sectors(): any {
    this.call.sectors().subscribe((res) => {
      this.sector = res;
    }, (error) => {
      this.toastr.error(error);
    });
  }

  companySlecetPayment(): any {
    this.call.companySlecet(this.valueSectorPayment).subscribe((res) => {
      this.company = res;
    }, (error) => {
      this.toastr.error(error);
    });
  }

  companySlecetStatment(): any {
    this.call.companySlecet(this.valueSectorStatment).subscribe((res) => {
      this.company = res;
    }, (error) => {
      this.toastr.error(error);
    });
  }

  companySlecetFiles(): any {
    this.call.companySlecet(this.valueSectorFiles).subscribe((res) => {
      this.company = res;
    }, (error) => {
      this.toastr.error(error);
    });
  }

  paymentResult(): any {
    this.loader.show();
    const data1 = this.datepipe.transform(this.dtp1Payment, 'yyyy-MM-dd');
    const data2 = this.datepipe.transform(this.dtp2Payment, 'yyyy-MM-dd');
    this.tableAppear = 1;
    this.report.paymentReport(
      this.valueSectorPayment, this.valueCompanyPayment, this.valueGroubPayment, data1, data2
    ).subscribe((res) => {
      this.resultPayment = res;
      this.staticTabs.tabs[1].active = true;
      this.loader.hide();
    }, (error) => {
      this.toastr.error(error);
      this.loader.hide();
    });
  }

  statmentReport(): any {
    this.loader.show();
    const data1 = this.datepipe.transform(this.dtp1Statment, 'yyyy-MM-dd');
    const data2 = this.datepipe.transform(this.dtp2Statment, 'yyyy-MM-dd');
    this.tableAppear = 2;
    this.report.statmentReport(
      this.valueSectorStatment, this.valueCompanyStatment, this.valueGroubStatment, data1, data2
    ).subscribe((res) => {
      this.resultStatment = res;
      this.staticTabs.tabs[1].active = true;
      this.loader.hide();
    }, (error) => {
      this.toastr.error(error);
      this.loader.hide();
    });
  }

  filesReport(): any {
    this.loader.show();
    this.tableAppear = 3;
    this.report.filesReport(this.valueSectorFiles, this.valueCompanyFiles, this.valueGroubFiles).subscribe((res: any) => {
      this.resultFiles = res;
      this.staticTabs.tabs[1].active = true;
      this.loader.hide();
    }, (error) => {
      this.toastr.error(error);
      this.loader.hide();
    });
  }

  statmentReportReview(): any {
    this.loader.show();
    const data1 = this.datepipe.transform(this.dtp1Statment, 'yyyy-MM-dd');
    const data2 = this.datepipe.transform(this.dtp2Statment, 'yyyy-MM-dd');
    this.tableAppear = 2;
    this.report.statmentReportReview(
      this.valueSectorStatment, this.valueCompanyStatment, this.valueGroubStatment, data1, data2
    ).subscribe((res: any) => {
      this.resultStatment = res;
      this.staticTabs.tabs[1].active = true;
      this.loader.hide();
    }, (error) => {
      this.toastr.error(error);
      this.loader.hide();
    });
  }
}
