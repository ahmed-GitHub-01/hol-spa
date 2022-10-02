import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { SearchElectionsResult } from '../_models/pagination';
import { SearchInElections } from '../_models/SearchByCivilId';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CallCenterService {
  constructor(private http: HttpClient, private auth: AuthService) { }
  baseUrl = environment.apiUrl;
  pdfSrc: any;

  updateNumber(id: number, isvoke: any): any {
    return this.http.put(this.baseUrl + 'user/updatenumber/' + id, { IS_VOKE: isvoke });
  }
  getNumberToSaveOrUpdate(id): any {
    return this.http.get(this.baseUrl + 'user/numberForSaveOrUpdate/' + id);
  }
  saveNewNumber(newNumber: any): any {
    return this.http.post(this.baseUrl + 'user/addNewNumber', newNumber);
  }
  updateNumbers(id: number, numberUpdate: any): any {
    return this.http.put(this.baseUrl + 'user/updateNumbers/' + id, numberUpdate);
  }
  getNextProcess(): any {
    return this.http.get(this.baseUrl + 'user/nextprocess');
  }

  // =================================================================

  searchByName(name?, filter?): any {
    return this.http.get(this.baseUrl + 'user/' + filter + '/' + name);
  }

  // =================================================================

  getStatmentSec(code?): any {
    return this.http.get(this.baseUrl + 'user/statementSec/' + code);
  }

  // =================================================================

  customers(emp?): any {
    return this.http.get(this.baseUrl + 'user/customers/' + emp);
  }

  // =================================================================

  getCaseCustomer(filter: string): any {
    return this.http.get(this.baseUrl + 'user/caseemp/' + filter);
  }

  // =================================================================

  getAutoNumber(code?): any {
    return this.http.get(this.baseUrl + 'user/autoNum/' + code);
  }

  // =================================================================

  getSubAutoNumber(autoNumner): any {
    return this.http.get(this.baseUrl + 'user/subautonum/' + autoNumner);
  }

  // =================================================================

  getResom(code?): any {
    return this.http.get(this.baseUrl + 'user/resom/' + code);
  }

  // =================================================================

  getUploadProces(code): any {
    return this.http.get(this.baseUrl + 'user/uploadProcess/' + code);
  }

  // =================================================================

  getPDF(id: any): any {
    return this.http.get(this.baseUrl + 'user/resompdf/' + id);
  }

  // =================================================================

  updateClassifications(Code: number, classifications: any): any {
    return this.http.put(this.baseUrl + 'user/updatecasecivilid/' + Code, classifications);
  }

  // =================================================================

  updateEmp(code: number, emp: number): any {
    return this.http.put(this.baseUrl + 'user/updateEmp/' + code, { EMPLOYE: 555, ENTRY_EMPLOY: emp });
  }

  // =================================================================

  updateTowsolNumber(code: number, num: number, emp: number): any {
    return this.http.put(this.baseUrl + 'user/updateTowsolNumber/' + code, { TWASEL_NUM: num, EMP_TWASEL_NUM: emp });
  }

  // =================================================================

  updateInstallement(code: number, amount: number, date: Date): any {
    return this.http.put(this.baseUrl + 'user/updateInstallement/' + code, { PRT_AMONT: amount, DATE_PRT_AMONT: date });
  }

  // =================================================================

  updatePromise(code: number): any {
    return this.http.put(this.baseUrl + 'user/updatePromise/' + code, {});
  }

  // =================================================================

  searchInStatment(emp: number, dtp1: string, dtp2: string): any {
    return this.http.get(this.baseUrl + 'user/getstatevent/' + emp + '/' + dtp1 + '/' + dtp2);
  }

  // =================================================================

  searchInMyPay(emp: number, dtp1: string, dtp2: string): any {
    return this.http.get(this.baseUrl + 'user/getMyPay/' + emp + '/' + dtp1 + '/' + dtp2);
  }

  // =================================================================

  searchInReview(emp: number, dtp1: string, dtp2: string): any {
    return this.http.get(this.baseUrl + 'user/getstatReview/' + emp + '/' + dtp1 + '/' + dtp2);
  }

  // =================================================================

  searchInElections(emp: number, searchData: any): Observable<SearchElectionsResult<SearchInElections[]>> {
    const paginatedResult: SearchElectionsResult<SearchInElections[]> = new SearchElectionsResult<SearchInElections[]>();
    let params = new HttpParams();
    if (searchData.name !== undefined) { params = params.append('name', searchData.name); }
    if (searchData.first !== undefined) { params = params.append('first', searchData.first); }
    if (searchData.second !== undefined) { params = params.append('second', searchData.second); }
    if (searchData.third !== undefined) { params = params.append('third', searchData.third); }
    if (searchData.four !== undefined) { params = params.append('four', searchData.four); }
    if (searchData.family !== undefined) { params = params.append('family', searchData.family); }
    if (searchData.civilID !== undefined) { params = params.append('civilID', searchData.civilID); }
    if (searchData._internal !== undefined) { params = params.append('_internal', searchData._internal); }
    if (searchData.phoneNumber !== undefined) { params = params.append('phoneNumber', searchData.phoneNumber); }
    if (searchData.Address !== undefined) { params = params.append('Address', searchData.Address); }
    return this.http.get<SearchInElections[]>(
      this.baseUrl + 'user/GetElectionSearch/' + emp,
      { observe: 'response', params }).pipe(map((response) => {
        paginatedResult.result = response.body;
        return paginatedResult;
      }, (error: any) => {
      })
      );
  }

  // ==================================================================================

  countStatement(id: number, dtp1: any): any {
    return this.http.get(this.baseUrl + 'user/CountStatement/' + id + '/' + dtp1);
  }

  // ==================================================================================

  CountStatementClean(id: number, dtp1: any): any {
    return this.http.get(this.baseUrl + 'user/CountStatementClean/' + id + '/' + dtp1);
  }

  // ==================================================================================

  searchInStatement(id: number, num: any): any {
    return this.http.get(this.baseUrl + 'user/searchInStatement/' + id + '/' + num);
  }

  // ==================================================================================

  sectors(): any {
    return this.http.get(`${this.baseUrl}user/sectors/${this.auth.decodedToken.unique_name[0]}`);
  }

  // ==================================================================================

  companySlecet(sector: number): any {
    return this.http.get(`${this.baseUrl}user/companySectorRep/${this.auth.decodedToken.unique_name[0]}/${sector}`);
  }
}
