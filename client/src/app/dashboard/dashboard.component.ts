import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';

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

  constructor(private dashboardService: DashboardService) {}

  ngOnInit() {
    this.materials = this.dashboardService.getMaterials();
  }
}
