import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settingimplement',
  templateUrl: './settingimplement.component.html',
  styleUrls: ['./settingimplement.component.scss']
})
export class SettingimplementComponent implements OnInit {

  constructor(
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
  }

  toggle(): void {
    const s = document.querySelector('.settings-box .fa-cog');
    s.classList.toggle('fa-spin');
    const c = document.querySelector('.settings-box');
    c.classList.toggle('open');
    const dtp = new Date().toLocaleDateString('en-US', { timeZone: 'Asia/Kuwait' });
    const dtp1 = this.datePipe.transform(dtp, 'yyyy-MM-dd');
    // this.call.countStatement(this.auth.decodedToken.unique_name[0], dtp1).subscribe((res: any) => {
    //   this.countStatement = res;
    // }, (error) => {
    //   this.tosstr.error(error);
    // });
    // this.call.CountStatementClean(this.auth.decodedToken.unique_name[0], dtp1).subscribe((res: any) => {
    //   this.countStatementClean = res;
    // }, (error) => {
    //   this.tosstr.error(error);
    // });
  }
}
