import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { FacturaProduto } from '../models/FacturaProduto';

@Injectable({
  providedIn: 'root'
})
export class FacturasProdutosService {

  httpClient = inject(HttpClient);

  constructor() { }
  createFacturaProduto(facturaProduto : FacturaProduto){
    return this.httpClient.post<boolean>("https://profatura.onrender.com/CreateFacturaProduto" , facturaProduto);
  }

  getFacturasProdutosByProduto(id : number){
    return this.httpClient.get<Array<FacturaProduto>>(`https://profatura.onrender.com/GetFacturasProdutosByProduto?id=${id}`);
  }

}
