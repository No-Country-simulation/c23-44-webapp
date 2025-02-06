// child-profile.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentService } from '../../services/student.service'; // Importa el servicio
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-child-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './child-profile.component.html',
  styleUrls: ['./child-profile.component.scss'],
})
export class ChildProfileComponent implements OnInit {
  childProfile: any; // Aquí deberías definir una interfaz apropiada
  isLoading = true; // Para mostrar un spinner mientras se cargan los datos
  errorMessage: string | null = null; // Para manejar errores

  constructor(
    private route: ActivatedRoute,
    private studentService: StudentService // Inyecta el servicio
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const childId = params['id']; // Obtén el ID del estudiante desde la ruta
      this.loadChildProfile(childId); // Carga los datos del estudiante
    });
  }

  // Método para cargar los datos del estudiante
  loadChildProfile(childId: string) {
    this.isLoading = true;
    this.errorMessage = null;

    this.studentService.getStudentById(childId).subscribe({
      next: (student) => {
        this.childProfile = this.mapStudentToProfile(student); // Mapea los datos del estudiante al perfil
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error al cargar el perfil del estudiante:', error);
        this.errorMessage = 'No se pudo cargar el perfil del estudiante. Por favor, inténtalo de nuevo.';
        this.isLoading = false;
      }
    });
  }

  // Método para mapear los datos del estudiante al perfil
  mapStudentToProfile(student: any): any {
    return {
      name: student.fullName,
      age: '15',//this.calculateAge(student.birthDate), // Si tienes la fecha de nacimiento
      email: student.email,
      country: student.country,
      level: student.level || 'N/A',
      avatar: student.image || 'assets/img/image_perfil.jpeg', // Imagen por defecto
      process: student.process || 'Rapidez y Puntuación',
      currentPrecision: student.currentPrecision || 0,
      todayReading: {
        title: 'El Reino Animal', // Datos de ejemplo (puedes obtenerlos del backend)
        words: 213,
        duration: 8,
        wrongPronunciation: 7,
        selfCorrection: 1,
        omission: 3,
        repetitions: 4,
      },
      weekReading: {
        title: 'Vuelo del Buho', // Datos de ejemplo (puedes obtenerlos del backend)
        words: 158,
        duration: 4,
        wrongPronunciation: 5,
        selfCorrection: 2,
        omission: 1,
        repetitions: 2,
      },
    };
  }

  // Método para calcular la edad a partir de la fecha de nacimiento
  calculateAge(birthDate: string): number {
    if (!birthDate) return 0;
    const today = new Date();
    const birthDateObj = new Date(birthDate);
    let age = today.getFullYear() - birthDateObj.getFullYear();
    const monthDifference = today.getMonth() - birthDateObj.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDateObj.getDate())) {
      age--;
    }
    return age;
  }
}