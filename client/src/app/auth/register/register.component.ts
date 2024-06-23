import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../header/header.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss', '../../app.component.scss'],
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    HeaderComponent
  ],
})
export class RegisterComponent {
  registerForm: FormGroup;
  registerError: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['', Validators.required]
    });
  }

  register() {
    if (this.registerForm.invalid) {
      this.registerError = 'Veuillez remplir tous les champs correctement.';
      return;
    }

    this.authService.register(this.registerForm.value).subscribe(
      () => {
        this.router.navigate(['/login']);
      },
      (err: any) => {
        this.registerError = 'Erreur d\'enregistrement : ' + err.error.message;
      }
    );
  }

  cancel() {
    this.router.navigate(['/login']);
  }
}
