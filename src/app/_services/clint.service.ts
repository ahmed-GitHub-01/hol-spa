import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClintService {
  urlApi = environment.apiUrl;
  constructor(private http: HttpClient) { }

  // ==================================================================================

  uploadfile(client: number, sendFile: any): any {
    return this.http.post(this.urlApi + 'Client/SendCarFile/' + client, sendFile);
  }

  // ==================================================================================

  uploadPdf(id: number, idFile: number, pdfToSave: any): any {
    return this.http.post(this.urlApi + 'Client/SendCarPdf/' + id + '/' + idFile, pdfToSave);
  }

  // ==================================================================================

  searchByCivilID(client: number, civilID: number): any {
    return this.http.get(this.urlApi + 'Client/searchbycivilid/' + client + '/' + civilID);
  }

  // ==================================================================================

  searchByName(clint: number, evt: string): any {
    return this.http.get(this.urlApi + 'Client/GetCustomerByName/' + clint + '/' + evt);
  }

  // ==================================================================================

  showAllSend(id: number): any {
    return this.http.get(this.urlApi + 'Client/GetAllSendToHOL/' + id);
  }

  // ==================================================================================

  refusedFlie(id: number): any {
    return this.http.get(this.urlApi + 'Client/GetRefusedFile/' + id);
  }

  // ==================================================================================

  deleteFile(client: number, id: number): any {
    return this.http.delete(this.urlApi + 'Client/deleteFile/' + client + '/' + id);
  }

  // ==================================================================================

  showPdf(client: number, id: number): any {
    return this.http.get(this.urlApi + 'Client/showPdf/' + client + '/' + id);
  }

  // ==================================================================================

  openPDF(client: number, id: number): any {
    return this.http.get(this.urlApi + 'Client/openPdf/' + client + '/' + id);
  }

  // ==================================================================================

  deletePdf(client, id): any {
    return this.http.delete(this.urlApi + 'Client/deletePdf/' + client + '/' + id);
  }

  // ==================================================================================

  searchByCivilIDInMain(id, fil): any {
    return this.http.get(this.urlApi + 'Client/SearchCivilIdInMain/' + id + '/' + fil);
  }

  // ==================================================================================

  searchByCivilIDInMain1(id, fil, filter: string): any {
    return this.http.get(this.urlApi + 'Client/SearchCivilIdInMain1/' + id + '/' + fil + '/' + filter);
  }

  // ==================================================================================

  searchByNameInMain(id, fil): any {
    return this.http.get(this.urlApi + 'Client/SearchNameInMain/' + id + '/' + fil);
  }

  // ==================================================================================

  searchByNameInMain1(id, fil, filter: string): any {
    return this.http.get(this.urlApi + 'Client/SearchNameInMain1/' + id + '/' + fil + '/' + filter);
  }

  // ==================================================================================

  searchContractInMain(id, fil): any {
    return this.http.get(this.urlApi + 'Client/SearchContractInMain/' + id + '/' + fil);
  }

  // ==================================================================================

  searchContractInMain1(id, fil, filter): any {
    return this.http.get(this.urlApi + 'Client/SearchContractInMain1/' + id + '/' + fil + '/' + filter);
  }

  // ==================================================================================

  showPayment(id: number, code: number): any {
    return this.http.get(`${this.urlApi}Client/showPayment/${id}/${code}`);
  }

  // ==================================================================================

  paymentDate(id: number, dtp1, dtp2): any {
    return this.http.get(`${this.urlApi}Client/paymentDate/${id}/${dtp1}/${dtp2}`);
  }

  // ==================================================================================

  paymentDate1(id: number, dtp1, dtp2, fill: string): any {
    return this.http.get(`${this.urlApi}Client/paymentDate1/${id}/${dtp1}/${dtp2}/${fill}`);
  }

  // ==================================================================================

  searchByDatee(id, dtp1, dtp2): any {
    return this.http.get(`${this.urlApi}Client/searchByDate/${id}/${dtp1}/${dtp2}`);
  }

  // ==================================================================================

  getFileByID(client: number, id: number): any {
    return this.http.get(`${this.urlApi}Client/getFileByID/${client}/${id}`);
  }

  // ==================================================================================

  repairs_Pdf(client: number, id: number): any {
    return this.http.get(`${this.urlApi}Client/repairsPdf/${client}/${id}`);
  }

  // ==================================================================================

  updateFile(client: number, id: number, sendForm: any): any {
    return this.http.put(`${this.urlApi}Client/updateFile/${client}/${id}`, sendForm);
  }

  // ==================================================================================

  searchStatment(id: number, dtp1, dtp2): any {
    return this.http.get(`${this.urlApi}Client/Statment/${id}/${dtp1}/${dtp2}`);
  }

  // ==================================================================================

  searchStatment1(id: number, dtp1, dtp2, fil: string): any {
    return this.http.get(`${this.urlApi}Client/Statment1/${id}/${dtp1}/${dtp2}/${fil}`);
  }

  // ==================================================================================

  showStatment(id: number, code: number): any {
    return this.http.get(`${this.urlApi}Client/showStatment/${id}/${code}`);
  }

  // ==================================================================================

  SearchByAutoNumImp(id: number, searcher: any): any {
    return this.http.get(`${this.urlApi}Client/SearchByAutoNumImp/${id}/${searcher}`);
  }

  // ==================================================================================

  SearchByAutoNumImp1(id: number, searcher: any, fil: string): any {
    return this.http.get(`${this.urlApi}Client/SearchByAutoNumImp1/${id}/${searcher}/${fil}`);
  }

  // ==================================================================================

  resomList(id: number, code: number): any {
    return this.http.get(`${this.urlApi}Client/resomList/${id}/${code}`);
  }

  // ==================================================================================

  showStatmentImp(id: number, code: number): any {
    return this.http.get(`${this.urlApi}Client/showStatmentImp/${id}/${code}`);
  }

  // ==================================================================================

  paymentInOffice(id: number): any {
    return this.http.get(`${this.urlApi}Client/paymentInOffice/${id}`);
  }

  // ==================================================================================

  searchAllinMDl(id: number): any {
    return this.http.get(`${this.urlApi}Client/searchAllinMDl/${id}`);
  }

  // ==================================================================================

  searchAllinMDl2(Id: number, Filter: string): any {
    return this.http.get(`${this.urlApi}Client/searchAllinMDl2/${Id}/${Filter}`);
  }

  // ==================================================================================

  showCourtGlsa(id: number, serial: number, glsat: string): any {
    return this.http.get(`${this.urlApi}Client/showCourtGlsa/${id}/${serial}/${glsat}`);
  }

  // ==================================================================================

  searchInMdlByAutoNum(Id: number, autoNum: number): any {
    return this.http.get(`${this.urlApi}Client/searchInMdlByAutoNum/${Id}/${autoNum}`);
  }

  // ==================================================================================

  searchInMdlByAutoNum1(Id: number, autoNum: number, fil: string): any {
    return this.http.get(`${this.urlApi}Client/searchInMdlByAutoNum1/${Id}/${autoNum}/${fil}`);
  }

  // ==================================================================================

  searchInMdlByCivlId(Id: number, civilId: number): any {
    return this.http.get(`${this.urlApi}Client/searchInMdlByCivilId/${Id}/${civilId}`);
  }

  // ==================================================================================

  searchInMdlByCivlId1(Id: number, civilId: number, fil: string): any {
    return this.http.get(`${this.urlApi}Client/searchInMdlByCivilId1/${Id}/${civilId}/${fil}`);
  }

  // ==================================================================================

  searchInMdlByName(Id: number, name: string): any {
    console.log(`${this.urlApi}Client/searchInMdlByName/${Id}/${name}`);
    return this.http.get(`${this.urlApi}Client/searchInMdlByName/${Id}/${name}`);
  }

  // ==================================================================================

  searchInMdlByName1(Id: number, name: string, fill: string): any {
    console.log(`${this.urlApi}Client/searchInMdlByName1/${Id}/${name}/${fill}`);
    return this.http.get(`${this.urlApi}Client/searchInMdlByName1/${Id}/${name}/${fill}`);
  }
}
