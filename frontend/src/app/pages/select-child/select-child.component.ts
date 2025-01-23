import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

interface Child {
  id: number;
  name: string;
  avatar: string;
  level: number;
}

@Component({
  selector: 'app-select-child',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container">
      <div class="select-child">
        <h2 class="select-child__title">Seleccionar Perfil</h2>
        <div class="select-child__grid">
          <div
            *ngFor="let child of children"
            class="select-child__card"
            (click)="viewChildProfile(child.id)"
          >
            <div class="select-child__avatar">
              <img [src]="child.avatar" [alt]="child.name" />
            </div>
            <h3 class="select-child__name">{{ child.name }}</h3>
            <p class="select-child__level">Nivel {{ child.level }}</p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .container {
        padding: 2rem;
        background-color: #f8f9fa;
        min-height: calc(100vh - 64px);
      }

      .select-child {
        max-width: 1200px;
        margin: 0 auto;
      }

      .select-child__title {
        font-size: 2rem;
        font-weight: bold;
        color: #333;
        margin-bottom: 2rem;
        text-align: center;
      }

      .select-child__grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 2rem;
        padding: 1rem;
      }

      .select-child__card {
        background-color: white;
        border-radius: 1rem;
        padding: 2rem;
        text-align: center;
        cursor: pointer;
        transition: transform 0.2s, box-shadow 0.2s;
      }

      .select-child__card:hover {
        transform: translateY(-5px);
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
      }

      .select-child__avatar {
        width: 120px;
        height: 120px;
        margin: 0 auto 1.5rem;
      }

      .select-child__avatar img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        object-fit: cover;
        border: 3px solid #ff922b;
      }

      .select-child__name {
        font-size: 1.5rem;
        font-weight: bold;
        color: #333;
        margin-bottom: 0.5rem;
      }

      .select-child__level {
        color: #ff922b;
        font-weight: 500;
      }
    `,
  ],
})
export class SelectChildComponent {
  children: Child[] = [
    {
      id: 1,
      name: 'Ana Paula',
      avatar: 'assets/img/image_perfil.jpeg',
      level: 3,
    },
    {
      id: 2,
      name: 'David',
      avatar: 'assets/img/image_perfil.jpeg',
      level: 2,
    },
  ];

  constructor(private router: Router) {
    console.log('SelectChildComponent initialized');
  }

  viewChildProfile(childId: number) {
    console.log('Navigating to child profile:', childId);
    this.router.navigate(['/child-profile', childId]);
  }
}
