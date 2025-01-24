import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-type-selection',
  templateUrl: './user-type-selection.component.html',
  styleUrls: ['./user-type-selection.component.scss'],
})
export class UserTypeSelectionComponent {
  constructor(private router: Router) {}

  selectUserType(type: 'parent' | 'teacher') {
    // Aquí puedes manejar la lógica de selección
    this.router.navigate(['/login'], { queryParams: { userType: type } });
  }
}
