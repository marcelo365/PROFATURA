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
    return this.httpClient.post<number>("https://localhost:7192/CreateCliente", cliente);
  }

  getClienteByTelemovel(telemovel: number) {
    return this.httpClient.get<Cliente>(`https://localhost:7192/GetClienteByTelemovel?telemovel=${telemovel}`);
  }

  getCliente(id: number) {
    return this.httpClient.get<Cliente>(`https://localhost:7192/GetCliente?id=${id}`);
  }

  getAllClientes() {
    return this.httpClient.get<Array<Cliente>>("https://localhost:7192/GetAllClientes");
  }

  updateCliente(cliente: Cliente) {
    return this.httpClient.put<boolean>("https://localhost:7192/UpdateCliente", cliente);
  }

  deleteCliente(id : number){
    return this.httpClient.delete<boolean>(`https://localhost:7192/DeleteCliente?id=${id}`);
  }

  getClienteComMaisReceita(){
    return this.httpClient.get<Cliente>("https://localhost:7192/GetClienteComMaisReceita");
  }

}
