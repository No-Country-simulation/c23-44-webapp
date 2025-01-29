import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-reading',
  templateUrl: './reading.component.html',
  styleUrls: ['./reading.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class ReadingComponent {
  currentSlide = 0;
  slides = [
    'assets/img/carrusel1.jpg',
    'assets/img/carrusel2.jpg'
  ];

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
  }

  prevSlide() {
    this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
  }

  setSlide(index: number) {
    this.currentSlide = index;
  }

  librosDestacadosOriginal = [
    {
      titulo: 'A casa',
      imagen: 'assets/img/libro.png',
    },
    {
      titulo: 'O Pequeno Príncipe',
      imagen: 'assets/img/libro.png',
    },
    {
      titulo: 'El Alquimista',
      imagen: 'assets/img/libro.png',
    },
    {
      titulo: 'Don Quijote',
      imagen: 'assets/img/libro.png',
    },
    {
      titulo: 'Cien años de soledad',
      imagen: 'assets/img/libro.png',
    },
    {
      titulo: 'La Odisea',
      imagen: 'assets/img/libro.png',
    },
    {
      titulo: 'Romeo y Julieta',
      imagen: 'assets/img/libro.png',
    },
    {
      titulo: 'La Divina Comedia',
      imagen: 'assets/img/libro.png',
    }
  ];

  librosPopularesOriginal = [
    {
      titulo: 'Lendas do Folclore',
      imagen: 'assets/img/libro.png',
    },
    {
      titulo: 'Cinderela',
      imagen: 'assets/img/libro.png',
    },
    {
      titulo: 'Harry Potter',
      imagen: 'assets/img/libro.png',
    },
    {
      titulo: 'El Señor de los Anillos',
      imagen: 'assets/img/libro.png',
    },
    {
      titulo: 'Drácula',
      imagen: 'assets/img/libro.png',
    },
    {
      titulo: 'El Principito',
      imagen: 'assets/img/libro.png',
    },
    {
      titulo: 'La Iliada',
      imagen: 'assets/img/libro.png',
    },
    {
      titulo: 'Frankenstein',
      imagen: 'assets/img/libro.png',
    }
  ];

  librosDestacados = [...this.librosDestacadosOriginal];
  librosPopulares = [...this.librosPopularesOriginal];

  buscarLibro(evento: any) {
    const busqueda = (evento.target as HTMLInputElement)?.value?.toLowerCase().trim() || '';

    // Actualizar los arrays de libros
    if (busqueda === '') {
      this.librosDestacados = [...this.librosDestacadosOriginal];
      this.librosPopulares = [...this.librosPopularesOriginal];
    } else {
      this.librosDestacados = this.librosDestacadosOriginal.filter(libro =>
        libro.titulo.toLowerCase().includes(busqueda)
      );
      this.librosPopulares = this.librosPopularesOriginal.filter(libro =>
        libro.titulo.toLowerCase().includes(busqueda)
      );
    }

    // Aplicar animación después del cambio de datos
    setTimeout(() => {
      const libros = document.querySelectorAll('.libro');
      libros.forEach(libro => {
        libro.classList.remove('fade-enter', 'fade-exit');
        void (libro as HTMLElement).offsetWidth; // Cast a HTMLElement
        libro.classList.add('fade-enter');
      });
    }, 0);
  }

  // Añadir estas propiedades para el scroll de libros
  scrollPositionDestacados = 0;
  scrollPositionPopulares = 0;
  readonly scrollAmount = 400; // Cantidad de píxeles a desplazar

  scrollLibros(seccion: 'destacados' | 'populares', direccion: 'prev' | 'next') {
    const container = document.querySelector(`.lecturas__grid--${seccion}`);
    if (!container) return;

    const scrollWidth = container.scrollWidth;
    const clientWidth = container.clientWidth;
    const currentScroll = container.scrollLeft;

    let newScrollPosition: number;

    if (direccion === 'next') {
      // Si estamos cerca del final, volver al principio
      if (currentScroll + clientWidth >= scrollWidth - 100) {
        newScrollPosition = 0;
      } else {
        newScrollPosition = currentScroll + this.scrollAmount;
      }
    } else {
      // Si estamos cerca del principio, ir al final
      if (currentScroll <= 100) {
        newScrollPosition = scrollWidth - clientWidth;
      } else {
        newScrollPosition = currentScroll - this.scrollAmount;
      }
    }

    container.scrollTo({
      left: newScrollPosition,
      behavior: 'smooth'
    });
  }
}
