import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/_services/auth.service';
import { SecService } from 'src/app/_services/sec.Service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-uploadProcess',
  templateUrl: './uploadProcess.component.html',
  styleUrls: ['./uploadProcess.component.scss']
})
export class UploadProcessComponent implements OnInit {
  dataProcess: any = [];
  dataFile: any = [];
  processName: any = [
    { value: 'ضبط واحضار' },
    { value: 'منع سفر' },
    { value: 'استعلام سيارات' }
  ];
  processNameValue = this.processName[0];
  constructor(private auth: AuthService, private sec: SecService, private toastr: ToastrService) { }

  ngOnInit(): any { }

  uploadProcessFile(code: number): any {
    this.sec.uploadProcess(this.auth.decodedToken.unique_name[0], code).subscribe((res: any) => {
      this.dataFile = res;
    }, (error: any) => {
      this.toastr.error(error);
    }, (next: any) => {

    });
  }

  addToarray(): any {
    const dateProcess = new Date().toLocaleString('en-US', { timeZone: 'Asia/Kuwait' });
    this.dataProcess.push({
      CODE: this.dataFile.code, DATE_: dateProcess, NOTE: this.dataFile.note, PROCE: this.processNameValue,
      EMP: this.auth.decodedToken.unique_name[0], NAME: this.dataFile.name, Case: this.dataFile.case,
      Due: this.dataFile.due, Contract: this.dataFile.contract, civilid: this.dataFile.civilid,
      National: this.dataFile.nationality, Auto: this.dataFile.autoNum, Clint: this.dataFile.clint,
      Court: this.dataFile.court, EmpCourt: this.dataFile.courtEmp
    });
  }

  saveProcess(): any {
    this.sec.saveProcess(this.auth.decodedToken.unique_name[0], this.dataProcess).subscribe(() => {
      this.toastr.success('Upload process has been saved!');
    }, (error: any) => {
      this.toastr.error(error);
    });
  }
}
