import { HttpClient } from '@angular/common/http';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/_services/auth.service';
import { CallCenterService } from 'src/app/_services/callCenter.service';
import { ClintService } from 'src/app/_services/clint.service';
import { LoadingService } from 'src/app/_services/loading.service';

@Component({
  selector: 'app-implemnttionreport',
  templateUrl: './implemnttionreport.component.html',
  styleUrls: ['./implemnttionreport.component.scss']
})
export class ImplemnttionreportComponent implements OnInit {
  modalRef: BsModalRef;
  loading$ = this.loader.loading$;
  dataSearch: any = [];
  resomList: any = [];
  statment: any = [];
  constructor(
    public loader: LoadingService,
    private modalService: BsModalService,
    private auth: AuthService,
    private client: ClintService,
    private toastr: ToastrService,
    private title: Title,
    private call: CallCenterService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.title.setTitle('تقرير التنفيذ');
  }

  onlyNumberAllowed(event): any {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  search(searcher: any, filter: number): any {
    const split = this.auth.decodedToken.unique_name[0].split('-');
    if (split[1] === undefined) {
      if (filter === 3) {
        this.client.SearchByAutoNumImp(this.auth.decodedToken.unique_name[0], searcher).subscribe((res) => {
          this.dataSearch = res;
        }, (error) => {
          this.toastr.error(error);
        });
      } else if (filter === 1) {
        this.client.searchByCivilIDInMain(this.auth.decodedToken.unique_name[0], searcher).subscribe((res) => {
          this.dataSearch = res;
        }, (error) => {
          this.toastr.error(error);
        });
      } else if (filter === 2) {
        this.client.searchByNameInMain(this.auth.decodedToken.unique_name[0], searcher).subscribe((res) => {
          this.dataSearch = res;
        }, (error) => {
          this.toastr.error(error);
        });
      }
    } else {
      if (filter === 3) {
        this.client.SearchByAutoNumImp1(split[0], searcher, this.auth.decodedToken.unique_name[3]).subscribe((res) => {
          this.dataSearch = res;
        }, (error) => {
          this.toastr.error(error);
        });
      } else if (filter === 1) {
        this.client.searchByCivilIDInMain1(split[0], searcher, this.auth.decodedToken.unique_name[3]).subscribe((res) => {
          this.dataSearch = res;
        }, (error) => {
          this.toastr.error(error);
        });
      } else if (filter === 2) {
        this.client.searchByNameInMain1(split[0], searcher, this.auth.decodedToken.unique_name[3]).subscribe((res) => {
          this.dataSearch = res;
        }, (error) => {
          this.toastr.error(error);
        });
      }
    }
  }

  showResom(evt, template: TemplateRef<any>): any {
    const split = this.auth.decodedToken.unique_name[0].split('-');
    if (split[1] === undefined) {
      this.client.resomList(this.auth.decodedToken.unique_name[0], evt.row.data.code).subscribe((res) => {
        this.resomList = res;
      }, (error) => {
        this.toastr.error(error);
      }, (next) => {
        this.modalRef = this.modalService.show(template,
          Object.assign({}, { class: 'modal-ml modal-dialog modal-dialog-centered' }));
      });
    } else {
      this.client.resomList(split[0], evt.row.data.code).subscribe((res) => {
        this.resomList = res;
      }, (error) => {
        this.toastr.error(error);
      }, (next) => {
        this.modalRef = this.modalService.show(template,
          Object.assign({}, { class: 'modal-ml modal-dialog modal-dialog-centered' }));
      });
    }
  }

  goToPdf(id: string, civilid: number): void {
    this.call.getPDF(id).subscribe((response => {
      const byteCharacters = atob(response.openPdf);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: 'pdf/pdf' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.setAttribute('visibility', 'hidden');
      link.download = civilid + '.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }));
  }

  showStatment(evt: any, template: TemplateRef<any>): any {
    const split = this.auth.decodedToken.unique_name[0].split('-');
    if (split[1] === undefined) {
      this.client.showStatmentImp(this.auth.decodedToken.unique_name[0], evt.row.data.code).subscribe((res) => {
        this.statment = res;
      }, (error) => {
        this.toastr.error(error);
      }, (next) => {
        this.modalRef = this.modalService.show(template,
          Object.assign({}, { class: 'modal-ml modal-dialog modal-dialog-centered' }));
      });
    } else {
      this.client.showStatmentImp(split[0], evt.row.data.code).subscribe((res) => {
        this.statment = res;
      }, (error) => {
        this.toastr.error(error);
      }, (next) => {
        this.modalRef = this.modalService.show(template,
          Object.assign({}, { class: 'modal-ml modal-dialog modal-dialog-centered' }));
      });
    }
  }
}
