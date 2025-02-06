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
      {
        path: 'profile',
        loadComponent: () =>
          import('./pages/profile/profile.component').then(
            (m) => m.ProfileComponent
          ),
      },
      {
        path: 'select-child',
        loadComponent: () =>
          import('./pages/select-child/select-child.component').then(
            (m) => m.SelectChildComponent
          ),
      },
      {
        path: 'child-profile/:id',
        loadComponent: () =>
          import('./pages/child-profile/child-profile.component').then(
            (m) => m.ChildProfileComponent
          ),
      },
      {
        path: 'settings',
        loadComponent: () =>
          import('./pages/settings/settings.component').then(
            (m) => m.SettingsComponent
          ),
      },
      {
        path: 'pronunciation-practice',
        loadComponent: () =>
          import(
            './business/pronunciation-practice/pronunciation-practice.component'
          ).then((m) => m.ReadingPracticeComponent),
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
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
