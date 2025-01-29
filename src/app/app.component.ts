import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthHeaderComponent } from './shared/components/auth-header/auth-header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AuthHeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'site-to-learn';
}
