import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-child-profile',
  templateUrl: './child-profile.component.html',
  styleUrls: ['./child-profile.component.scss'],
})
export class ChildProfileComponent implements OnInit {
  childProfile: any; // Aquí deberías definir una interface apropiada

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const childId = params['id'];
      // Aquí deberías obtener los datos del niño según el ID
      // Por ahora usamos datos de ejemplo
      this.childProfile = {
        name: 'Ana Paula',
        age: 8,
        level: 3,
        avatar: 'assets/img/image_perfil.jpeg',
        process: 'Rapidez y Puntuación',
        currentPrecision: 60,
        todayReading: {
          title: 'El Reino Animal',
          words: 213,
          duration: 8,
          wrongPronunciation: 7,
          selfCorrection: 1,
          omission: 3,
          repetitions: 4,
        },
        weekReading: {
          title: 'Vuelo del Buho',
          words: 158,
          duration: 4,
          wrongPronunciation: 5,
          selfCorrection: 2,
          omission: 1,
          repetitions: 2,
        },
      };
    });
  }
}
