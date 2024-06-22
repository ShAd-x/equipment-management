import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { HeaderPostLoginComponent } from '../header-post-login/header-post-login.component';
import { User } from '../models/user';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  standalone: true,
  imports: [HeaderPostLoginComponent, FormsModule, CommonModule]
})
export class ProfileComponent implements OnInit {
  user: User = {
    name: '',
    email: '',
    password: '',
    role: ''
  };
  newPassword: string = '';
  confirmPassword: string = '';
  message: string = '';

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit() {
    this.getUserProfile();
  }

  getUserProfile() {
    this.apiService.get('users/profile').subscribe(
      (data: any) => {
        this.user = data;
      },
      error => {
        console.error('Erreur lors de la récupération du profil :', error);
      }
    );
  }

  updateProfile() {
    if (this.newPassword && this.newPassword !== this.confirmPassword) {
      this.message = 'Les nouveaux mots de passe ne correspondent pas.';
      return;
    }

    this.apiService.put('users/profile', {
      name: this.user.name,
      email: this.user.email,
      currentPassword: this.user.password,
      newPassword: this.newPassword
    }).subscribe(
      () => {
        this.message = 'Profil mis à jour avec succès.';
        this.router.navigate(['/profile']);
      },
      error => {
        this.message = 'Erreur lors de la mise à jour du profil : ' + error.error.message;
      }
    );
  }

  cancel() {
    this.router.navigate(['/']); // Modifier cette ligne selon votre logique de navigation
  }
}
