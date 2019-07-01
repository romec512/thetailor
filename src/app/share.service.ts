import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShareService {
  private figures;
  constructor() { }
  setFigures(figures) {
    this.figures = figures;
  }
  getFigures() {
    return this.figures;
  }
}
