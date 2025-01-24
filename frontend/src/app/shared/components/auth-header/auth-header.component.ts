import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { RouterModule } from '@angular/router';

interface User {
  name: string;
  avatar: string;
}

interface Notification {
  id: number;
  message: string;
  time: string;
  isRead: boolean;
}

@Component({
  selector: 'app-auth-header',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './auth-header.component.html',
  styleUrl: './auth-header.component.scss',
})
export class AuthHeaderComponent implements OnDestroy {
  isMenuOpen = false;
  isUserMenuOpen = false;
  isNotificationsOpen = false;
  currentUser: User = {
    name: 'Ana Paula',
    avatar: 'assets/img/image_perfil.jpeg',
  };

  notifications: Notification[] = [
    {
      id: 1,
      message: '¡Nueva actividad de lectura disponible!',
      time: 'Hace 5 minutos',
      isRead: false,
    },
    {
      id: 2,
      message: 'Has completado el nivel 2 de matemáticas',
      time: 'Hace 2 horas',
      isRead: false,
    },
    {
      id: 3,
      message: 'Tu hijo ha completado la lección de hoy',
      time: 'Hace 1 día',
      isRead: true,
    },
  ];

  get unreadNotifications(): number {
    return this.notifications.filter((n) => !n.isRead).length;
  }

  constructor() {
    // Agregar listener para clicks en el documento
    document.addEventListener('click', this.handleDocumentClick.bind(this));
  }

  private handleDocumentClick(event: MouseEvent) {
    const userSection = document.querySelector('.header__user-section');
    const notificationsDropdown = document.querySelector(
      '.header__notifications-dropdown'
    );
    const target = event.target as HTMLElement;

    // Si el clic fue fuera del user section y los dropdowns están abiertos, cerrarlos
    if (userSection && !userSection.contains(target)) {
      this.isUserMenuOpen = false;
      this.isNotificationsOpen = false;
    }
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    if (this.isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }

  closeMenu() {
    this.isMenuOpen = false;
    document.body.style.overflow = 'auto';
  }

  toggleUserMenu() {
    this.isUserMenuOpen = !this.isUserMenuOpen;
    if (this.isUserMenuOpen) {
      this.isNotificationsOpen = false;
    }
  }

  toggleNotifications(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.isNotificationsOpen = !this.isNotificationsOpen;
    if (this.isNotificationsOpen) {
      this.isUserMenuOpen = false;
    }
  }

  closeUserMenu(event: Event) {
    event.stopPropagation();
    this.isUserMenuOpen = false;
  }

  markAsRead(notification: Notification) {
    notification.isRead = true;
  }

  markAllAsRead() {
    this.notifications.forEach((notification) => (notification.isRead = true));
  }

  logout(): void {
    console.log('Usuario cerró sesión');
    this.isUserMenuOpen = false;
  }

  // No olvides limpiar el event listener cuando el componente se destruye
  ngOnDestroy() {
    document.removeEventListener('click', this.handleDocumentClick.bind(this));
  }
}
