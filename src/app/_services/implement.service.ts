import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ImplementService {
  baseUrl = environment.apiUrl;
  constructor(
    private auth: AuthService,
    private http: HttpClient
  ) { }

  allFiles(): any {
    return this.http.get(`${this.baseUrl}Implement/main/${this.auth.decodedToken.unique_name[0]}`);
  }

  // ================================================================================

  searchCode(code): any {
    return this.http.get(`${this.baseUrl}Implement/code/${this.auth.decodedToken.unique_name[0]}/${code}`);
  }

  // ================================================================================

  getPDF(id, evt): any {
    return this.http.get(`${this.baseUrl}Implement/gotopdf/${evt}/${this.auth.decodedToken.unique_name[0]}/${id}`);
  }

  // ================================================================================

  searchInImplemntByName(name: string): any {
    return this.http.get(`${this.baseUrl}Implement/searchInImplemntByName/${name}/${this.auth.decodedToken.unique_name[0]}`);
  }

  // ================================================================================

  searchInMdlByCivilId(civilID: number): any {
    return this.http.get(`${this.baseUrl}Implement/searchInMdlByCivilId/${civilID}/${this.auth.decodedToken.unique_name[0]}`);
  }

  // ================================================================================

  searchInMdlByAutoNum(autoNum: number): any {
    return this.http.get(`${this.baseUrl}Implement/searchInMdlByAutoNum/${autoNum}/${this.auth.decodedToken.unique_name[0]}`);
  }

  // ================================================================================

}
