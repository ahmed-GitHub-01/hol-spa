import { DatePipe } from '@angular/common';
import { Component, Input, OnInit, TemplateRef, ViewEncapsulation } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/_services/auth.service';
import { CallCenterService } from 'src/app/_services/callCenter.service';

@Component({
  selector: 'app-settingbox',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './settingbox.component.html',
  styleUrls: ['./settingbox.component.scss']
})
export class SettingboxComponent implements OnInit {
  constructor(
    private auth: AuthService,
    private tosstr: ToastrService,
    private call: CallCenterService,
    private datePipe: DatePipe,
    private modalService: BsModalService) { }
  @Input() main: any;
  countStatement;
  countStatementClean;
  modalRef: BsModalRef;
  massage = '';

  ngOnInit(): void {
  }

  toggle(): void {
    const s = document.querySelector('.settings-box .fa-cog');
    s.classList.toggle('fa-spin');
    const c = document.querySelector('.settings-box');
    c.classList.toggle('open');
    const dtp = new Date().toLocaleDateString('en-US', { timeZone: 'Asia/Kuwait' });
    const dtp1 = this.datePipe.transform(dtp, 'yyyy-MM-dd');
    this.call.countStatement(this.auth.decodedToken.unique_name[0], dtp1).subscribe((res: any) => {
      this.countStatement = res;
    }, (error) => {
      this.tosstr.error(error);
    });
    this.call.CountStatementClean(this.auth.decodedToken.unique_name[0], dtp1).subscribe((res: any) => {
      this.countStatementClean = res;
    }, (error) => {
      this.tosstr.error(error);
    });
  }

  massages(template: TemplateRef<any>): void {
    this.massage = '';
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'modal-lg modal-dialog modal-dialog-centered' })
    );
  }
  zainMsg(): void {
    this.massage = 'السيد / ة  /  ' + this.main.name + '\n' +
      ' يرجى العلم بانة قد تم تكليفنا من قبل شركة الاتصالات المتنقلة - زين ' +
      ' لتحصيل مديونياتها لدى الغير ، لذا يرجى المبادرة لسداد المبلغ المستحق عليكم من خلال زيارة اقرب فرع او مراجعة مكتبنا او من خلال الرابط ' + '\n' +
      ' وذلك لتفادى اتخاذ الاجراءات القانونية للتحصيل ' + '\n' + ' للمراجعة ' + '\n' + 'بيت القانون للمحاماة' + '\n' +
      this.main.empPhone + '\n' + '1818180';

  }
  attmsg(): void {
    let company: string;
    if (this.main.codClint === 12100001) {
      company = 'برجاء سرعه سداد مديونيه  شركه الاتصالات stc ';
    } else if (this.main.codClint === 12100002) {
      company = 'برجاء سرعه سداد مديونيه  شركه الاتصالات Ooredoo';
    } else if (this.main.codClint === 12100002) {
      company = 'برجاء سرعه سداد مديونيه  شركه الاتصالات Zain';
    } else {
      company = this.main.clint;
    }
    this.massage = company + '\n' +
      ' الاسم /  ' + this.main.name + '\n' +
      ' رقم الخط /  ' + this.main.reson_due + '\n' +
      ' رقم العقد /  ' + this.main.contracT_NUM + '\n' +
      ' الرقم المدنى /  ' + this.main.civiL_ID + '\n' +
      ' المبلغ /  ' + this.main.remain + ' دينار ' + '\n' +
      ' بدون مصاريف قضائيه حتى الان ' + '\n' +
      ' تجنبا للاجراءات القانونية ( منع السفر - الضبط والاحضار - حجز المركبات ) ' + '\n' +
      ' للمراجعة مكتب بيت القانون  ت / 1818180 ' + '\n' +
      this.main.empPhone;
  }
  procMsg(): void {
    let company: string;
    if (this.main.codClint === 12100001) {
      company = 'الســـادة عملاء شركة stc ';
    } else if (this.main.codClint === 12100002) {
      company = 'الســـادة عملاء شركة الاتصالات الوطنية Ooredoo';
    } else if (this.main.codClint === 12100002) {
      company = 'الســـادة عملاء شركة الاتصالات المتنقلة Zain';
    } else {
      company = this.main.clint;
    }
    this.massage = company + '\n' + 'يمكنكم خلال ايام التشييك عبر بوابة العدل ' + '\n' +
      'سيتم استصدار رقم آلي و تفعيل الضبط والاحضار ومنع السفر' + '\n' +
      'لعدم التعاون بالسداد  كما ذكرناكم من قبل بالسداد' + '\n' +
      'مكتب بيت القانون محامي الشركة' + '\n' +
      'وسيتم ارسل صورة من إصدار الحكم' + '\n' +
      'إلي المنزل' + '\n' +
      'مع إرسال أمر تكليف إلي جهة العمل' + '\n' +
      'التي تعمل بها' + '\n' +
      'نظرا إلي عدم سداد مديونية شركة للشركة' + '\n' +
      ' للمراجعة مكتب بيت القانون  ت / 1818180 ' + '\n' +
      this.main.empPhone;
  }
  notNameCustomer(): void {
    let company: string;
    if (this.main.codClint === 12100001) {
      company = 'الســـادة عملاء شركة stc ';
    } else if (this.main.codClint === 12100002) {
      company = 'الســـادة عملاء شركة الاتصالات الوطنية Ooredoo';
    } else if (this.main.codClint === 12100002) {
      company = 'الســـادة عملاء شركة الاتصالات المتنقلة Zain';
    } else {
      company = this.main.clint;
    }
    this.massage = 'إخطار هـــــام ⚖' + '\n' +
      company + '\n' +
      ' بخصوص //  ' + this.main.name + '\n' +
      'نحيطكم  علماً  أنه  تم إنتهاء  العطــــلة  القضائية  وانه سوف يتم  استئناف الاجــراءات  القضائية لصالح  الشركة ..' + '\n' +
      'وعليه   فإننا  نمنحكم فرصة اخيرة  لسداد المبلغ  المستحق عليكم باقرب فرع للشركه.' + '\n' +
      'تجنباً  لمباشرة الاجراءات القانونيةـ' + '\n' +
      '( منع سفر- حجز مركبة ـ  ضبط واحضار - حجز بنوك )' + '\n' +
      'للاستفسار' + '\n' +
      'يرجي الاتصال بالوكيل القانوني مكتب  بيت القانون  للمحاماة ' + '\n' +
      'المحامي عبد العزيز البنوان  ت / 1818180 ' + '\n' +
      this.main.empPhone;
  }
  notAr(): void {
    let company: string;
    if (this.main.codClint === 12100001) {
      company = 'الســـادة عملاء شركة stc ';
    } else if (this.main.codClint === 12100002) {
      company = 'الســـادة عملاء شركة الاتصالات الوطنية Ooredoo';
    } else if (this.main.codClint === 12100002) {
      company = 'الســـادة عملاء شركة الاتصالات المتنقلة Zain';
    } else {
      company = this.main.clint;
    }
    this.massage = 'إخطار هـــــام ⚖' + '\n' +
      company + '\n' +
      ' بخصوص //  ' + this.main.name + '\n' +
      'نحيطكم  علماً  أنه  تم إنتهاء  العطــــلة  القضائية  وانه سوف يتم  استئناف الاجــراءات  القضائية لصالح  الشركة ..' + '\n' +
      'وعليه   فإننا  نمنحكم فرصة اخيرة  لسداد المبلغ  المستحق عليكم باقرب فرع للشركه.' + '\n' +
      'تجنباً  لمباشرة الاجراءات القانونيةـ' + '\n' +
      '( منع سفر- حجز مركبة ـ  ضبط واحضار - حجز بنوك )' + '\n' +
      'للاستفسار' + '\n' +
      'يرجي الاتصال بالوكيل القانوني مكتب  بيت القانون  للمحاماة ' + '\n' +
      'المحامي عبد العزيز البنوان  ت / 1818180 ' + '\n' +
      this.main.empPhone;
  }
  notEn(): void {
    let company: string;
    if (this.main.codClint === 12100001) {
      company = 'الســـادة عملاء شركة stc ';
    } else if (this.main.codClint === 12100002) {
      company = 'الســـادة عملاء شركة الاتصالات الوطنية Ooredoo';
    } else if (this.main.codClint === 12100002) {
      company = 'الســـادة عملاء شركة الاتصالات المتنقلة Zain';
    } else {
      company = this.main.clint;
    }
    this.massage = company + '\n' +
      'We inform you that the judicial holiday has been completed and that the judicial proceedings will be resumed in favor of the company.' + '\n' +
      'Accordingly, we give you a final opportunity to pay the amount  last date for payment.' + '\n' +
      'In order to avoid legal proceedings' + '\n' +
      '(Travel ban - seizure of vehicle seizure and import - bank booking)' + '\n' +
      'For inquiries' + '\n' +
      'Please contact your legal counsel' + '\n' +
      'Lawyers and the court of law phone Num ( 1818180 )' + '\n' +
      this.main.empPhone;
  }
  remindMsg(): void {
    let company: string;
    if (this.main.codClint === 12100001) {
      company = 'الســـادة عملاء شركة stc ';
    } else if (this.main.codClint === 12100002) {
      company = 'الســـادة عملاء شركة الاتصالات الوطنية Ooredoo';
    } else if (this.main.codClint === 12100002) {
      company = 'الســـادة عملاء شركة الاتصالات المتنقلة Zain';
    } else {
      company = this.main.clint;
    }
    this.massage = 'تذكير هام جدا عملينا العزيز' + '\n' +
      company + '\n' +
      'و سداد مبلغ المديونيه / لتلافي الاجراءات القانونيه ' + '\n' +
      '(منع من السفر- حجز راتب - ضبط واحضار - حجز السيارة';
  }
  Taklef(template: TemplateRef<any>): any {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'modal-lg modal-dialog modal-dialog-centered' })
    );
  }
}
