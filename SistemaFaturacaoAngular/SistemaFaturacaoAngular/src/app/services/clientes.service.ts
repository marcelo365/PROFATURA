import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Cliente } from '../models/Cliente';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  httpClient = inject(HttpClient);

  constructor() { }

  createCliente(cliente: Cliente) {
    return this.httpClient.post<number>("https://profatura-ewi0.onrender.com/CreateCliente", cliente);
  }

  getClienteByTelemovel(telemovel: number) {
    return this.httpClient.get<Cliente>(`https://profatura-ewi0.onrender.com/GetClienteByTelemovel?telemovel=${telemovel}`);
  }

  getCliente(id: number) {
    return this.httpClient.get<Cliente>(`https://profatura-ewi0.onrender.com/GetCliente?id=${id}`);
  }

  getAllClientes() {
    return this.httpClient.get<Array<Cliente>>("https://profatura-ewi0.onrender.com/GetAllClientes");
  }

  updateCliente(cliente: Cliente) {
    return this.httpClient.put<boolean>("https://profatura-ewi0.onrender.com/UpdateCliente", cliente);
  }

  deleteCliente(id : number){
    return this.httpClient.delete<boolean>(`https://profatura-ewi0.onrender.com/DeleteCliente?id=${id}`);
  }

  getClienteComMaisReceita(){
    return this.httpClient.get<Cliente>("https://profatura-ewi0.onrender.com/GetClienteComMaisReceita");
  }

}
