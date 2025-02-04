import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit{

  constructor(private authService: AuthService, private router: Router) {}


  user = {
    name: '',
    age: '32 años',
    children: 2,
    process: 'Rapidez y Puntuación',
  };

  children = [
    {
      id: 1,
      name: 'Ana Paula',
     progressData: {
        month: 'Junio',
        values: [10, 20, 30, 40, 50, 60, 70, 80],
      },
    },
    {
      id: 2,
      name: 'David',
      progressData: {
      month: 'Junio',
      values: [15, 25, 35, 45, 55, 65, 75],
     },
    },
  ];

  //constructor(private router: Router) {}

  //viewChildProfile(childId: number) {
    //this.router.navigate(['/child-profile', childId]);
  //}
  ngOnInit(): void {
    this.user = this.authService.getProfile();
    const nprofile = this.authService.getProfile(); // Obtener datos del perfil

    if (nprofile && nprofile.fullName) {
      this.user.name = nprofile.fullName; // Asignar el fullName al objeto user
    } else {
      console.error('No se encontró un fullName en el perfil.');
  }
  }
  navigateToCreateStudent(): void {
    this.router.navigate(['/createStudent']);
  }
}
