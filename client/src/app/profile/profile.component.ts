import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { HeaderPostLoginComponent } from '../header-post-login/header-post-login.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  standalone: true,
  imports: [HeaderPostLoginComponent, CommonModule, ReactiveFormsModule]
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    currentPassword: ['', Validators.required],
    newPassword: [''],
    confirmPassword: ['']
  });

  message: string = '';

  constructor(private fb: FormBuilder, private apiService: ApiService, private router: Router) {}

  ngOnInit() {
    this.getUserProfile();
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('newPassword')?.value === form.get('confirmPassword')?.value ? null : { 'passwordMismatch': true };
  }

  getUserProfile() {
    this.apiService.get('users/profile').subscribe(
      (data: any) => {
        this.profileForm.patchValue(data);
      },
      error => {
        console.error('Erreur lors de la récupération du profil :', error);
      }
    );
  }

  updateProfile() {
    if (this.profileForm.invalid || this.profileForm.hasError('passwordMismatch')) {
      this.message = 'Veuillez vérifier les champs du formulaire.';
      return;
    }

    this.apiService.put('users/profile', {
      name: this.profileForm.get('name')?.value,
      email: this.profileForm.get('email')?.value,
      currentPassword: this.profileForm.get('currentPassword')?.value,
      newPassword: this.profileForm.get('newPassword')?.value
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
