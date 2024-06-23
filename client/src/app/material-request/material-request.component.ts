import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { Material } from '../models/material';
import { HeaderPostLoginComponent } from '../header-post-login/header-post-login.component';

@Component({
  selector: 'app-material-request',
  templateUrl: './material-request.component.html',
  styleUrls: ['./material-request.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderPostLoginComponent]
})
export class MaterialRequestComponent implements OnInit {
  materials: Material[] = [];
  filteredMaterials: Material[] = [];
  filterType: string = '';

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit() {
    this.getMaterials();
  }

  getMaterials() {
    this.apiService.get<Material[]>('materials/unassigned')
      .subscribe(materials => {
        this.materials = materials;
        this.filteredMaterials = materials;
      });
  }

  applyFilter() {
    this.filteredMaterials = this.materials.filter(material =>
      material.type.toLowerCase().includes(this.filterType.toLowerCase())
    );
  }

  requestMaterial(materialId?: string) {
    if (materialId) {
      this.apiService.post('assignment-requests', { materialId })
        .subscribe(() => {
          this.getMaterials();
        });
    }
  }

  goBack() {
    this.router.navigate(['/dashboard']);
  }
}
