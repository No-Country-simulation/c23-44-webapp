import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'], // Nota: styleUrls (con "s")
})
export class ProfileComponent implements OnInit {
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

  profileId: string | null = null; // Para almacenar el id obtenido de la URL

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute // Inyección del ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Obtener el perfil desde el AuthService
    const profile = this.authService.getProfile();
    if (!profile) {
      console.warn('No se encontró un perfil de usuario.');
      this.router.navigate(['/login']);
      return;
    }

    // Asignar el fullName del perfil, si existe
    if (profile.fullName) {
      this.user.name = profile.fullName;
    } else {
      console.error('No se encontró un fullName en el perfil.');
    }

    // Leer el parámetro 'id' de la ruta
    this.profileId = this.route.snapshot.paramMap.get('id');

    if (!this.profileId) {
      // Si no existe el parámetro en la URL, y si el perfil tiene un id,
      // redirigimos a la ruta con el id correspondiente
      if (profile.id) {
        this.router.navigate(['/profile', profile.id]);
      } else {
        console.error('No se encontró un ID de usuario para la redirección.');
      }
    } else {
      // Aquí podrías comparar profile.id y this.profileId si lo requieres
      console.log('Perfil cargado con id:', this.profileId);
    }
  }

  viewChildProfile(childId: number) {
    this.router.navigate(['/child-profile', childId]);
  }

  navigateToCreateStudent(): void {
    this.router.navigate(['/createStudent']);
  }
}

// import { CommonModule } from '@angular/common';
// import { Component, OnInit } from '@angular/core';
// import { Router, RouterModule } from '@angular/router';
// import { AuthService } from '../../services/auth.service';


// @Component({
//   selector: 'app-profile',
//   standalone: true,
//   imports: [CommonModule, RouterModule],
//   templateUrl: './profile.component.html',
//   styleUrl: './profile.component.scss',
// })
// export class ProfileComponent implements OnInit{

//   constructor(private authService: AuthService, private router: Router) {}


//   user = {
//     name: '',
//     age: '32 años',
//     children: 2,
//     process: 'Rapidez y Puntuación',
//   };

//   children = [
//     {
//       id: 1,
//       name: 'Ana Paula',
//      progressData: {
//         month: 'Junio',
//         values: [10, 20, 30, 40, 50, 60, 70, 80],
//       },
//     },
//     {
//       id: 2,
//       name: 'David',
//       progressData: {
//       month: 'Junio',
//       values: [15, 25, 35, 45, 55, 65, 75],
//      },
//     },
//   ];


//   viewChildProfile(childId: number) {
//     this.router.navigate(['/child-profile', childId]);
//   }
//   ngOnInit(): void {
    
//     this.user = this.authService.getProfile();
//     const profile = this.authService.getProfile(); // Obtener datos del perfil

//     if (profile && profile.id) {
//       this.router.navigate(['/profile', profile.id]);
//     } else {
//       // Si no hay id, redirige a otra ruta o muestra un mensaje de error
//       console.error('No se encontró un ID de usuario para la redirección.');
//     }
//     if (!this.user) {
//       console.warn('No se encontró un perfil de usuario.');
//       this.router.navigate(['/login']); // Redirige si no hay sesión
//     }

//     if (profile && profile.fullName) {
//       this.user.name = profile.fullName; // Asignar el fullName al objeto user
//     } else {
//       console.error('No se encontró un fullName en el perfil.');
//     }
//   }
//   navigateToCreateStudent(): void {
//     this.router.navigate(['/createStudent']);
//   }
// }
