import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
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
    HeaderComponent
  ],
})
export class RegisterComponent {
  user = {
    name: '',
    email: '',
    password: '',
    role: '1'
  };

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    this.authService.register(this.user).subscribe(
      (res: { token: string; }) => {
        localStorage.setItem('token', res.token);
        this.router.navigate(['/profile']);
      },
      (err: any) => console.log(err)
    );
  }

  cancel() {
    this.router.navigate(['/login']);
  }
}
