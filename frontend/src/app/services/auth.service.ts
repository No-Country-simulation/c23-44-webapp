// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:3001/auth'; // URL base del backend
  private isAuthenticated = false; // Estado de autenticación
  private currentUser: any = null; // Datos del usuario autenticado

  constructor(private http: HttpClient, private router: Router) {}

  // Registro de usuario
  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  // Inicio de sesión
  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((response: any) => {
        if (response && response.token && response.user) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('user', JSON.stringify(response.user));
        } else {
          console.error('Respuesta del backend no contiene token o usuario.');
        }
          // this.isAuthenticated = true;
          // this.currentUser = response.user;
      })
    );
  }

  // Obtener perfil del usuario autenticado
  getProfile(): any {
    const user = localStorage.getItem('user');
    if (!user) {
      console.warn('No se encontró información de usuario en localStorage.');
      return null; // Retornar null si no hay usuario guardado
    }
    try {
      return JSON.parse(user);
    } catch (error) {
      console.error('Error al parsear el perfil del usuario:', error);
      return null; // Evitar que la app crashee si hay datos inválidos
    }
  }
  // Verificar si el usuario está autenticado
  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return token !== null && token !== undefined && token !== '';
  }
  

  // isLoggedIn(): boolean {
  //   const token = localStorage.getItem('token');
  //   this.isAuthenticated = !!token;
  //   this.currentUser = this.getProfile();
  //   return this.isAuthenticated;
  // }

  // Cierre de sesión
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.isAuthenticated = false;
    this.currentUser = null;
    this.router.navigate(['/login']);
  }
}


// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable, tap } from 'rxjs';
// import { Router } from '@angular/router';

// @Injectable({
//   providedIn: 'root', // Se registra automáticamente como un servicio global
// })
// export class AuthService {
//   private apiUrl = 'http://localhost:3001/auth'; // URL base del backend
//   //private apiUrl = 'http://localhost:3001/api'; // URL base del backend/documentacion
//   private isAuthenticated = false; // Estado de autenticación
//   private currentUser: any = null; // Datos del usuario autenticado

//   constructor(private http: HttpClient, router: Router) {}

//   register(userData: any): Observable<any> {
//     return this.http.post(`${this.apiUrl}/register`, userData);
//   }

//   login(credentials: { email: string; password: string }): Observable<any> {
//     return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
//       tap((response: any) => {
//         // Guardar token y datos del usuario en localStorage
//         localStorage.setItem('token', response.token);
//         localStorage.setItem('user', JSON.stringify(response.user));
//       })
//     );
//   }

//   getProfile(): any {
//     const user = localStorage.getItem('user');
//     return user ? JSON.parse(user) : null;
//   }

//   logout(): void {
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
//   }
// }
