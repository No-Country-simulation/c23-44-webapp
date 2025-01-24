import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  showUserTypeModal = true;

  selectUserType(type: 'parent' | 'teacher') {
    this.showUserTypeModal = false;
    // Aquí puedes agregar lógica adicional según el tipo de usuario seleccionado
  }
}
