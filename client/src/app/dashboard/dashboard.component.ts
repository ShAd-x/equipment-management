import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderPostLoginComponent } from '../header-post-login/header-post-login.component';

interface Material {
  type: string;
  status: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderPostLoginComponent]
})
export class DashboardComponent implements OnInit {
  materials: Material[] = [];
  filteredMaterials: Material[] = [];
  filterType: string = '';

  constructor(private authService: AuthService, private router: Router, private dashboardService: DashboardService) {}

  ngOnInit() {
    this.materials = this.dashboardService.getMaterials();
    this.applyFilter();
  }

  applyFilter() {
    this.filteredMaterials = this.materials.filter(material =>
      material.type.toLowerCase().includes(this.filterType.toLowerCase())
    );
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  redirectToMaterialRequest() {
    this.router.navigate(['/material-request']);
  }
}
