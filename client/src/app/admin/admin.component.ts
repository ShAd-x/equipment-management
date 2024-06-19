import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderPostLoginComponent } from '../header-post-login/header-post-login.component';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AssignmentRequest } from '../models/assignmentRequest';
import { Material } from '../models/material';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderPostLoginComponent]
})
export class AdminComponent implements OnInit {
  materialRequests: AssignmentRequest[] = [];
  materials: Material[] = [];
  filteredMaterialRequests: AssignmentRequest[] = [];
  filteredMaterials: Material[] = [];
  filterType: string = '';

  newMaterial: Material = {
    type: '',
    organisation: false,
    salle: '',
    utilisePar: undefined
  };

  constructor(private http: HttpClient, private router: Router, private apiService: ApiService) {}

  ngOnInit() {
    this.getMaterialRequests();
    this.getMaterials();
  }

  getMaterialRequests() {
    this.apiService.get<AssignmentRequest[]>('assignment-requests/pending')
      .subscribe(requests => {
        this.materialRequests = requests;
        this.filteredMaterialRequests = requests;
        console.log(requests);
      });
  }

  getMaterials() {
    this.apiService.get<Material[]>(`materials`)
      .subscribe(materials => {
        this.materials = materials;
        this.filteredMaterials = materials;
      });
  }

  applyFilter() {
    this.filteredMaterialRequests = this.materialRequests.filter(request =>
      request.material.type.toLowerCase().includes(this.filterType.toLowerCase())
    );

    this.filteredMaterials = this.materials.filter(material =>
      material.type.toLowerCase().includes(this.filterType.toLowerCase())
    );
  }

  approveRequest(requestId: string | undefined) {
    this.apiService.put(`assignment-requests/${requestId}/approve`, {})
      .subscribe(() => this.getMaterialRequests());
  }

  denyRequest(requestId: string | undefined) {
    this.apiService.put(`assignment-requests/${requestId}/deny`, {})
      .subscribe(() => this.getMaterialRequests());
  }

  removeMaterial(material: Material) {
    this.apiService.delete(`materials/${material._id}`)
      .subscribe(() => this.getMaterials());
  }

  addMaterial() {
    this.apiService.post(`materials/`, this.newMaterial)
      .subscribe(() => {
        this.getMaterials();
        this.newMaterial = {
          type: '',
          salle: '',
          organisation: false,
          utilisePar: undefined
        };
      });
  }
}
