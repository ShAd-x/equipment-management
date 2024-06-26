import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderPostLoginComponent } from '../header-post-login/header-post-login.component';
import { Material } from '../models/material';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderPostLoginComponent]
})
export class DashboardComponent implements OnInit {
  materials: Material[] = [];
  assignedMaterials: Material[] = [];
  filteredMaterials: Material[] = [];
  filterType: string = '';
  newRoom: string = '';
  selectedMaterial: Material | null = null;

  constructor(private authService: AuthService, private router: Router, private apiService: ApiService) {}

  ngOnInit() {
    this.getAssignedMaterials();
    this.applyFilter();
  }

  getAssignedMaterials() {
    this.apiService.get<Material[]>('materials/assigned')
      .subscribe(materials => {
        this.assignedMaterials = materials;
        this.applyFilter();
      });
  }

  returnMaterial(materialId: string) {
    this.apiService.put<Material>(`materials/return/${materialId}`, {}).subscribe(
      () => {
        this.getAssignedMaterials();
      },
      error => {
        console.error('Erreur lors du retour du matériel :', error);
      }
    );
  }

  updateMaterialRoom(materialId: string) {
    if (this.newRoom) {
      var salle: string = this.newRoom;
      this.apiService.put<Material>(`materials/update-room/${materialId}`, { salle }).subscribe(
        () => {
          this.getAssignedMaterials();
          this.selectedMaterial = null;
          this.newRoom = '';
        },
        error => {
          console.error('Erreur lors de la mise à jour de la salle :', error);
        }
      );
    }
  }

  applyFilter() {
    this.filteredMaterials = this.assignedMaterials.filter(material =>
      material.type.toLowerCase().includes(this.filterType.toLowerCase())
    );
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  requestMaterial() {
    this.router.navigate(['/material-request']);
  }

  removeMaterial(materialId?: string) {
    if (materialId) {
      this.apiService.delete(`materials/${materialId}`)
        .subscribe(() => {
          this.getAssignedMaterials();
        });
    }
  }
}
