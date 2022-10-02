import { Component, OnInit } from '@angular/core';
import * as jsPdf from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-print-taklef',
  templateUrl: './print-taklef.component.html',
  styleUrls: ['./print-taklef.component.scss']
})
export class PrintTaklefComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  download(): void {
    const element = document.getElementById('printsection');
    html2canvas(element).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const doc = new jsPdf.jsPDF();
      const imgHeight = canvas.height * 208 / canvas.width;
      doc.addImage(imgData, 0, 0, 208, imgHeight);
      doc.save('image.pdf');
    });
  }
}
