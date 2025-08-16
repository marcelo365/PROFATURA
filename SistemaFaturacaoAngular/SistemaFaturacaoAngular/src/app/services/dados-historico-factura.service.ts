import { Injectable } from '@angular/core';
import { DadoHistoricoFactura } from '../models/DadoHistoricoFactura';

@Injectable({
  providedIn: 'root'
})
export class DadosHistoricoFacturaService {

  public dadosHistoricosFaturas : Array<DadoHistoricoFactura> = [];
  public administradorGerouNome : string = "";
  public administradorGerouBI : string = "";

  //facturas entre determinado período
  public dataComeco : string = "";
  public dataFim : string = "";
  //

  //relatorio de vendas por produto
  public quantidade : Array<Number> = [];
  public nomeProduto : string = "";
  public total : number | null = null;

  calcularTotal(){
    
    this.total = 0;

    for (const dado of this.dadosHistoricosFaturas){
      this.total += dado.total;
    }

    console.log("ok : ");
    console.log(this.total);

  }

  //

  //tipo de relatorio
  public tipoRelatorio : number | null = null; //0 se for historico de todas ,  1 - se for para facturas periodicas , 2 - relatorio de vendas por produto
  //
  

  constructor() { }
}
