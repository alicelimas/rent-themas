import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Rent } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class RentService {
  private apiUrl = 'http://3.128.249.166:8000/api/rents/'; 

  constructor(private http: HttpClient) { }

  getRents(): Observable<Rent[]> {
    return this.http.get<Rent[]>(this.apiUrl);
  }

  getRent(id: number): Observable<Rent> {
    return this.http.get<Rent>(`${this.apiUrl}${id}/`);
  }

  createRent(rent: Rent): Observable<Rent> {
    return this.http.post<Rent>(this.apiUrl, rent);
  }

  updateRent(id: number, rent: Rent): Observable<Rent> {
    return this.http.put<Rent>(`${this.apiUrl}${id}/`, rent);
  }

  deleteRent(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${id}/`);
  }
}
