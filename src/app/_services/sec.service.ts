import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SecService {
  apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  // =================================================================

  saveFile(id: number, fileMain: any): any {
    return this.http.post(this.apiUrl + 'sec/uploadFile/' + id, fileMain);
  }

  // =================================================================

  compareTransfareToCompany(code: number): any {
    return this.http.get(this.apiUrl + 'sec/ComparePayment/' + code);
  }

  // =================================================================

  updatePaymentConfirmAll(code: number, dataToCompare: any): any {
    return this.http.put(this.apiUrl + 'sec/UpdatePaymentTrans/' + code, dataToCompare);
  }

  // =================================================================

  inputPayment(emp: number, dataPayment: any): any {
    return this.http.post(this.apiUrl + 'sec/InputPayment/' + emp, dataPayment);
  }

  // =================================================================

  getSearchByCivilId(civil: number, emp: number): any {
    return this.http.get(this.apiUrl + 'sec/GetOrginzeCustomersByCivilId/' + civil + '/' + emp);
  }

  // ==================================================================

  addToWaitList(data: any, emp: number): any {
    return this.http.post(this.apiUrl + 'sec/addToWaitList/' + emp, data);
  }

  // ==================================================================

  getSearchByName(name: string, emp): any {
    return this.http.get(this.apiUrl + 'sec/GetOrginzeCustomersByName/' + name + '/emp/' + emp);
  }

  // ==================================================================

  getSearchByCode(Code: number, emp: number): any {
    return this.http.get(this.apiUrl + 'sec/GetOrginzeCustomersByCode/' + Code + '/emp/' + emp);
  }

  // ==================================================================

  getSearchByDue(Due: string, emp: number): any {
    return this.http.get(this.apiUrl + 'sec/GetOrginzeCustomersByDue/' + Due + '/emp/' + emp);
  }

  // ==================================================================

  WaitListInformation(emp: number): any {
    return this.http.get(this.apiUrl + 'sec/WaitListInformation/' + emp);
  }

  // ===================================================================

  getVisitorNote(emp: number, code: number): any {
    return this.http.get(this.apiUrl + 'sec/visitorNote/' + emp + '/' + code);
  }

  // ====================================================================

  getAnotherFile(emp: number, civilID: number): any {
    return this.http.get(this.apiUrl + 'sec/getAnotherFile/' + emp + '/' + civilID);
  }

  // ====================================================================

  updateEmp(emp: number, updateEmp: any): any {
    return this.http.put(this.apiUrl + 'sec/updateEmpFile/' + emp, updateEmp);
  }

  // ====================================================================

  updateCases(emp: number, updateEmp: any): any {
    return this.http.put(this.apiUrl + 'sec/updateCasesFile/' + emp, updateEmp);
  }

  // ====================================================================

  updateAutoNumber(emp: number, updateEmp: any): any {
    return this.http.put(this.apiUrl + 'sec/updateAddAutoNumber/' + emp, updateEmp);
  }

  // ====================================================================

  updateNote4(emp: number, updateEmp: any): any {
    return this.http.put(this.apiUrl + 'sec/updateNote4/' + emp, updateEmp);
  }

  // ====================================================================

  updateMohed(emp: number, updateEmp: any): any {
    return this.http.put(this.apiUrl + 'sec/updateMohad/' + emp, updateEmp);
  }

  // ====================================================================

  updateClosedFile(emp: number, updateEmp: any): any {
    return this.http.put(this.apiUrl + 'sec/updateclosedfile/' + emp, updateEmp);
  }

  // ====================================================================

  updateNote5(emp: number, updateEmp: any): any {
    return this.http.put(this.apiUrl + 'sec/updatenote5/' + emp, updateEmp);
  }

  // ====================================================================

  uploadProcess(emp: number, code: number): any {
    return this.http.get(this.apiUrl + 'sec/uploadProcess/' + code + '/' + emp);
  }

  // ====================================================================

  saveProcess(emp: number, data: any): any {
    return this.http.post(this.apiUrl + 'sec/saveUploadProcess/' + emp, data);
  }

  // ====================================================================

  autoNumbertype(emp: number): any {
    return this.http.get(this.apiUrl + 'sec/typeAutoNumber/' + emp);
  }

  // ====================================================================

  autoNumberClimate(emp: number): any {
    return this.http.get(this.apiUrl + 'sec/Climet/' + emp);
  }

  // ====================================================================

  autoNumberCase(emp: number): any {
    return this.http.get(this.apiUrl + 'sec/autoNumberCases/' + emp);
  }

  // ====================================================================

  saveAutoNumber2(emp: number, saveAutoNumber2: any): any {
    return this.http.post(this.apiUrl + 'sec/saveAutoNumber2/' + emp, saveAutoNumber2);
  }
}
