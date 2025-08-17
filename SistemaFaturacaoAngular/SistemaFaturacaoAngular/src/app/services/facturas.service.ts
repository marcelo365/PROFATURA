import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Factura } from '../models/Factura';

@Injectable({
  providedIn: 'root'
})
export class FacturasService {

  httpClient = inject(HttpClient);

  constructor() { }

  createFactura(factura: Factura) {
    return this.httpClient.post<number>("https://profatura.onrender.com/CreateFactura", factura);
  }

  getAllFacturas() {
    return this.httpClient.get<Array<Factura>>("https://profatura.onrender.com/GetAllFacturas");
  }

  getFacturasByDataFactura(data1: string, data2: string) {
    return this.httpClient.get<Array<Factura>>(`https://profatura.onrender.com/GetFacturasByDataFactura?data1=${data1}&data2=${data2}`);
  }

  getFactura(id : number){
    return this.httpClient.get<Factura>(`https://profatura.onrender.com/GetFactura?id=${id}`);
  }

}
