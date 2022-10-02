import { Component, OnInit, TemplateRef } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/_services/auth.service';
import { SecService } from 'src/app/_services/sec.Service';
import * as AOS from 'aos';

@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.scss']
})
export class DashbordComponent implements OnInit {
  modalRef: BsModalRef;
  modalAppear = 0;
  updateFile: any = [];
  idEditOne = 0;
  autoNumberType: any = [];
  autoNumberTypeValue = this.autoNumberType[0];
  autoNumberClimat: any = [];
  autoNumeberClimatValue = this.autoNumberClimat[0];
  autoNumberCases: any = [];
  autoNumberCasesValue = this.autoNumberCases[0];
  appHome = 0;
  roules: any = [];
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private title: Title,
    private modalSer: BsModalService,
    private sec: SecService,
    private auth: AuthService) { }

  ngOnInit(): any {
    AOS.init();
    this.title.setTitle('Dashbord');
    const user = localStorage.getItem('user');
    if (user === 'emp') {
      this.autoNumbertype();
      this.autoNumberClimate();
      this.autoNumberCase();
      this.roulee();
    }
  }
  roulee(): any {
    this.auth.rouless().subscribe((res) => {
      this.roules = res;
    });
  }

  logout(): any {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
    this.toastr.info('! تم تسجيل الخروج بنجاح');
  }

  homeToggle(evt: number): any {
    this.appHome = evt;
  }

  uploadFile(id: number, rule): any {
    this.roulee();
    if (rule === 1) {
      this.router.navigate(['/upload', id]);
    } else {
      this.toastr.error('You do not have permission to enter !');
    }
  }

  process(): any {
    if (this.roules.proce === 1) {
      this.router.navigate(['/process']);
    } else {
      this.toastr.error('You do not have permission to enter !');
    }
  }

  orginaize(num: number, rule): void {
    this.roulee();
    if (rule === 1) {
      this.router.navigate(['/orginize', num]);
    } else {
      this.toastr.error('You do not have permission to enter !');
    }
  }

  openModal(Template: TemplateRef<any>, num: number, rule): any {
    this.roulee();
    if (rule === 1) {
      if (num === 3) { }
      this.idEditOne = num;
      this.modalRef = this.modalSer.show(Template, Object.assign({},
        { class: 'modal-dialog modal-dialog-centered' }));
    } else {
      this.toastr.error('You don\'t have permission !');
    }
  }

  openModal1(Template: TemplateRef<any>, Template2?: TemplateRef<any>): any {
    if (this.idEditOne === 10) {
      this.openModal3(Template2);
    } else {
      this.modalRef = this.modalSer.show(Template, Object.assign({},
        { class: 'modal-dialog modal-dialog-centered' }));
    }
  }

  openModal3(Template: TemplateRef<any>): any {
    this.modalRef = this.modalSer.show(Template, Object.assign({},
      { class: 'modal-dialog modal-lg modal-dialog-centered' }));
  }

  editEmploye(): void {
    const updateEmp: any = [];
    updateEmp.push({ CODE: this.updateFile.code, EMPLOYE: this.updateFile.emp });
    this.sec.updateEmp(this.auth.decodedToken.unique_name[0], updateEmp).subscribe(() => {
    }, (error: any) => {
      this.toastr.error(error);
    }, (next: any) => {
      this.toastr.success('Employee has been Updated !');
    });
  }

  editCases(): void {
    const updateEmp: any = [];
    updateEmp.push({ CODE: this.updateFile.code, CASE_CLINT: this.updateFile.cases });
    this.sec.updateCases(this.auth.decodedToken.unique_name[0], updateEmp).subscribe(() => {
    }, (error: any) => {
      this.toastr.error(error);
    }, (next: any) => {
      this.toastr.success('Employee has been Updated !');
    });
  }

  editAutoNumber(): any {
    const updateEmp: any = [];
    updateEmp.push({ CODE: this.updateFile.code, AUTO_NUM: this.updateFile.cases });
    this.sec.updateAutoNumber(this.auth.decodedToken.unique_name[0], updateEmp).subscribe(() => {
    }, (error: any) => {
      this.toastr.error(error);
    }, (next: any) => {
      this.toastr.success('Auto number has been Updated !');
    });
  }

  goToUpdateOrSave(): any {
    this.router.navigate(['/upload', this.idEditOne]);
  }

  toggleMenu(): void {
    const toggle = document.querySelector('.toggle');
    const navigation = document.querySelector('.navigation');
    const main = document.querySelector('.main');
    toggle.classList.toggle('active');
    navigation.classList.toggle('active');
    main.classList.toggle('active');
  }

  autoNumbertype(): any {
    this.sec.autoNumbertype(this.auth.decodedToken.unique_name[0]).subscribe((res: any) => {
      this.autoNumberType = res;
    }, (error: any) => {
      this.toastr.error(error);
    });
  }

  autoNumberClimate(): any {
    this.sec.autoNumberClimate(this.auth.decodedToken.unique_name[0]).subscribe((res: any) => {
      this.autoNumberClimat = res;
    }, (error: any) => {
      this.toastr.error(error);
    });
  }

  autoNumberCase(): any {
    this.sec.autoNumberCase(this.auth.decodedToken.unique_name[0]).subscribe((res: any) => {
      this.autoNumberCases = res;
    }, (error: any) => {
      this.toastr.error(error);
    });
  }

  saveAutoNumber(): any {
    const saveAuto: any = [];
    saveAuto.push({
      CODE: this.updateFile.code, AUTO_NUM: this.updateFile.autonum, SUB_AUTO_NUM: this.updateFile.mortabet,
      TYPE: this.autoNumberTypeValue, CASE_: this.autoNumberCasesValue, NOTE: this.updateFile.note,
      EMP_ENTER: this.auth.decodedToken.unique_name[0], CLAIMENT: this.autoNumeberClimatValue, COMMETIONS_RATE: 0
    });
    this.sec.saveAutoNumber2(this.auth.decodedToken.unique_name[0], saveAuto).subscribe(() => {
    }, (error: any) => {
      this.toastr.error(error);
    }, (next: any) => {
      this.toastr.success('Auto number has been save!');
    });
  }

  reportForm(roter, rule): any {
    this.roulee();
    if (rule === 1) {
      this.router.navigate(['/' + roter]);
    } else {
      this.toastr.error('You do not have permission to enter !');
    }
  }

  gotowhatsapp(): any {
    window.open('/whatsapp', '_blank');
  }
}
