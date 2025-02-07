import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { LayoutComponent } from './shared/components/layout/layout.component';
import { StudentFormComponent } from './crud/student/student-form/student-form.component';
import { AuthGuard } from './auth.guard';

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
        path: 'profile/:id',
        loadComponent: () =>
          import('./pages/profile/profile.component').then(
            (m) => m.ProfileComponent
          ),
          canActivate: [AuthGuard], // Proteger la ruta
      },
    
  { 
    path: 'createStudent',
    loadComponent: () => 
      import('./crud/student/student-form/student-form.component').then(
        (m) => m.StudentFormComponent
      ),
      canActivate: [AuthGuard], // Proteger la ruta
  },
  { path: 'student/edit/:id', component: StudentFormComponent },
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
          canActivate: [AuthGuard], // Proteger la ruta
      },
      {
        path: 'settings',
        loadComponent: () =>
          import('./pages/settings/settings.component').then(
            (m) => m.SettingsComponent
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
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
