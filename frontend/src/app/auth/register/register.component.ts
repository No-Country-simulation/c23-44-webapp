import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { RouterModule, Router } from '@angular/router';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  imports: [ReactiveFormsModule, CommonModule, RouterModule, SweetAlert2Module]
})
export class RegisterComponent {
  registerForm: FormGroup;
  
  

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.registerForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      country: ['',],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      console.log('Datos enviados:', this.registerForm.value); // Verificar qué datos se envían
      this.authService.register(this.registerForm.value).subscribe({
        next:(response) => {
          console.log('Registro exitoso:', response);
          Swal.fire({
            title: '¡Registro Completo!',
            text: 'Ha sido registrado correctamente',
            icon: 'success',
            confirmButtonText: 'Entendido',
          }).then(() => {
            this.router.navigate(['/profile/id']);
          });
          
        },
        error: (err) => {
          console.error('Error during registration:', err);
          console.error('Detalles del error:', err.error); // Imprime detalles de la respuesta
          Swal.fire({
            title: 'Error',
            text: 'Hubo un problema al registrarse. Inténtalo de nuevo.',
            icon: 'error',
            confirmButtonText: 'Entendido',
          });
        },
      });
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
}
