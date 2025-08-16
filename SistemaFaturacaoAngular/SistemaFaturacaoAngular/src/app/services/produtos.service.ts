import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Produto } from '../models/Produto';

@Injectable({
  providedIn: 'root'
})
export class ProdutosService {

  httpClient = inject(HttpClient);

  constructor() { }

  getAllProdutos(){
    return this.httpClient.get<Array<Produto>>("https://localhost:7192/GetAllProdutos");
  }

  getProdutoByID(id : number){
    return this.httpClient.get<Produto>(`https://localhost:7192/GetProdutoByID?id=${id}`);
  }

  getProdutoByNome(nome : string){
    return this.httpClient.get<Produto>(`https://localhost:7192/GetProdutoByNome?nome=${nome}`); 
  }

  getProdutosByCategorias(categoria : string){
    return this.httpClient.get<Array<Produto>>(`https://localhost:7192/GetProdutosByCategoria?categoria=${categoria}`);
  }

  createProduto(produto : Produto){
    return this.httpClient.post<boolean>("https://localhost:7192/CreateProduto" , produto);
  }

  updateProduto(produto : Produto){
    return this.httpClient.put<boolean>("https://localhost:7192/UpdateProduto" , produto);
  }

  deleteProduto(id : number){
    return this.httpClient.delete<boolean>(`https://localhost:7192/DeleteProduto?id=${id}`);
  }

  getTop5ProdutosMaisVendidos(){
    return this.httpClient.get<Array<Produto>>("https://localhost:7192/GettopCincoProdutosMaisVendidos");
  }


}
