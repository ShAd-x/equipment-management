import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  constructor() {}

  getMaterials() {
    return [
      { type: 'Table', status: 'Attribué' },
      { type: 'Ordinateur portable', status: 'Attribué' },
      { type: 'Routeur internet', status: 'Attribué' }
    ];
  }
}
