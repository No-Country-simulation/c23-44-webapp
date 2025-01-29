import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  imageLoaded = false;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    const img = new Image();
    img.src = 'assets/img/img_header_home.png';
    img.onload = () => {
      this.imageLoaded = true;
      this.cdr.detectChanges(); // Forzar la detección de cambios
    };
  }
}
