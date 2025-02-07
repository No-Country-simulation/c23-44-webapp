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

  login(email: string, password: string) {
    console.log('Datos enviados al backend:', { email, password }); // 👀 Verifica los datos

    //return this.http.post<{ token: string; user: any }>(`${this.apiUrl}/login`, { email, password })
    return this.http.post<{ id: string; email: string; password: string; token: string }>(`${this.apiUrl}/login`, { email, password })
    .pipe(
      tap(response => {
        console.log('Respuesta del backend:', response); // 👀 Verifica la respuesta
        if (response && response.token) {
          localStorage.setItem('token', response.token);
          
          // Guarda los datos del usuario correctamente
          const userData = {
            id: response.id,
            email: response.email
          };
          localStorage.setItem('user', JSON.stringify(userData));
        } else {
          console.warn('La respuesta no contiene datos de usuario.');
          localStorage.removeItem('user');
        }
      })
      
      );   
  }
  
  // login(credentials: { email: string; password: string }): Observable<any> {
  //   return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
  //     tap((response: any) => {
  //       if (response && response.token) {
  //         localStorage.setItem('token', response.token);
          
  //         if (response.user) {
  //           localStorage.setItem('user', JSON.stringify(response.user));
  //         } else {
  //           console.warn('La respuesta no contiene datos de usuario.');
  //           // Se puede almacenar un objeto vacío o gestionar el error de otra forma
  //           localStorage.removeItem('user');
  //         }
  //       } else {
  //         console.error('Respuesta del backend no contiene token o usuario.');
  //       }
  //         // this.isAuthenticated = true;
  //         // this.currentUser = response.user;
  //     })
  //   );
  // }

  // Obtener perfil del usuario autenticado
  getProfile(): any {
    const user = localStorage.getItem('user');
    if (!user || user === 'undefined') {
      console.warn('No se encontró información de usuario en localStorage.');
      return null; // Retornar null si no hay usuario guardado
    }
    try {
      return JSON.parse(user);
    } catch (error) {
      console.error('Error al parsear el perfil del usuario:', error);
      localStorage.removeItem('user'); // Evita datos corruptos
      return null; // Evitar que la app crashee si hay datos inválidos
    }
  }
  // Verificar si el usuario está autenticado
  // isLoggedIn(): boolean {
  //   const token = localStorage.getItem('token');
  //   return token !== null && token !== undefined && token !== '';
  // }
  

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    // Opcionalmente, valida que el token no sea la cadena "undefined" o vacío.
    const isValid = token !== null && token !== 'undefined' && token.trim() !== '';
    this.currentUser = this.getProfile(); // Obtén el perfil si fuera necesario.
    return isValid;
  }
  // isLoggedIn(): boolean {
  //    const token = localStorage.getItem('token');
  //    this.isAuthenticated = !!token;
  //    this.currentUser = this.getProfile();
  //    return this.isAuthenticated;
  //  }

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
