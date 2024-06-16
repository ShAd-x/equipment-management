import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

interface Material {
  type: string;
  status: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  materials: Material[] = [];

  constructor(private authService: AuthService, private router: Router, private dashboardService: DashboardService) {}

  ngOnInit() {
    this.materials = this.dashboardService.getMaterials();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
