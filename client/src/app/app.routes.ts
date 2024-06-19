import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MaterialRequestComponent } from './material-request/material-request.component';
import { AuthGuard } from './guards/auth.guard';
import { RegisterComponent } from './auth/register/register.component';
import { AdminComponent } from './admin/admin.component';

export const routes: Routes = [
  { path: '', redirectTo: '/my-material', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'my-material', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'material-request', component: MaterialRequestComponent, canActivate: [AuthGuard] },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/my-material' },
];
