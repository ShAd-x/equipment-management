import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header-post-login',
  templateUrl: './header-post-login.component.html',
  styleUrls: ['./header-post-login.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class HeaderPostLoginComponent {
  constructor(private authService: AuthService, private router: Router) {}

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
