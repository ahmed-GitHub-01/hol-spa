import { Component, OnInit, TemplateRef } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/_services/auth.service';
import { ClintService } from 'src/app/_services/clint.service';

@Component({
  selector: 'app-mdlreport',
  templateUrl: './mdlreport.component.html',
  styleUrls: ['./mdlreport.component.scss']
})
export class MdlreportComponent implements OnInit {
  allSearch: any = [];
  modalRef: BsModalRef;
  courtGlsa: any = [];
  courtExpert: any = [];
  dataPrint: any = {};
  constructor(
    private auth: AuthService,
    private client: ClintService,
    private toastr: ToastrService,
    private modalService: BsModalService,
    private title: Title
  ) { }

  ngOnInit(): void {
    this.title.setTitle('تقرير المتداول');
  }

  onlyNumberAllowed(event): any {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  searchAllinMDl(): void {
    const split = this.auth.decodedToken.unique_name[0].split('-');
    if (split[1] === undefined) {
      this.client.searchAllinMDl(this.auth.decodedToken.unique_name[0]).subscribe((res: any) => {
        this.allSearch = res;
      }, (error) => {
        this.toastr.error(error);
      });
    } else {
      this.client.searchAllinMDl2(split[0], this.auth.decodedToken.unique_name[3]).subscribe((res: any) => {
        this.allSearch = res;
      }, (error) => {
        this.toastr.error(error);
      });
    }
  }

  showCourtGlsa(evt, template: TemplateRef<any>, glsat: string): any {
    this.dataPrint.name = evt.row.data.name;
    this.dataPrint.autoNum = evt.row.data.autoNum;
    this.dataPrint.civilid = evt.row.data.civilid;
    this.dataPrint.firstDigree = evt.row.data.firstDigree;
    this.dataPrint.numFirstDegree = evt.row.data.numFirstDegree;
    this.dataPrint.resum = evt.row.data.resum;
    this.dataPrint.numResum = evt.row.data.numResum;
    this.dataPrint.decr = evt.row.data.decr;
    this.dataPrint.numDecr = evt.row.data.numDecr;
    const split = this.auth.decodedToken.unique_name[0].split('-');
    if (split[1] === undefined) {
      this.client.showCourtGlsa(this.auth.decodedToken.unique_name[0], evt.row.data.serial, glsat).subscribe((res: any) => {
        this.courtGlsa = res;
      }, (error) => {
        this.toastr.error(error);
        console.log(error);
      }, (next) => {
        this.modalRef = this.modalService.show(template,
          Object.assign({}, { class: 'modal-ml modal-dialog modal-dialog-centered' }));
      });
    } else {
      this.client.showCourtGlsa(split[0], evt.row.data.serial, glsat).subscribe((res: any) => {
        this.courtGlsa = res;
      }, (error) => {
        this.toastr.error(error);
        console.log(error);
      }, (next) => {
        this.modalRef = this.modalService.show(template,
          Object.assign({}, { class: 'modal-ml modal-dialog modal-dialog-centered' }));
      });
    }
  }

  searchInMdlByAutoNum(autoNum: number): any {
    const split = this.auth.decodedToken.unique_name[0].split('-');
    if (split[1] === undefined) {
      this.client.searchInMdlByAutoNum(this.auth.decodedToken.unique_name[0], autoNum).subscribe((res: any) => {
        this.allSearch = res;
      }, (error) => {
        this.toastr.error(error);
        console.log(error);
      }, (next) => {
      });
    } else {
      this.client.searchInMdlByAutoNum1(split[0], autoNum, this.auth.decodedToken.unique_name[3]).subscribe((res: any) => {
        this.allSearch = res;
      }, (error) => {
        this.toastr.error(error);
        console.log(error);
      }, (next) => {
      });
    }
  }

  searchInMdlByCivilId(civilId: number): any {
    const split = this.auth.decodedToken.unique_name[0].split('-');
    if (split[1] === undefined) {
      this.client.searchInMdlByCivlId(this.auth.decodedToken.unique_name[0], civilId).subscribe((res: any) => {
        this.allSearch = res;
      }, (error) => {
        this.toastr.error(error);
        console.log(error);
      }, (next) => {
      });
    } else {
      this.client.searchInMdlByCivlId1(split[0], civilId, this.auth.decodedToken.unique_name[3]).subscribe((res: any) => {
        this.allSearch = res;
      }, (error) => {
        this.toastr.error(error);
        console.log(error);
      }, (next) => {
      });
    }
  }
  searchInMdlByName(name: string): any {
    const split = this.auth.decodedToken.unique_name[0].split('-');
    if (split[1] === undefined) {
      this.client.searchInMdlByName(this.auth.decodedToken.unique_name[0], name).subscribe((res: any) => {
        this.allSearch = res;
      }, (error) => {
        this.toastr.error(error);
        console.log(error);
      }, (next) => {
      });
    } else {
      this.client.searchInMdlByName1(split[0], name, this.auth.decodedToken.unique_name[3]).subscribe((res: any) => {
        this.allSearch = res;
      }, (error) => {
        this.toastr.error(error);
        console.log(error);
      }, (next) => {
      });
    }
  }
}
