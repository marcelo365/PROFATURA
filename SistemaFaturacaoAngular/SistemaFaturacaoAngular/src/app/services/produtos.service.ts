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
    return this.httpClient.get<Array<Produto>>("https://profatura.onrender.com/GetAllProdutos");
  }

  getProdutoByID(id : number){
    return this.httpClient.get<Produto>(`https://profatura.onrender.com/GetProdutoByID?id=${id}`);
  }

  getProdutoByNome(nome : string){
    return this.httpClient.get<Produto>(`https://profatura.onrender.com/GetProdutoByNome?nome=${nome}`); 
  }

  getProdutosByCategorias(categoria : string){
    return this.httpClient.get<Array<Produto>>(`https://profatura.onrender.com/GetProdutosByCategoria?categoria=${categoria}`);
  }

  createProduto(produto : Produto){
    return this.httpClient.post<boolean>("https://profatura.onrender.com/CreateProduto" , produto);
  }

  updateProduto(produto : Produto){
    return this.httpClient.put<boolean>("https://profatura.onrender.com/UpdateProduto" , produto);
  }

  deleteProduto(id : number){
    return this.httpClient.delete<boolean>(`https://profatura.onrender.com/DeleteProduto?id=${id}`);
  }

  getTop5ProdutosMaisVendidos(){
    return this.httpClient.get<Array<Produto>>("https://profatura.onrender.com/GettopCincoProdutosMaisVendidos");
  }


}
