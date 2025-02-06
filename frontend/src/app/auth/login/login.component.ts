// login.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: () => {
          Swal.fire({
            title: '¡Bienvenido!',
            text: 'Has iniciado sesión con éxito.',
            icon: 'success',
            confirmButtonText: 'Continuar',
          }).then(() => {
            this.router.navigate(['/profile']);
          });
        },
        error: () => {
          Swal.fire({
            title: 'Error',
            text: 'Credenciales incorrectas. Inténtalo de nuevo.',
            icon: 'error',
            confirmButtonText: 'Entendido',
          });
        },
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}


// import { Component } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { CommonModule } from '@angular/common';
// import { ReactiveFormsModule } from '@angular/forms';
// import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
// import { AuthService } from '../../services/auth.service';
// import { Router } from '@angular/router';
// import Swal from 'sweetalert2';

// @Component({
//   selector: 'app-login',
//   standalone: true,
//   imports: [CommonModule, ReactiveFormsModule],
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.scss']
// })
// export class LoginComponent {
//   loginForm: FormGroup; //Definimos

//   constructor(
//     private fb: FormBuilder,
//     private authService: AuthService,
//     private router: Router
// ) {
//     // Crear el formulario con FormBuilder
//     this.loginForm = this.fb.group({
//       email: ['', [Validators.required, Validators.email]], // Campo de email con validaciones
//       password: ['', [Validators.required, Validators.minLength(6)]] // Campo de password con validaciones
//     });
//   }

//   // Método para manejar el envío del formulario
//   onSubmit(): void {
//     if (this.loginForm.valid) {
//       console.log(this.loginForm.value); // Verifica los datos enviados
//       this.authService.login(this.loginForm.value).subscribe({
//         next: () => {
//           Swal.fire({
//             title: '¡Bienvenido!',
//             text: 'Has iniciado sesión con éxito.',
//             icon: 'success',
//             confirmButtonText: 'Continuar',
//           }).then(() => {
//             // Redirigir al perfil o al dashboard
//             this.router.navigate(['/profile']);
//           });
//         },
//         error: (err) => {
//           console.error('Error al iniciar sesión:', err);
//           Swal.fire({
//             title: 'Error',
//             text: 'Credenciales incorrectas. Inténtalo de nuevo.',
//             icon: 'error',
//             confirmButtonText: 'Entendido',
//           });
//         },
//       });
//     } else {
//       this.loginForm.markAllAsTouched();
//     }
//   }
// }
