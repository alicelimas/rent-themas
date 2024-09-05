import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Theme } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private apiUrl = 'http://3.128.249.166:8000/api/themes/'; // Ajuste a URL conforme necessário

  constructor(private http: HttpClient) { }

  getThemes(): Observable<Theme[]> {
    return this.http.get<Theme[]>(this.apiUrl);
  }

  getTheme(id: number): Observable<Theme> {
    return this.http.get<Theme>(`${this.apiUrl}${id}/`);
  }

  createTheme(theme: Theme): Observable<Theme> {
    return this.http.post<Theme>(this.apiUrl, theme);
  }

  updateTheme(id: number, theme: Theme): Observable<Theme> {
    return this.http.put<Theme>(`${this.apiUrl}${id}/`, theme);
  }

  deleteTheme(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${id}/`);
  }
}
