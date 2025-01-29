import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-levels',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './levels.component.html',
  styleUrl: './levels.component.scss',
})
export class LevelsComponent {
  levels = [
    { name: 'Primera Infancia', color: '#FF6B6B', imagePosition: 'top' },
    { name: '1° año', color: '#FFA94D', imagePosition: 'bottom' },
    { name: '2° año', color: '#4DABF7', imagePosition: 'right' },
    { name: '3° año', color: '#FFD43B', imagePosition: 'left' },
    { name: '4° año', color: '#BE4BDB', imagePosition: 'bottom-right' },
    { name: '5° año', color: '#51CF66', imagePosition: 'right' },
  ];

  categories = [
    { name: 'Niños', color: '#FFA94D' },
    { name: 'Adolescentes', color: '#FF6B6B' },
    { name: 'Adulto', color: '#20C997' },
  ];
}
