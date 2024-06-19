import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderPostLoginComponent } from '../header-post-login/header-post-login.component';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

interface MaterialRequest {
  _id: string;
  type: string;
  user: string;
  status: string;
}

interface Material {
  _id: string;
  type: string;
  location: string;
  assignedTo?: string;
}

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderPostLoginComponent]
})
export class AdminComponent implements OnInit {
  materialRequests: MaterialRequest[] = [];
  materials: Material[] = [];
  filteredMaterialRequests: MaterialRequest[] = [];
  filteredMaterials: Material[] = [];
  filterType: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.getMaterialRequests();
    this.getMaterials();
  }

  getMaterialRequests() {
    this.http.get<MaterialRequest[]>('/api/assignmentRequests')
      .subscribe(requests => {
        this.materialRequests = requests;
        this.applyFilter();
      });
  }

  getMaterials() {
    this.http.get<Material[]>('/api/materials')
      .subscribe(materials => {
        this.materials = materials;
        this.applyFilter();
      });
  }

  applyFilter() {
    this.filteredMaterialRequests = this.materialRequests.filter(request =>
      request.type.toLowerCase().includes(this.filterType.toLowerCase())
    );

    this.filteredMaterials = this.materials.filter(material =>
      material.type.toLowerCase().includes(this.filterType.toLowerCase())
    );
  }

  approveRequest(request: MaterialRequest) {
    this.http.put(`/api/assignmentRequests/${request._id}`, { status: 'approved' })
      .subscribe(() => this.getMaterialRequests());
  }

  denyRequest(request: MaterialRequest) {
    this.http.put(`/api/assignmentRequests/${request._id}`, { status: 'denied' })
      .subscribe(() => this.getMaterialRequests());
  }

  removeMaterial(material: Material) {
    this.http.delete(`/api/materials/${material._id}`)
      .subscribe(() => this.getMaterials());
  }

  addMaterial() {
    // Logic for adding a new material (you might want to open a modal or a new form)
  }
}
