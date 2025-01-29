import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-book-reader',
  templateUrl: './book-reader.component.html',
  styleUrls: ['./book-reader.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class BookReaderComponent implements OnInit {
  libro = {
    titulo: '',
    contenido: '',
    paginaActual: 1,
    totalPaginas: 0
  };

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    // Obtener el ID o título del libro de la URL
    this.route.params.subscribe(params => {
      // Aquí posteriormente implementaremos la carga del libro
      this.cargarLibro(params['id']);
    });
  }

  cargarLibro(id: string) {
    // Simulación de carga de libro
    this.libro = {
      titulo: 'Título del Libro',
      contenido: 'Contenido del libro...',
      paginaActual: 1,
      totalPaginas: 100
    };
  }

  paginaAnterior() {
    if (this.libro.paginaActual > 1) {
      this.libro.paginaActual--;
    }
  }

  paginaSiguiente() {
    if (this.libro.paginaActual < this.libro.totalPaginas) {
      this.libro.paginaActual++;
    }
  }
}
