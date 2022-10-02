import { Component, OnInit, TemplateRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/_services/auth.service';
import { SecService } from 'src/app/_services/sec.Service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-orginizeCustomer',
  templateUrl: './orginizeCustomer.component.html',
  styleUrls: ['./orginizeCustomer.component.scss']
})
export class OrginizeCustomerComponent implements OnInit {
  dataFromSearch: any = [];
  modalRef: BsModalRef;
  dataDbClick: any = [];
  id = 0;
  waitList: any = [];
  istemaraNote: any = [];
  visitorNote1: any = [];
  anotherFile: any = [];
  constructor(
    private toastr: ToastrService,
    private sec: SecService,
    private auth: AuthService,
    private modalService: BsModalService,
    private activatRoute: ActivatedRoute
  ) {
    this.activatRoute.params.subscribe(data => {
      this.id = data.id;
    });
  }

  ngOnInit(): any {
    this.waitListInfo();
  }
  getSearchByCivilId(civil: number): any {
    this.sec.getSearchByCivilId(civil, this.auth.decodedToken.unique_name[0]).subscribe((res) => {
      this.dataFromSearch = res;
    }, (error) => {
      this.toastr.error(error);
    });
  }
  openModal(template: TemplateRef<any>): any {
    this.modalRef = this.modalService.show(
      template,
      Object.assign(
        {},
        { class: 'modal-lg modal-dialog modal-dialog-centered' }
      )
    );
  }
  selectRow(row: any): any {
    this.dataDbClick = row;
  }
  addToWaitList(): any {
    const wait: any = {};
    wait.CODE = this.dataDbClick.code;
    this.sec.addToWaitList(wait, this.auth.decodedToken.unique_name[0]).subscribe(() => {
    }, (error) => {
      this.toastr.error(error);
    }, (next) => {
      this.toastr.success('Done !');
    });
  }
  getSearchByName(name: string): any {
    this.sec.getSearchByName(name, this.auth.decodedToken.unique_name[0]).subscribe((res: any) => {
      this.dataFromSearch = res;
    }, (error: any) => {
      this.toastr.error(error);
    });
  }
  getSearchByCode(code: number): any {
    this.sec.getSearchByCode(code, this.auth.decodedToken.unique_name[0]).subscribe((res: any) => {
      this.dataFromSearch = res;
    }, (error: any) => {
      this.toastr.error(error);
    });
  }
  getSearchByDue(Due: string): any {
    this.sec.getSearchByDue(Due, this.auth.decodedToken.unique_name[0]).subscribe((res: any) => {
      this.dataFromSearch = res;
    }, (error: any) => {
      this.toastr.error(error);
    });
  }
  waitListInfo(): any {
    this.sec.WaitListInformation(this.auth.decodedToken.unique_name[0]).subscribe((res: any) => {
      this.waitList = res;
    }, (error: any) => {
      this.toastr.error(error);
    });
  }
  istemara(): void {
    this.id = 3;
  }
  visitorNote(e: any): void {
    this.visitorNote1 = e;
    this.sec.getVisitorNote(this.auth.decodedToken.unique_name[0], this.visitorNote1.code).subscribe((res: any) => {
      this.istemaraNote = res;
    }, (error: any) => {
      this.toastr.error(error);
    }, () => {
      this.sec.getAnotherFile(this.auth.decodedToken.unique_name[0], this.visitorNote1.civilID).subscribe((res: any) => {
        this.anotherFile = res;
      });
    });
  }
}
