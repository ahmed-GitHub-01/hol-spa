import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/_services/auth.service';
import { ClintService } from 'src/app/_services/clint.service';
import { ShardService } from 'src/app/_shared/shard.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-updateFile',
  templateUrl: './updateFile.component.html',
  styleUrls: ['./updateFile.component.scss']
})
export class UpdateFileComponent implements OnInit {
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
  constructor(
    private toastr: ToastrService,
    private clint: ClintService,
    private auth: AuthService,
    private activtedRoute: ActivatedRoute,
    private shard: ShardService
  ) {
    this.activtedRoute.params.subscribe(data => {
      this.id = data.id;
    });
  }

  ngOnInit(): void {
    this.sendFileForm = {};
    this.id = this.shard.idToUpdateFileFromClient;
    this.getFileByID();
    console.log(this.shard.idToUpdateFileFromClient);
  }
  getFileByID(): void {
    this.clint.getFileByID(this.auth.decodedToken.unique_name[0], this.id).subscribe((res: any) => {
      this.sendFileForm = res;
    }, error => {
      this.toastr.error(error);
    }, next => {
      this.calcCounter();
      this.clacAgance();
      this.repairs_Pdf();
      this.toastr.success('done!');
    });
  }

  uploadFile(): any {
    // const civlIDvalid = (this.sendFileForm.get('CivilId').value).toString();
    // if (civlIDvalid === 0 || civlIDvalid.length < 12 || civlIDvalid.length > 12) {
    //   this.toastr.error('الرقم المدنى غير صحيح');
    //   return;
    // }
    // const model = (this.sendFileForm.get('Model').value).toString();
    // if (model === 0 || model.length < 4) {
    //   this.toastr.error('يرجى ادخال موديل صحيح ');
    //   return;
    // }
    // const rentToday = (this.sendFileForm.get('RentToday').value).toString();
    // if (rentToday === 0 || rentToday.length < 0 || rentToday === 'NaN') {
    //   this.toastr.error('يجب ادخال قيمة الايجار اليومى');
    //   return;
    // }
    // if (this.sendFileForm.get('DateEnterAgancy').value !== null) {
    //   if (this.sendFileForm.get('DateExitAgancy').value === null) {
    //     this.toastr.error('يجب ادخال تاريخ الخروج من الوكالة');
    //     return;
    //   }
    // }
    // if (this.sendFileForm.get('InsuranceAmount').value !== 0) {
    //   if (this.sendFileForm.get('InsuranceStartDate').value === null) {
    //     this.toastr.error('يجب ادخال تاريخ بدء الوثيقة');
    //     return;
    //   }
    //   if (this.sendFileForm.get('InsuranceEndDate').value === null) {
    //     this.toastr.error('يجب ادخال تاريخ انتهاء الوثيقة');
    //     return;
    //   }
    //   if (this.sendFileForm.get('InsuranceCompany').value === null) {
    //     this.toastr.error('يجب ادخال شركة التأمين');
    //     return;
    //   }
    // }
    // if (this.sendFileForm.get('AccidentDate').value !== null) {
    //   if (this.sendFileForm.get('DamageType').value === null) {
    //     this.toastr.error('يجب ادخال نوع الحادث');
    //     return;
    //   }
    //   if (this.sendFileForm.get('HarmType').value === null) {
    //     this.toastr.error('يجب ادخال نوع الاضرار');
    //     return;
    //   }
    //   if (this.sendFileForm.get('EnduranceValue').value === 0) {
    //     this.toastr.error('يجب ادخال قيمة ما تتحملة الشركة من اضرار ');
    //     return;
    //   }
    //   if (this.sendFileForm.get('FeeOpenFileAgancy').value === 0) {
    //     this.toastr.error('يجب ادخال رسوم فتح الملف بالوكالة ');
    //     return;
    //   }
    //   if (this.sendFileForm.get('MeasurementValue').value === 0) {
    //     this.toastr.error('يجب ادخال المقايسة ');
    //     return;
    //   }
    //   if (this.sendFileForm.get('CheckNumber').value === 0) {
    //     this.toastr.error('يجب ادخال رقم الشيك ');
    //     return;
    //   }
    //   if (this.sendFileForm.get('CheckAmount').value === 0) {
    //     this.toastr.error('يجب ادخال قيمة الشيك ');
    //     return;
    //   }
    //   if (this.sendFileForm.get('CheckDate').value === null) {
    //     this.toastr.error('يجب ادخال تاريخ الشيك ');
    //     return;
    //   }
    // }
    // let result: number;
    // const daterecourd = new Date().toLocaleString('en-US', { timeZone: 'Asia/Kuwait' });
    // this.sendFileForm.get('DateRecourd').setValue(daterecourd);
    // this.clint.uploadfile(this.auth.decodedToken.unique_name[0], this.sendFileForm.value).subscribe((res: any) => {
    //   result = res.id;
    //   this.toastr.success('تم رفع الملف');
    // }, (error: any) => {
    //   this.toastr.error(error);
    // }, () => {
    //   if (this.additioanl.length > 0) {
    //     this.uploadPdf(result, this.additioanl);
    //     this.additioanl = [];
    //   }
    //   if (this.repairsPDF.length > 0) {
    //     this.uploadPdf(result, this.repairsPDF);
    //     this.repairsPDF = [];
    //   }
    //   if (this.InsurancePdf.length > 0) {
    //     this.uploadPdf(result, this.InsurancePdf);
    //     this.InsurancePdf = [];
    //   }
    //   if (this.damagePdf.length > 0) {
    //     this.uploadPdf(result, this.damagePdf);
    //     this.damagePdf = [];
    //   }
    // });
    // result = 0;
  }

  uploadPdf(id: number, arr: any): any {
    // this.clint.uploadPdf(this.auth.decodedToken.unique_name[0], id, arr).subscribe(() => {
    // }, (error) => {
    //   this.toastr.error(error);
    // }, (next) => {
    //   this.toastr.success('File uploaded!');
    // });
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

  onFileChange(evt): any {
    // const selectedFile = evt.target.files;
    // if (selectedFile.length > 0) {
    //   const fileToLoad = selectedFile[0];
    //   const splitName = fileToLoad.name.split('.');
    //   if (splitName[1] === 'pdf' || splitName[1] === 'png' || splitName[1] === 'jpg') {
    //     const fileReader = new FileReader();
    //     let base64: any;
    //     fileReader.onload = (fileLoadedEvent) => {
    //       base64 = fileLoadedEvent.target.result;
    //       const resultSplit = base64.split(',');
    //       const sizee = (fileToLoad.size / 1024 / 1024).toFixed(2);
    //       const daterecourd = new Date().toLocaleString('en-US', { timeZone: 'Asia/Kuwait' });
    //       this.additionalPDF = resultSplit[1];
    //       this.allPdf.FileName = fileToLoad.name;
    //       this.allPdf.FileSize = sizee + ' ' + 'MB';
    //       this.allPdf.IsVoke = 'اخرى';
    //       this.allPdf.DateRecourd = daterecourd;
    //       this.allPdf.FileExt = splitName[1];
    //     };
    //     fileReader.readAsDataURL(fileToLoad);
    //   } else {
    //     this.toastr.error('The file must be in pdf!');
    //   }
    // }
  }

  addNewRowAdditional(): any {
    // if (this.sendFileForm.get('CivilId').value === null) {
    //   this.toastr.error('يجب ادخال الرقم المدنى');
    //   return;
    // }
    // if (this.additionalAmount === undefined) {
    //   this.toastr.error('يجب ادخال المبلغ');
    //   return;
    // }
    // if (this.additionalNote === undefined) {
    //   this.toastr.error('يجب ادخال البيان');
    //   return;
    // }
    // if (this.additionalPDF === undefined) {
    //   this.toastr.error('يجب ادخال المرفق');
    //   return;
    // }
    // this.additioanl.push({
    //   CivilId: this.sendFileForm.get('CivilId').value, Pdf: this.additionalPDF, FileName: this.allPdf.FileName,
    //   FileSize: this.allPdf.FileSize, Amount: this.additionalAmount, Note: this.additionalNote, IsVoke: this.allPdf.IsVoke,
    //   DateRecourd: this.allPdf.DateRecourd, FileExt: this.allPdf.FileExt
    // });
    // this.additionalPDF = undefined;
    // this.additionalAmount = undefined;
    // this.additionalNote = undefined;
    // this.allPdf = [];
  }

  deletePDf(evt): any {
    // this.additioanl.splice(this.additioanl.findIndex(m => m.fileName === evt), 1);
    // this.toastr.success('Deleted!');
  }

  showPdf(evt: any): any {
    // const byteCharacters = atob(evt);
    // const byteNumbers = new Array(byteCharacters.length);
    // for (let i = 0; i < byteCharacters.length; i++) {
    //   byteNumbers[i] = byteCharacters.charCodeAt(i);
    // }
    // const byteArray = new Uint8Array(byteNumbers);
    // const blob = new Blob([byteArray], { type: 'pdf/pdf' });
    // if (navigator.msSaveOrOpenBlob) {
    //   const filename = this.allPdf.namee + '.pdf';
    //   navigator.msSaveBlob(blob, filename);
    // } else {
    //   const link = document.createElement('a');
    //   link.href = URL.createObjectURL(blob);
    //   link.setAttribute('visibility', 'hidden');
    //   link.download = this.allPdf.namee + '.pdf';
    //   document.body.appendChild(link);
    //   link.click();
    //   document.body.removeChild(link);
    // }
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

  onFileChange2(evt: any): any {
    // const selectedFile = evt.target.files;
    // if (selectedFile.length > 0) {
    //   const fileToLoad = selectedFile[0];
    //   const splitName = fileToLoad.name.split('.');
    //   if (splitName[1] === 'pdf' || splitName[1] === 'png' || splitName[1] === 'jpg' || splitName[1] === 'jpeg') {
    //     const fileReader = new FileReader();
    //     let base64: any;
    //     fileReader.onload = (fileLoadedEvent) => {
    //       base64 = fileLoadedEvent.target.result;
    //       const resultSplit = base64.split(',');
    //       const sizee = (fileToLoad.size / 1024 / 1024).toFixed(2);
    //       const daterecourd = new Date().toLocaleString('en-US', { timeZone: 'Asia/kuwait' });
    //       this.repairsPDF.push(
    //         {
    //           CivilId: this.sendFileForm.get('CivilId').value, Pdf: resultSplit[1], FileName: fileToLoad.name,
    //           FileSize: sizee + ' ' + 'MB', IsVoke: 'اصلاحات', DateRecourd: daterecourd, FileExt: splitName[1]
    //         }
    //       );
    //     };
    //     fileReader.readAsDataURL(fileToLoad);
    //   } else {
    //     this.toastr.error('The file must be in pdf!');
    //   }
    // }
  }

  deletePDf2(evt: any): any {
    // this.repairsPDF.splice(this.repairsPDF.findIndex(m => m.fileName === evt), 1);
    // this.toastr.success('Deleted!');
  }
  repairs_Pdf(): any {
    this.clint.repairs_Pdf(this.auth.decodedToken.unique_name[0], this.id).subscribe((res: any) => {
      this.repairsPDF = res;
    }, (error: any) => {
      this.toastr.error(error);
    });
  }

  deletePDf3(evt: any): any {
    // this.InsurancePdf.splice(this.InsurancePdf.findIndex(x => x.fileName === evt), 1);
    // this.toastr.success('Deleted!');
  }

  onFileChange3(evt: any): any {
    // const selectedFile = evt.target.files;
    // if (selectedFile.length > 0) {
    //   const fileToLoad = selectedFile[0];
    //   const splitName = fileToLoad.name.split('.');
    //   if (splitName[1] === 'pdf' || splitName[1] === 'png' || splitName[1] === 'jpg' || splitName[1] === 'jpeg') {
    //     const fileReader = new FileReader();
    //     let base64: any;
    //     fileReader.onload = (fileLoadedEvent) => {
    //       base64 = fileLoadedEvent.target.result;
    //       const resultSplit = base64.split(',');
    //       const sizee = (fileToLoad.size / 1024 / 1024).toFixed(2);
    //       const daterecourd = new Date().toLocaleString('en-US', { timeZone: 'Asia/Kuwait' });
    //       this.InsurancePdf.push({
    //         CivilId: this.sendFileForm.get('CivilId').value, Pdf: resultSplit[1], FileName: fileToLoad.name,
    //         FileSize: sizee + ' ' + 'MB', IsVoke: 'تامين', DateRecourd: daterecourd, FileExt: splitName[1]
    //       });
    //     };
    //     fileReader.readAsDataURL(fileToLoad);
    //   } else {
    //     this.toastr.error('The file must be in pdf!');
    //   }
    // }
  }

  deletePDf4(evt: any): any {
    // this.damagePdf.splice(this.damagePdf.findIndex(x => x.fileName === evt), 1);
  }

  onFileChange4(evt: any): any {
    // const selectedFile = evt.target.files;
    // if (selectedFile.length > 0) {
    //   const fileToLoad = selectedFile[0];
    //   const splitName = fileToLoad.name.split('.');
    //   if (splitName[1] === 'pdf' || splitName[1] === 'png' || splitName[1] === 'jpg' || splitName[1] === 'jpeg') {
    //     const fileReader = new FileReader();
    //     let base64: any;
    //     fileReader.onload = (fileLoadedEvent) => {
    //       base64 = fileLoadedEvent.target.result;
    //       const resultSplit = base64.split(',');
    //       const sizee = (fileToLoad.size / 1024 / 1024).toFixed(2);
    //       const daterecourd = new Date().toLocaleString('en-US', { timeZone: 'Asia/Kuwait' });
    //       this.damagePdf.push({
    //         CivilId: this.sendFileForm.get('CivilId').value, Pdf: resultSplit[1],
    //  FileName: fileToLoad.name, FileSize: sizee + ' ' + 'MB',
    //         IsVoke: 'حادث', DateRecourd: daterecourd, FileExt: splitName[1]
    //       });
    //     };
    //     fileReader.readAsDataURL(fileToLoad);
    //   } else {
    //     this.toastr.error('The file must be in pdf!');
    //   }
    // }
  }

  onlyNumberAllowed(event): any {
    //   const charCode = (event.which) ? event.which : event.keyCode;
    //   if (charCode > 31 && (charCode < 48 || charCode > 57)) {
    //     return false;
    //   }
    //   return true;
    // }
  }
}
