import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Ajoutez CommonModule
import { HeaderComponent } from '../../header/header.component'; // Importez HeaderComponent

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [
    FormsModule,
    CommonModule, // Ajoutez CommonModule ici
    HeaderComponent // Ajoutez HeaderComponent ici
  ],
})
export class LoginComponent {
  user = {
    email: '',
    password: ''
  };

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.user).subscribe(
      (res: { token: string; }) => {
        localStorage.setItem('token', res.token);
        this.router.navigate(['/profile']);
      },
      (err: any) => console.log(err)
    );
  }
}
