import { Component, OnInit, ViewChild } from '@angular/core';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { ToastrService } from 'ngx-toastr';
import { ImplementService } from 'src/app/_services/implement.service';

@Component({
  selector: 'app-implement',
  templateUrl: './implement.component.html',
  styleUrls: ['./implement.component.scss']
})
export class ImplementComponent implements OnInit {
  main = [];
  mainData: any = [];
  statment: any = [];
  searchResult: any = [];
  constructor(
    private imp: ImplementService,
    private toastr: ToastrService,
  ) { }
  @ViewChild('staticTabs', { static: false }) staticTabs?: TabsetComponent;
  ngOnInit(): void {
    this.allFiles();
  }

  allFiles(): void {
    this.imp.allFiles().subscribe((res: any) => {
      this.main = res;
    }, (error) => {
      this.toastr.error(error);
    });
  }

  searchCode(code: number): void {
    this.imp.searchCode(code).subscribe((res: any) => {
      this.mainData = res;
    }, (error) => {
      this.toastr.error(error);
    });
  }

  goToPdf(id, evt): void {
    this.imp.getPDF(id, evt).subscribe((response => {
      if (response.openPdf === null) {
        this.toastr.error('لا يوجد مرفق !');
        return;
      }
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
      link.download = this.mainData.civilID + '.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }));
    // localStorage.setItem('id', id);
    // window.open('/showPdf', '_blank');
  }

  searchInImplemntByName(name: string): void {
    this.imp.searchInImplemntByName(name).subscribe((res) => {
      this.staticTabs.tabs[3].active = true;
      this.searchResult = res;
    }, (error) => {
      this.toastr.error(error);
    });
  }

  searchInMdlByCivilId(event: any): any {
    this.imp.searchInMdlByCivilId(event).subscribe((res) => {
      this.staticTabs.tabs[3].active = true;
      this.searchResult = res;
    }, (error) => {
      this.toastr.error(error);
    });
  }

  onlyNumberAllowed(event): any {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  searchInMdlByAutoNum(autoNum): void {

  }

  searchInMdlByContract(contract): void {

  }

  searchInMdlByReasonDue(reasonDue): void {

  }
}
