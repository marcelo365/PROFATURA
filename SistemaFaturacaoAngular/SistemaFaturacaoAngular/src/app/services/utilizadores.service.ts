import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Utilizador } from '../models/Utilizador';

@Injectable({
  providedIn: 'root'
})
export class UtilizadoresService {

  httpClient = inject(HttpClient);

  constructor() { }

  getUtilizadorByUsername(userName: string) {
    return this.httpClient.get<Utilizador>(`https://profatura.onrender.com/api/Utilizadores/GetUtilizadorByUserName?userName=${userName}`);
  }

  createUtilizador(utilizador: Utilizador) {
    return this.httpClient.post<boolean>(`https://profatura.onrender.com/api/Utilizadores/CreateUtilizador`, utilizador);
  }

  getUtilizador(id: number) {
    return this.httpClient.get<Utilizador>(`https://profatura.onrender.com/api/Utilizadores/GetUtilizador?id=${id}`);
  }

  getAllUtilizadores() {
    return this.httpClient.get<Array<Utilizador>>("https://profatura.onrender.com/api/Utilizadores/GetAllUtilizadores");
  }

  updateUtilizador(utilizador: Utilizador) {
    return this.httpClient.put<boolean>(`https://profatura.onrender.com/api/Utilizadores/UpdateUtilizador`, utilizador);
  }

  deleteUtilizador(id: number) {
    return this.httpClient.delete<boolean>(`https://profatura.onrender.com/api/Utilizadores/DeleteUtilizador?id=${id}`);
  }

  getFuncionarioComMaisReceita(){
    return this.httpClient.get<Utilizador>("https://profatura.onrender.com/api/Utilizadores/GetFuncionarioComMaisReceita");
  }

}
