import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule],
})
export class HeaderComponent {
  isMenuOpen: boolean = false;

  constructor(private router: Router) {}

  navigateToLogin(): void {
    this.router.navigate(['/auth/select-user-type']);
  }
}
