import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { UserTypeSelectionComponent } from './auth/user-type-selection/user-type-selection.component';

const routes: Routes = [
  { path: '', redirectTo: 'select-user-type', pathMatch: 'full' },
  { path: 'select-user-type', component: UserTypeSelectionComponent },
  { path: 'login', component: LoginComponent },
  // ... otras rutas existentes ...
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
