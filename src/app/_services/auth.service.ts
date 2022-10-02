import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Pay } from '../_models/Pay';
import { Statment } from '../_models/Statment';
import { PaginatedResultNumber, PaginatedResultPay, PaginatedResultSearchByCivilId } from '../_models/pagination';
import { NumberPhone } from '../_models/NumberPhone';
import { SearchByCivilId } from '../_models/SearchByCivilId';
import { Main } from '../_models/Main';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = environment.apiUrl;
  jwtHelper = new JwtHelperService();
  decodedToken: any;
  constructor(private http: HttpClient) { }

  // =================================================================

  login(model: any): any {
    return this.http.post(this.baseUrl + 'Auth/login', model).pipe(map((response: any) => {
      const user = response;
      if (user) {
        localStorage.setItem('token', user.token);
        localStorage.setItem('user', 'emp');
        this.decodedToken = this.jwtHelper.decodeToken(user.token);
        localStorage.setItem('roule', JSON.stringify(user.roules));
      }
    }));
  }

  // =================================================================

  rouless(): any {
    return this.http.get(`${this.baseUrl}Auth/roules/${this.decodedToken.unique_name[0]}`);
  }

  // =================================================================


  loginClint(model: any): any {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('roule');
    return this.http.post(this.baseUrl + 'AuthClint/login', model).pipe(map((response: any) => {
      const user = response;
      if (user) {
        localStorage.setItem('token', user.token);
        localStorage.setItem('user', 'clint');
        this.decodedToken = this.jwtHelper.decodeToken(user.token);
      }
    }));
  }

  // =================================================================

  loginSubClint(model: any, id: number): any {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('roule');
    return this.http.post(`${this.baseUrl}AuthClint/loginSub/${id}`, model).pipe(map((response: any) => {
      const user = response;
      if (user) {
        localStorage.setItem('token', user.token);
        localStorage.setItem('user', 'clint');
        this.decodedToken = this.jwtHelper.decodeToken(user.token);
      }
    }));
  }

  // =================================================================

  loggedIn(): any {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }

  // =================================================================

  register(model: any): any {
    return this.http.post(this.baseUrl + 'register', model);
  }

  // =================================================================

  getMain(code): Observable<Main[]> {
    return this.http.get<Main[]>(this.baseUrl + 'user/customer/' + code);
  }

  // =================================================================

  getPay(code, page?, itemsPerPage?): Observable<PaginatedResultPay<Pay[]>> {
    const paginatedResult: PaginatedResultPay<Pay[]> = new PaginatedResultPay<Pay[]>();
    let params = new HttpParams();
    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }
    return this.http.get<Pay[]>(this.baseUrl + 'user/pay/' + code, { observe: 'response', params }).pipe(
      map(response => {
        paginatedResult.result = response.body;
        if (response.headers.get('pagination') != null) {
          paginatedResult.pagination = JSON.parse(response.headers.get('pagination'));
        }
        return paginatedResult;
      }, error => {
        console.log(error);
      })
    );
  }

  // =================================================================

  getTotalPay(code): any {
    return this.http.get(this.baseUrl + 'user/totalpay/' + code);
  }
  getStatment(code?): any {
    return this.http.get(this.baseUrl + 'user/statment/' + code);
    // const paginatedResul: PaginatedResultStatment<Statment[]> = new PaginatedResultStatment<Statment[]>();
    // let params = new HttpParams();
    // if (page != null && itemsPerPage != null) {
    //   params = params.append('pageNumber', page);
    //   params = params.append('pageSize', itemsPerPage);
    // }
    // return this.http.get<Statment[]>(this.baseUrl + 'user/statment/' + code, { observe: 'response', params }).pipe(
    //   map(response => {
    //     paginatedResul.result = response.body;
    //     if (response.headers.get('pagination') != null) {
    //       paginatedResul.pagination = JSON.parse(response.headers.get('pagination'));
    //     }
    //     return paginatedResul;
    //   }, error => {
    //     console.log(error);
    //   })
    // );
  }

  // =================================================================

  getNumber(civilId?, page?, itemsPerPage?): Observable<PaginatedResultNumber<NumberPhone[]>> {
    const paginatedResult: PaginatedResultNumber<NumberPhone[]> = new PaginatedResultNumber<NumberPhone[]>();
    let params = new HttpParams();
    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }
    return this.http.get<NumberPhone[]>(this.baseUrl + 'user/numbers/' + civilId, { observe: 'response', params }).pipe(
      map(response => {
        paginatedResult.result = response.body;
        if (response.headers.get('pagination') != null) {
          paginatedResult.pagination = JSON.parse(response.headers.get('pagination'));
        }
        return paginatedResult;
      }, error => {
        console.log(error);
      })
    );
  }

  // =================================================================

  saveStatment(emp: number, statment: Statment): any {
    return this.http.post(this.baseUrl + 'user/addstatment/' + emp, statment);
  }

  // =================================================================

  getOldStatment(Code?): any {
    return this.http.get(this.baseUrl + 'user/oldstatment/' + Code);
  }

  // =================================================================

  getAnotherfile(civilID?): any {
    return this.http.get(this.baseUrl + 'user/anotherfile/' + civilID);
  }

  // =================================================================

  searchByCivilId(civilID?, page?, itemsPerPage?): Observable<PaginatedResultSearchByCivilId<SearchByCivilId[]>> {
    const paginatedResult: PaginatedResultSearchByCivilId<SearchByCivilId[]> = new PaginatedResultSearchByCivilId<SearchByCivilId[]>();
    let params = new HttpParams();
    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }
    return this.http.get<SearchByCivilId[]>(this.baseUrl + 'user/searchByCivilId/' + civilID,
      { observe: 'response', params }).pipe(map(response => {
        paginatedResult.result = response.body;
        if (response.headers.get('pagination') != null) {
          paginatedResult.pagination = JSON.parse(response.headers.get('pagination'));
        }
        return paginatedResult;
      }, error => {
        console.log(error);
      }));
  }

  // =================================================================

  updateUser(user: any, code: number): any {
    return this.http.put(this.baseUrl + 'auth/updateuser/' + code, user);
  }


  //   sendmessage(): any {
  //     const body: any = {};
  //     const text: any = {};
  //     text.preview_url = false;
  //     text.body = 'dddffffffff';
  //     body.messaging_product = 'whatsapp';
  //     body.to = 96599472495;
  //     body.type = 'text';
  //     body.text = text;
  //     console.log('https://graph.facebook.com/v13.0/107851761999552/messages');
  //     return this.http.post('https://graph.facebook.com/v13.0/107851761999552/messages', body, {
  //       headers: new HttpHeaders({
  //         'Content-Type': 'application/json',
  //         Authorization: `Bearer EAALI0KRW
  // li4BAMd3odjCzUZCskaUo1Fkak3eqbpEOd0yTyzIrwXCaSCxAPHvtPJQBGeMZBAkPYSVRStFIi
  // sHdb34bkZAxcCZAJimmngh18Iu2vfgxj2tjgsZByFnZADTOInzMInI4TJa8aOQacovWR1rzkC
  // GCHhmKxP6VrHEra5EzMgvzmrlxN4gtV8zx2ACFxClZCO21ZAAiQZDZD`
  //       })
  //     });
  //   }
}
