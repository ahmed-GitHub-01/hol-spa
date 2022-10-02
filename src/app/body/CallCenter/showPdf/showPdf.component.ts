import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CallCenterService } from 'src/app/_services/callCenter.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-showPdf',
  templateUrl: './showPdf.component.html',
  styleUrls: ['./showPdf.component.scss']
})
export class ShowPdfComponent implements OnInit {

  constructor(private call: CallCenterService, private toastr: ToastrService) { }
  pageNumber = 1;
  blobUrl = 'http://localhost:5000/user/resompdf/811';
  ngOnInit(): void {
    this.OnPreview(localStorage.getItem('id'));
  }
  changePageNext(): any {
    this.pageNumber = this.pageNumber + 1;
    this.OnPreview(localStorage.getItem('id'));
  }
  changePagePrevious(): any {
    this.pageNumber = this.pageNumber - 1;
    this.OnPreview(localStorage.getItem('id'));
  }
  downloadFilePdf(): any {
    this.downloadFile(localStorage.getItem('id'));
  }
  OnPreview(id: string): any {
    this.call.getPDF(811).subscribe((response => {
      const pdfData = atob(response.openPdf);
      const pdfjsLib = window['pdfjs-dist/build/pdf'];
      pdfjsLib.GlobalWorkerOptions.workerSrc = '//mozilla.github.io/pdf.js/build/pdf.worker.js';
      const loadingTask = pdfjsLib.getDocument({ data: pdfData });
      loadingTask.promise.then((pdf) => {
        pdf.getPage(this.pageNumber).then((page) => {
          const scale = 1.5;
          const viewport = page.getViewport({ scale });
          const canvas: any = document.getElementById('the-canvas');
          const context = canvas.getContext('2d');
          canvas.height = viewport.height;
          canvas.width = viewport.width;
          const renderContext = {
            canvasContext: context,
            viewport
          };
          const renderTask = page.render(renderContext);
          renderTask.promise.then(() => {
          });
        });
      }, (error) => {
        this.toastr.error('Last page !');
      });
    }));
  }
  downloadFile(id: any): any {
    this.call.getPDF(id).subscribe((response => {
      const byteCharacters = atob(response.openPdf);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: 'pdf/pdf' });
      if (navigator) {
        // navigator.msSaveBlob
        const filename = 'pdf.pdf';
        // navigator.msSaveBlob(blob, filename);
      } else {
        const link = document.createElement('a');

        link.href = URL.createObjectURL(blob);

        link.setAttribute('visibility', 'hidden');
        link.download = 'pdf.pdf';

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }));
  }

  OnPreview2(id: any): any {
    this.call.getPDF(id).subscribe(res => {
      const file = new Blob([res], { type: 'application/pdf' });
      const fileURL = URL.createObjectURL(file);
    });
  }
}
