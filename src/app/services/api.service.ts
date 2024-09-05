import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = 'http://3.128.249.166:8000/api/';

  constructor(private http: HttpClient) { }

  getThemes(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}themes/`);
  }

  getClients(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}clients/`);
  }

  getItens(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}itens/`);
  }

  getRents(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}rents/`);
  }

  getAddress(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}Address/`);
  }
}
