import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MyMaterialComponent } from './my-material/my-material.component';
import { MaterialRequestComponent } from './material-request/material-request.component';
import { AuthGuard } from './guards/auth.guard';
import { RegisterComponent } from './auth/register/register.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'my-material', component: MyMaterialComponent, canActivate: [AuthGuard] },
  { path: 'material-request', component: MaterialRequestComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' },
];
