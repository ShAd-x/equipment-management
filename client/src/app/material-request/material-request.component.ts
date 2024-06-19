import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderPostLoginComponent } from '../header-post-login/header-post-login.component';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../services/api.service';
import { Material } from '../models/material';

@Component({
  selector: 'app-material-request',
  templateUrl: './material-request.component.html',
  styleUrls: ['./material-request.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderPostLoginComponent]
})
export class MaterialRequestComponent implements OnInit {
  unassignedMaterials: Material[] = [];
  filteredMaterials: Material[] = [];
  filterType: string = '';

  constructor(private http: HttpClient, private router: Router, private apiService: ApiService) {}

  ngOnInit() {
    this.getUnassignedMaterials();
    this.applyFilter();
  }

  // Récupérer les matériels non assignés
  getUnassignedMaterials() {
    this.apiService.get<Material[]>('materials/unassigned')
      .subscribe(materials => {
        this.unassignedMaterials = materials;
        this.filteredMaterials = materials;
      });
  }

  requestMaterial(materialId: string) {
    this.apiService.post('assignment-requests', { materialId })
      .subscribe(
        response => {
          console.log('Material request created:', response);
          this.getUnassignedMaterials();
        },
        error => {
          console.error('Error creating material request:', error);
        }
      );
  }

  onRequestMaterial(material: Material) {
    if (material._id) {
      this.requestMaterial(material._id);
    }
  }

  // Filtrer les matériels non assignés par type
  applyFilter() {
    this.filteredMaterials = this.unassignedMaterials.filter(material =>
      material.type.toLowerCase().includes(this.filterType.toLowerCase())
    );
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
