import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private http: HttpClient, private auth: AuthService) { }
  baseUrl = environment.apiUrl;

  paymentReport(sector, company, branch, dtp1, dtp2): any {
    let params = new HttpParams();
    params = params.append('dtp1', dtp1);
    params = params.append('dtp2', dtp2);
    if (sector !== undefined) { params = params.append('sector', sector); }
    if (company !== undefined) { params = params.append('company', company); }
    if (branch !== undefined) { params = params.append('branch', branch); }
    return this.http.get(`${this.baseUrl}Report/payment/${this.auth.decodedToken.unique_name[0]}`,
      { observe: 'response', params }).pipe(map((res) => {
        return res.body;
      }));
  }

  // ===================================================================================

  statmentReport(sector, company, branch, dtp1, dtp2): any {
    let params = new HttpParams();
    params = params.append('dtp1', dtp1);
    params = params.append('dtp2', dtp2);
    if (sector !== undefined) { params = params.append('sector', sector); }
    if (company !== undefined) { params = params.append('company', company); }
    if (branch !== undefined) { params = params.append('branch', branch); }
    return this.http.get(`${this.baseUrl}Report/Statment/${this.auth.decodedToken.unique_name[0]}`,
      { observe: 'response', params }).pipe(map((res) => {
        return res.body;
      }));
  }

  // ===================================================================================

  filesReport(sector, company, branch): any {
    let params = new HttpParams();
    if (sector !== undefined) { params = params.append('sector', sector); }
    if (company !== undefined) { params = params.append('company', company); }
    if (branch !== undefined) { params = params.append('branch', branch); }
    return this.http.get(`${this.baseUrl}Report/filesReport/${this.auth.decodedToken.unique_name[0]}`,
      { observe: 'response', params }).pipe(map((res) => {
        return res.body;
      }));
  }

  // ===================================================================================

  statmentReportReview(sector, company, branch, dtp1, dtp2): any {
    let params = new HttpParams();
    params = params.append('dtpReview1', dtp1);
    params = params.append('dtpReview2', dtp2);
    if (sector !== undefined) { params = params.append('sector', sector); }
    if (company !== undefined) { params = params.append('company', company); }
    if (branch !== undefined) { params = params.append('branch', branch); }
    return this.http.get(`${this.baseUrl}Report/Statment/${this.auth.decodedToken.unique_name[0]}`,
      { observe: 'response', params }).pipe(map((res) => {
        return res.body;
      }));
  }

  // ===================================================================================

  batchPerformance(company, id): any {
    return this.http.get(`${this.baseUrl}Report/BatchPerformance/${id}/${company}`);
  }
}
