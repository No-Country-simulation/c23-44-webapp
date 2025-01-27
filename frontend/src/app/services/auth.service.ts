import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root', // Se registra automáticamente como un servicio global
})
export class AuthService {
  private apiUrl = 'http://localhost:3001/auth/register'; // URL base del backend
  //private apiUrl = 'http://localhost:3001/api'; // URL base del backend/documentacion

  constructor(private http: HttpClient) {}

  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  login(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, userData);
}
}
