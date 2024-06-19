import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderPostLoginComponent } from '../header-post-login/header-post-login.component';
import { Router } from '@angular/router';

interface Material {
  type: string;
  location: string;
}

@Component({
  selector: 'app-material-request',
  templateUrl: './material-request.component.html',
  styleUrls: ['./material-request.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderPostLoginComponent]
})
export class MaterialRequestComponent implements OnInit {
  materials: Material[] = [
    { type: 'Table', location: 'Stocké en A110' },
    { type: 'Ordinateur portable', location: 'Stocké en A112' },
    { type: 'Routeur internet', location: 'Stocké en A114' }
  ];
  filteredMaterials: Material[] = [];
  filterType: string = '';

  constructor(private router: Router) {}

  ngOnInit() {
    this.applyFilter();
  }

  applyFilter() {
    this.filteredMaterials = this.materials.filter(material =>
      material.type.toLowerCase().includes(this.filterType.toLowerCase())
    );
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
