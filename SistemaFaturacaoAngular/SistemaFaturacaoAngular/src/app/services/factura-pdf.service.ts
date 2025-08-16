import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FacturaPDFService {

  private facturaHTML: HTMLElement | null = null;

  constructor() { }

  setFacturaHTML(facturaHTML: HTMLElement | null) {
    this.facturaHTML = facturaHTML;
  }

  getFacturaHTML(): HTMLElement | null {
    return this.facturaHTML;
  }


}
