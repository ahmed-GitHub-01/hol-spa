import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/_services/auth.service';
import { CallCenterService } from 'src/app/_services/callCenter.service';
import { ReportService } from 'src/app/_services/report.service';

@Component({
  selector: 'app-batchperformance',
  templateUrl: './batchperformance.component.html',
  styleUrls: ['./batchperformance.component.scss']
})
export class BatchperformanceComponent implements OnInit {

  constructor(
    private report: ReportService,
    private call: CallCenterService,
    private toastr: ToastrService,
    private auth: AuthService
  ) { }
  company = [];
  valueCompany = this.company[0];
  dataPerformance = [];
  ngOnInit(): void {
    this.selectCompany();
  }

  selectCompany(): void {
    this.call.companySlecet(1).subscribe((res) => {
      this.company = res;
    }, (error) => {
      this.toastr.error(error);
    });
  }

  batchPerformance(): void {
    this.report.batchPerformance(this.valueCompany, this.auth.decodedToken.unique_name[0]).subscribe((res) => {
      this.dataPerformance = res;
    }, (error) => {
      this.toastr.error(error);
      console.log(error);
    });
  }
}
