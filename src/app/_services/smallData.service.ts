import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

export class MapSetting {
  key: string;
  name: string;
}

const mapTypes: MapSetting[] = [{
  key: 'roadmap',
  name: 'Road Map'
}, {
  key: 'satellite',
  name: 'Satellite (Photographic) Map'
}, {
  key: 'hybrid',
  name: 'Hybrid Map'
}];
@Injectable({
  providedIn: 'root'
})
export class SmallDataService {
  baseUrl = environment.apiUrl;
  customerCases: any = {};
  customerClient: any = {};
  nextProcess: any = {};
  constructor(private http: HttpClient) { }
  getCaseCustomer(): any {
    this.http.get(this.baseUrl + 'user/case/').subscribe((res: any) => {
      this.customerCases = res;
    });
  }
  getClintCustomer(): any {
    this.http.get(this.baseUrl + 'user/clint/').subscribe((res: any) => {
      this.customerClient = res;
    });
  }
  getNextProcess(): any {
    this.http.get(this.baseUrl + 'user/nextprocess').subscribe((res: any) => {
      this.nextProcess = res;
    });
  }
  getMapTypes(): MapSetting[] {
    return mapTypes;
  }
}
