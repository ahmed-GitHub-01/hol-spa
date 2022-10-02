import { DatePipe } from '@angular/common';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/_services/auth.service';
import { ClintService } from 'src/app/_services/clint.service';
import { ShardService } from 'src/app/_shared/shard.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-sendFileReport',
  templateUrl: './sendFileReport.component.html',
  styleUrls: ['./sendFileReport.component.scss']
})
export class SendFileReportComponent implements OnInit {
  dataFile: any = [];
  modalRef: BsModalRef;
  idFile = 0;
  nameCustomer;
  dataPdf: any = [];
  idPdf = 0;
  dtpFormat1;
  dtpFormat2;
  showRowsInContainer = 0;
  searchByTowDate;
  idToDelete;
  refusedFile: any = [];
  appEdit = 0;
  constructor(
    private title: Title,
    private clint: ClintService,
    private auth: AuthService,
    private toastr: ToastrService,
    private modalService: BsModalService,
    private pipe: DatePipe,
    private shard: ShardService
  ) { }
  id = 0;
  fileCounter: any = {};
  saveSendFile: any = {};
  allPdf: any = [];
  additioanl: any = [];
  additionalPDF: any;
  additionalAmount: any;
  additionalNote: any;
  repairsPDF: any = [];
  InsurancePdf: any = [];
  typeAccident: any = [{ value: null }, { value: 'معلوم' }, { value: 'مجهول' }];
  valueTypeAccident = this.typeAccident[0];
  typeDamage: any = [{ value: null }, { value: 'تلفيات' }, { value: 'هلاك كلى ( سكراب )' }];
  valueTypeDamage = this.typeDamage[0];
  damagePdf: any = [];
  sendFileForm: any = {};
  ngOnInit(): any {
    this.title.setTitle('الملفات المرسلة');
  }
  // searchByCivilID(civilid: number): any {
  //   this.clint.searchByCivilID(this.auth.decodedToken.unique_name[0], civilid).subscribe((res) => {
  //     this.dataFile = res;
  //   }, (error) => {
  //     this.toastr.error(error);
  //   }, (next) => {
  //     this.toastr.success('Done !');
  //   });
  // }
  // searchByName(evt: string): any {
  //   this.clint.searchByName(this.auth.decodedToken.unique_name[0], evt).subscribe((res: any) => {
  //     this.dataFile = res;
  //   }, (error: any) => {
  //     this.toastr.error(error);
  //   }, (next) => {
  //     this.toastr.success('Done!');
  //   });
  // }
  search(): any {
    this.showRowsInContainer = 1;
  }

  searchByDate(): void {
    const dtp1 = this.pipe.transform(this.dtpFormat1, 'yyyy-MM-dd');
    const dtp2 = this.pipe.transform(this.dtpFormat2, 'yyyy-MM-dd');
    this.clint.searchByDatee(this.auth.decodedToken.unique_name[0], dtp1, dtp2).subscribe((res: any) => {
      this.searchByTowDate = res;
    }, error => {
      console.log(error);
    });
  }

  showAll(): any {
    this.showRowsInContainer = 2;
    this.clint.showAllSend(this.auth.decodedToken.unique_name[0]).subscribe((res: any) => {
      this.dataFile = res;
    }, (error) => {
      this.toastr.error(error);
    }, (next) => {
      this.toastr.success('Done!');
    });
  }

  refusedFlie(): any {
    this.showRowsInContainer = 3;
    this.clint.refusedFlie(this.auth.decodedToken.unique_name[0]).subscribe((res: any) => {
      this.refusedFile = res;
    }, (error: any) => {
      this.toastr.error(error);
    }, (next: any) => {
      this.toastr.success('Done!');
    });
  }

  showModal(template: TemplateRef<any>, evt: any): any {
    this.idFile = evt.row.data.id;
    const idForFile = evt.row.data.id;
    this.nameCustomer = evt.row.data.name;
    this.clint.showPdf(this.auth.decodedToken.unique_name[0], idForFile).subscribe((res: any) => {
      this.dataPdf = res;
    }, (error: any) => {
      this.toastr.error(error);
    }, (next) => {

    });
    this.modalRef = this.modalService.show(template,
      Object.assign({}, { class: 'modal-m modal-dialog modal-dialog-centered' }));
  }

  deleteFile(): any {
    this.clint.deleteFile(this.auth.decodedToken.unique_name[0], this.idFile).subscribe(() => {
      this.toastr.success('File has been Deleted!');
    }, (error) => {
      this.toastr.error(error);
    }, (next) => {
      this.showAll();
      this.idFile = 0;
    });
  }

  showPdf(evt: any): any {
    let id: number;
    if (typeof (evt) === 'object') {
      id = evt.row.data.id;
    } else {
      id = evt;
    }
    this.clint.openPDF(this.auth.decodedToken.unique_name[0], id).subscribe((res: any) => {
      const byteCharacters = atob(res.pdf);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: 'pdf/pdf' });
      if (navigator) {
        const filename = this.nameCustomer + '.pdf';
        // navigator.msSaveBlob(blob, filename);
      } else {
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.setAttribute('visibility', 'hidden');
        link.download = this.nameCustomer + '.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }, (error) => {
      this.toastr.error(error);
    });
  }

  deletePDF(): void {
    this.clint.deletePdf(this.auth.decodedToken.unique_name[0], this.idPdf).subscribe(() => {
      this.toastr.success('File attachment has been deleted!');
    }, (error: any) => {
      this.toastr.error(error);
    }, (next) => {
      this.idPdf = 0;
    });
  }

  deletePDFf(template: any, evt: any): void {
    this.idPdf = evt.row.data.id;
    this.modalRef = this.modalService.show(template,
      Object.assign({}, { class: 'modal-m modal-dialog modal-dialog-centered' }));
  }

  updateFile(evt: any): void {
    const id = evt.row.data.id;
    this.appEdit = 1;
    this.id = id;
    this.getFileByID(id);
  }

  disAppearEdit(): void {
    this.appEdit = 0;
  }

  getFileByID(id): void {
    this.clint.getFileByID(this.auth.decodedToken.unique_name[0], id).subscribe((res: any) => {
      this.sendFileForm = res;
    }, error => {
      this.toastr.error(error);
    }, next => {
      this.calcCounter();
      this.clacAgance();
      this.repairs_Pdf(id);
    });
  }
  calcCounter(): any {
    const oneDay = 24 * 60 * 60 * 1000; // hours * minutes * seconds * milliseconds
    const firstDate: any = new Date(this.sendFileForm.dateRentalCar);
    const secondDate: any = new Date(this.sendFileForm.dateReturnCar);
    if (secondDate < firstDate) {
      this.toastr.error('تاريخ العودة اقل من تاريخ التأجير');
      return;
    } else {
      this.fileCounter.countDay = Math.round(Math.abs((firstDate - secondDate) / oneDay) + 1);
      this.sendFileForm.totalRenatl = Math.round(this.fileCounter.countDay * this.sendFileForm.rentToday);
    }
    this.fileCounter.difCounter = Math.round(
      this.sendFileForm.readEnterCounter - this.sendFileForm.readExitCounter);
    this.fileCounter.encreaseCounter = Math.round(
      (this.fileCounter.difCounter - this.fileCounter.countDay * this.sendFileForm.allowDailyLimit));
    if (this.fileCounter.encreaseCounter < 0) {
      this.sendFileForm.incrementAmount = 0;
    } else {
      this.sendFileForm.incrementAmount = Math.round(
        this.fileCounter.encreaseCounter * this.sendFileForm.unitValueIncrement);
    }
  }
  clacAgance(): any {
    if (this.sendFileForm.dateEnterAgancy === null) {
      this.sendFileForm.totalAgancyRent = 0;
      return;
    }
    const oneDay = 24 * 60 * 60 * 1000;
    const firstDate: any = new Date(this.sendFileForm.dateEnterAgancy);
    const secondtDate: any = new Date(this.sendFileForm.dateExitAgancy);
    if (secondtDate < firstDate) {
      this.toastr.error('تاريخ دخول الوكالة اقل من تاريخ خروج الوكالة');
      return;
    }
    this.sendFileForm.totalAgancyRent = 0;
    this.fileCounter.aganceDays = Math.round(Math.abs((firstDate - secondtDate) / oneDay) + 1);
    this.sendFileForm.totalAgancyRent = (Math.round(this.fileCounter.aganceDays *
      this.sendFileForm.rentToday));
  }
  repairs_Pdf(id): any {
    this.clint.repairs_Pdf(this.auth.decodedToken.unique_name[0], id).subscribe((res: any) => {
      this.repairsPDF = res;
    }, (error: any) => {
      this.toastr.error(error);
    });
  }

  editFile(): void {
    this.clint.updateFile(this.auth.decodedToken.unique_name[0], this.id, this.sendFileForm).subscribe(() => {
      this.toastr.success('تم التعديل');
    });
  }
  onCheckDateChange(): any {
    this.sendFileForm.checkDate = this.pipe.transform(this.sendFileForm.checkDate, 'dd-MM-yyyy');
  }
}
