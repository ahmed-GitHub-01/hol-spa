import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/_services/auth.service';
import { SecService } from 'src/app/_services/sec.Service';
import * as XLSX from 'xlsx';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-uploadFromExcel',
  templateUrl: './uploadFromExcel.component.html',
  styleUrls: ['./uploadFromExcel.component.scss']
})
export class UploadFromExcelComponent implements OnInit {
  data: any = [];
  dataToSave: any = [];
  dataToCompare: any = [];
  dataToUpdateTrans: any = [];
  dataPayment: any = [];
  id;
  headerTitle = '';
  updateFileEmp: any = [];
  constructor(
    private toastr: ToastrService,
    private title: Title,
    private activetedRoute: ActivatedRoute,
    private auth: AuthService,
    private sec: SecService) {
    this.activetedRoute.params.subscribe(data => {
      this.id = data.id;
    });
  }

  ngOnInit(): any {
    this.title.setTitle('Upload from excel.');
    // tslint:disable-next-line:triple-equals
    if (this.id == 1) {
      this.headerTitle = 'رفع ملفات جديدة';
      // tslint:disable-next-line:triple-equals
    } else if (this.id == 2) {
      this.headerTitle = 'رفع سداد';
    }
  }

  onFileChange(evt: any): any {
    let workBook = null;
    let jsonData = null;
    this.dataToSave = null;
    this.dataToCompare = [];
    const reader = new FileReader();
    const file = evt.target.files[0];
    reader.onload = () => {
      const data = reader.result;
      workBook = XLSX.read(data, { type: 'binary' });
      jsonData = workBook.SheetNames.reduce(() => {
        const sheet = workBook.Sheets.Sheet1;
        const jsonFile = XLSX.utils.sheet_to_json(sheet);
        return jsonFile;
      }, {});
      const dataString: any = JSON.stringify(jsonData);
      const convertJson: any = JSON.parse(dataString);
      this.dataToSave = convertJson;
      // tslint:disable-next-line:triple-equals
      if (this.id == 2) { this.compareTransfareToCompany(); }
    },
      reader.readAsBinaryString(file);
  }

  saveFile(): any {
    // tslint:disable-next-line:triple-equals
    if (this.id == 1) {
      const fileMain: any = [];
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.dataToSave.length; i++) {
        fileMain.push({
          CODE: this.dataToSave[i].الكود, NAME: this.dataToSave[i].الاسم, REASON_DUE: this.dataToSave[i]['سبب المديونية'],
          BATCH_NO: this.dataToSave[i]['رقم الباتش'], EMPLOYE: this.dataToSave[i].الموظف,
          ENTRY_EMPLOY: this.auth.decodedToken.unique_name[0], DATE_LOGIN: this.dataToSave[i]['تاريخ الورود'],
          CODE_CLINT: this.dataToSave[i]['كود الموكل'], DATE_Receive: this.dataToSave[i]['تاريخ التسليم'],
          DATE_Withdrawal: this.dataToSave[i]['تاريخ السحب'], CONTRACT_NUM: this.dataToSave[i]['رقم العقد'],
          AUTO_NUM: this.dataToSave[i]['الرقم الالى'], CASE_CLINT: this.dataToSave[i].الحالة,
          EMP_CASE_CLIENT: this.auth.decodedToken.unique_name[0], TOTAL_CLAIM: this.dataToSave[i]['قيمة المطالبة'],
          NOTE: this.dataToSave[i].ملاحظات, ADDRESS: this.dataToSave[i].العنوان, NATIONAL_: this.dataToSave[i].الجنسية,
          CIVIL_ID: this.dataToSave[i]['الرقم المدنى'], CUST_ID_OFFICE1: this.dataToSave[i]['ترقيم الشركة1'],
          CUST_ID_OFFICE2: this.dataToSave[i]['ترقيم الشركة2'], LINE_KIND_NOTE_2: this.dataToSave[i]['ملاحظات الخط'],
          NOTE_2: this.dataToSave[i].ملاحظات2, NOTE_3: this.dataToSave[i].ملاحظات3, NOTE_4: this.dataToSave[i].ملاحظات4,
          CODE_SECTOR: this.dataToSave[i].القطاع, DRAFT: this.dataToSave[i]['المدعى القانونى'],
          ENTRY_FILE: this.auth.decodedToken.unique_name[0], _PAY: 0, _EMPLOY: this.dataToSave[i].الموظف,
          _MOHAD: this.dataToSave[i].الموحد
        });
      }
      this.sec.saveFile(this.auth.decodedToken.unique_name[0], fileMain).subscribe(() => {
      }, (error: any) => {
        this.toastr.error(error);
      }, (next: any) => {
        this.toastr.success('File has been uplaoded.');
      });
      // tslint:disable-next-line:triple-equals
    } else if (this.id == 2) {
      this.sec.inputPayment(this.auth.decodedToken.unique_name[0], this.dataPayment).subscribe(() => {
      }, (next: any) => {
        this.toastr.success('Payment has been inserted!');
      }, (error: any) => {
        this.toastr.error(error);
      });
    }
  }

  updateFile(): any {
    if (this.id === '3') {
      const updateEmp: any = [];
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.dataToSave.length; i++) {
        updateEmp.push({ CODE: this.dataToSave[i].الكود, EMPLOYE: this.dataToSave[i].الموظف });
      }
      if (updateEmp != null) {
        this.sec.updateEmp(this.auth.decodedToken.unique_name[0], updateEmp).subscribe(() => {
        }, (error: any) => {
          this.toastr.error(error);
        }, (next: any) => {
          this.toastr.success('Employee has been Updated !');
        });
      }
    } else if (this.id === '4') {
      const updateEmp: any = [];
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.dataToSave.length; i++) {
        updateEmp.push({ CODE: this.dataToSave[i].الكود, CASE_CLINT: this.dataToSave[i].الحالة });
      }
      if (updateEmp != null) {
        this.sec.updateCases(this.auth.decodedToken.unique_name[0], updateEmp).subscribe(() => {
        }, (error: any) => {
          this.toastr.error(error);
        }, (next: any) => {
          this.toastr.success('Cases has been Updated !');
        });
      }
    } else if (this.id === '5') {
      const updateEmp: any = [];
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.dataToSave.length; i++) {
        updateEmp.push({ CODE: this.dataToSave[i].الكود, AUTO_NUM: this.dataToSave[i]['الرقم الالى'] });
      }
      if (updateEmp != null) {
        this.sec.updateAutoNumber(this.auth.decodedToken.unique_name[0], updateEmp).subscribe(() => {
        }, (error: any) => {
          this.toastr.error(error);
        }, (next: any) => {
          this.toastr.success('Auto number has been Updated !');
        });
      }
    } else if (this.id === '6') {
      const updateEmp: any = [];
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.dataToSave.length; i++) {
        updateEmp.push({ CODE: this.dataToSave[i].الكود, NOTE_4: this.dataToSave[i].الملاحظات });
      }
      if (updateEmp != null) {
        this.sec.updateNote4(this.auth.decodedToken.unique_name[0], updateEmp).subscribe(() => {
        }, (error: any) => {
          this.toastr.error(error);
        }, (next: any) => {
          this.toastr.success('Note 4 has been Updated !');
        });
      }
    } else if (this.id === '7') {
      const updateEmp: any = [];
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.dataToSave.length; i++) {
        updateEmp.push({ CODE: this.dataToSave[i].الكود, MOHAD: this.dataToSave[i].الموحد });
      }
      if (updateEmp != null) {
        this.sec.updateMohed(this.auth.decodedToken.unique_name[0], updateEmp).subscribe(() => {
        }, (error: any) => {
          this.toastr.error(error);
        }, (next: any) => {
          this.toastr.success('Number Mohad has been Updated !');
        });
      }
    } else if (this.id === '8') {
      const updateEmp: any = [];
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.dataToSave.length; i++) {
        updateEmp.push({ CODE: this.dataToSave[i].الكود, CLOSED: this.dataToSave[i].الملف });
      }
      if (updateEmp != null) {
        this.sec.updateClosedFile(this.auth.decodedToken.unique_name[0], updateEmp).subscribe(() => {
        }, (error: any) => {
          this.toastr.error(error);
        }, (next: any) => {
          this.toastr.success('Closed File has been Updated !');
        });
      }
    } else if (this.id === '9') {
      const updateEmp: any = [];
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.dataToSave.length; i++) {
        updateEmp.push({ CODE: this.dataToSave[i].الكود, NOTE_5: this.dataToSave[i].الملاحظات });
      }
      if (updateEmp != null) {
        this.sec.updateNote5(this.auth.decodedToken.unique_name[0], updateEmp).subscribe(() => {
        }, (error: any) => {
          this.toastr.error(error);
        }, (next: any) => {
          this.toastr.success('Note 5 File has been Updated !');
        });
      }
    }

  }

  compareTransfareToCompany(): any {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.dataToSave.length; i++) {
      this.sec.compareTransfareToCompany(this.dataToSave[i].الكود).subscribe((res: any) => {
        if (res.length > 0) {
          // tslint:disable-next-line:prefer-for-of
          for (let ii = 0; ii < res.length; ii++) {
            this.dataToCompare.push({
              IdTrans: res[ii].id, CODE: res[ii].code, NUMBER_D: res[ii].numberD, AMOUNT: res[ii].totalPyment, DATE_NUM: res[ii].datePay,
              ID_PAY: res[ii].idPay, AMOUNT2: this.dataToSave[i].السداد, BACK_DATE: this.dataToSave[i]['تاريخ السداد'],
              Diffrent: res[ii].totalPyment - this.dataToSave[i].السداد
            });
          }
        } else {
          this.dataPayment.push({
            CODE: this.dataToSave[i].الكود, COMPANY: this.dataToSave[i].السداد,
            ENTRY: this.auth.decodedToken.unique_name[0], DATE_PAY: this.dataToSave[i]['تاريخ السداد'],
            NOTE: this.dataToSave[i].الملاحظات
          });
        }
      });
    }
  }

  confirmedPayAll(): any {
    // console.log(this.dataToCompare);
    this.sec.updatePaymentConfirmAll(this.auth.decodedToken.unique_name[0], this.dataToCompare).subscribe(() => {
      this.toastr.success('Confirmed all has been done !');
    }, (error: any) => {
      this.toastr.error(error);
    });
  }

  confirmedPay(e: any): any {
    console.log(e.row.data.CODE);
  }

  unConfirmedPayAll(): any {
    console.log(this.dataToCompare);
  }

  unConfirmedPay(e: any): any {
    console.log(e.row.data.NUMBER_D);
  }

}
