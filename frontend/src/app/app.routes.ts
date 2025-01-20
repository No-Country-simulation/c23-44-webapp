import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { LayoutComponent } from './shared/components/layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./business/home/home.component').then((m) => m.HomeComponent),
        pathMatch: 'full',
      },
      {
        path: 'levels',
        loadComponent: () =>
          import('./business/levels/levels.component').then(
            (m) => m.LevelsComponent
          ),
      },
      {
        path: 'reading',
        loadComponent: () =>
          import('./business/reading/reading.component').then(
            (m) => m.ReadingComponent
          ),
      },
      {
        path: 'activities',
        loadComponent: () =>
          import('./business/activities/activities.component').then(
            (m) => m.ActivitiesComponent
          ),
      },
    ],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
