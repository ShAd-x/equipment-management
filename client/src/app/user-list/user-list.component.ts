import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { User } from '../models/user';
import { HeaderPostLoginComponent } from "../header-post-login/header-post-login.component";
import { CommonModule } from '@angular/common';
import { Role } from '../models/Role';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    HeaderPostLoginComponent
  ]
})
export class UserListComponent implements OnInit {
  users: User[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.apiService.get<User[]>('users').subscribe(
      (data) => {
        this.users = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des utilisateurs :', error);
      }
    );
  }

  deleteUser(userId: string): void {
    if (confirm('Voulez-vous vraiment supprimer cet utilisateur?')) {
      this.apiService.delete(`users/${userId}`).subscribe(
        () => {
          this.users = this.users.filter(user => user._id !== userId);
        },
        (error) => {
          console.error('Erreur lors de la suppression de l\'utilisateur :', error);
        }
      );
    }
  }

  getRoleName(role: number): string {
    return Role[role];
  }
}
