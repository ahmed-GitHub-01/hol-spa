import { DatePipe } from '@angular/common';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/_services/auth.service';
import { ClintService } from 'src/app/_services/clint.service';
import { DxDataGridComponent } from 'devextreme-angular';
import { exportDataGrid as exportDataGridToPdf } from 'devextreme/pdf_exporter';
import { jsPDF } from 'jspdf';
// import 'jspdf-autotable';
import { LoadingService } from 'src/app/_services/loading.service';

@Component({
  selector: 'app-comminactionreport',
  templateUrl: './comminactionreport.component.html',
  styleUrls: ['./comminactionreport.component.scss']
})
export class ComminactionreportComponent implements OnInit {
  @ViewChild(DxDataGridComponent, { static: false }) dataGrid: DxDataGridComponent;
  dataSearch: any = [];
  modalRef: BsModalRef;
  payment: any = [];
  paymentBtween: any = [];
  show = 0;
  dtp1;
  dtp2;
  dtp1Statment;
  dtp2Statment;
  dataStatment: any = [];
  statement: any = [];
  loading$ = this.loader.loading$;
  constructor(
    private client: ClintService,
    private auth: AuthService,
    private toastr: ToastrService,
    private modalService: BsModalService,
    private datepipe: DatePipe,
    public loader: LoadingService) { }

  ngOnInit(): void {
  }

  showContainer(evt: number): void {
    this.show = evt;
  }

  onlyNumberAllowed(event): any {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  search(evt, fil): void {
    const split = this.auth.decodedToken.unique_name[0].split('-');
    this.loader.show();
    if (split[1] === undefined) {
      if (fil === 'civilId') {
        this.client.searchByCivilIDInMain(this.auth.decodedToken.unique_name[0], evt).subscribe((res) => {
          this.dataSearch = res;
          this.loader.hide();
        }, (error) => {
          this.toastr.error(error);
          this.loader.hide();
        });
      } else if (fil === 'name') {
        this.client.searchByNameInMain(this.auth.decodedToken.unique_name[0], evt).subscribe((res) => {
          this.dataSearch = res;
          this.loader.hide();
        }, (error) => {
          this.toastr.error(error);
          this.loader.hide();
        });
      } else if (fil === 'cont') {
        this.client.searchContractInMain(this.auth.decodedToken.unique_name[0], evt).subscribe((res) => {
          this.dataSearch = res;
          this.loader.hide();
        }, (error) => {
          this.toastr.error(error);
          this.loader.hide();
        });
      }
    } else {
      if (fil === 'civilId') {
        this.client.searchByCivilIDInMain1(split[0], evt, this.auth.decodedToken.unique_name[3]).subscribe((res) => {
          this.dataSearch = res;
          this.loader.hide();
        }, (error) => {
          this.toastr.error(error);
          this.loader.hide();
        });
      } else if (fil === 'name') {
        this.client.searchByNameInMain1(split[0], evt, this.auth.decodedToken.unique_name[3]).subscribe((res) => {
          this.dataSearch = res;
          this.loader.hide();
        }, (error) => {
          this.toastr.error(error);
          this.loader.hide();
        });
      } else if (fil === 'cont') {
        this.client.searchContractInMain1(split[0], evt, this.auth.decodedToken.unique_name[3]).subscribe((res) => {
          this.dataSearch = res;
          this.loader.hide();
        }, (error) => {
          this.toastr.error(error);
          this.loader.hide();
        });
      }
    }
  }

  showPayment(evt, template: TemplateRef<any>): any {
    const split = this.auth.decodedToken.unique_name[0].split('-');
    if (split[1] === undefined) {
      this.client.showPayment(this.auth.decodedToken.unique_name[0], evt.row.data.code).subscribe((res) => {
        this.payment = res;
      }, (error) => {
        this.toastr.error(error);
      }, (next) => {
        this.modalRef = this.modalService.show(template,
          Object.assign({}, { class: 'modal-ml modal-dialog modal-dialog-centered' }));
      });
    } else {
      this.client.showPayment(split[0], evt.row.data.code).subscribe((res) => {
        this.payment = res;
      }, (error) => {
        this.toastr.error(error);
      }, (next) => {
        this.modalRef = this.modalService.show(template,
          Object.assign({}, { class: 'modal-ml modal-dialog modal-dialog-centered' }));
      });
    }
  }

  showStatment(evt, template: TemplateRef<any>): any {
    const split = this.auth.decodedToken.unique_name[0].split('-');
    if (split[1] === undefined) {
      this.client.showStatment(this.auth.decodedToken.unique_name[0], evt.row.data.code).subscribe((res) => {
        this.statement = res;
      }, (error) => {
        this.toastr.error(error);
      }, (next) => {
        this.modalRef = this.modalService.show(template,
          Object.assign({}, { class: 'modal-ml modal-dialog modal-dialog-centered' }));
      });
    } else {
      this.client.showStatment(split[0], evt.row.data.code).subscribe((res) => {
        this.statement = res;
      }, (error) => {
        this.toastr.error(error);
      }, (next) => {
        this.modalRef = this.modalService.show(template,
          Object.assign({}, { class: 'modal-ml modal-dialog modal-dialog-centered' }));
      });
    }
  }

  paymentDate(): void {
    const split = this.auth.decodedToken.unique_name[0].split('-');
    this.loader.show();
    const date1 = this.datepipe.transform(this.dtp1, 'yyyy-MM-dd');
    const date2 = this.datepipe.transform(this.dtp2, 'yyyy-MM-dd');
    if (split[1] === undefined) {
      this.client.paymentDate(this.auth.decodedToken.unique_name[0], date1, date2).subscribe((res) => {
        this.paymentBtween = res;
        this.loader.hide();
      }, (error) => {
        this.toastr.error(error);
        this.loader.hide();
      });
    } else {
      this.client.paymentDate1(split[0], date1, date2, this.auth.decodedToken.unique_name[3]).subscribe((res) => {
        this.paymentBtween = res;
        this.loader.hide();
      }, (error) => {
        this.toastr.error(error);
        this.loader.hide();
      });
    }
  }

  statment(): any {
    const split = this.auth.decodedToken.unique_name[0].split('-');
    this.loader.show();
    const date1 = this.datepipe.transform(this.dtp1Statment, 'yyyy-MM-dd');
    const date2 = this.datepipe.transform(this.dtp2Statment, 'yyyy-MM-dd');
    if (split[1] === undefined) {
      this.client.searchStatment(this.auth.decodedToken.unique_name[0], date1, date2).subscribe((res) => {
        this.dataStatment = res;
        this.loader.hide();
      }, (error) => {
        this.toastr.error(error);
        this.loader.hide();
      });
    } else {
      this.client.searchStatment1(split[0], date1, date2, this.auth.decodedToken.unique_name[3]).subscribe((res) => {
        this.dataStatment = res;
        this.loader.hide();
      }, (error) => {
        this.toastr.error(error);
        this.loader.hide();
      });
    }
  }

  exportGrid(): any {
    const doc = new jsPDF();
    exportDataGridToPdf({
      jsPDFDocument: doc,
      component: this.dataGrid.instance,
    }).then(() => {
      doc.save('Customers.pdf');
    });
  }
}
