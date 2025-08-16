import { Injectable } from '@angular/core';
import { Utilizador } from '../models/Utilizador';
import { ProdutoFactura } from '../models/ProdutoFactura';
import { Cliente } from '../models/Cliente';

@Injectable({
  providedIn: 'root'
})
export class DadosAdministradorService {

  private utilizador : Utilizador | null = null;
  private produtosFatura : Array<ProdutoFactura> = [];
  private subTotal : number | null = null;
  private taxaIVA : number | null = null;
  private total : number | null = null;
  private troco : number | null = null;
  private opcaoImprimir : number | null = null; //0 - factura proforma , 1 - factura normal (a dinheiro) , 2 - factura normal (a cartão)
  private cliente : Cliente | null = null;
  private numeroFactura : number | null = null;
  private tipoPagamento : string = "";

  setUtilizador(utilizador: Utilizador) {
    this.utilizador = utilizador;
  }

  setNumeroFactura(numeroFactura : number) {
    this.numeroFactura = numeroFactura;
  }

  
  setTipoPagamento(tp : string) {
    this.tipoPagamento = tp;
  }

  setCliente(cliente: Cliente) {
    this.cliente = cliente;
  }

  getUtilizador(): Utilizador | null {
    return this.utilizador;
  }

  getTipoPagamento(): string {
    return this.tipoPagamento;
  }

  getCliente(): Cliente | null {
    return this.cliente;
  }

  getUserName(){
    if(this.utilizador == null){
      return "";
    }else{
      return this.utilizador.userName;
    }
  }

  setProdutosFatura(produtosFatura : Array<ProdutoFactura>){
    this.produtosFatura = produtosFatura;
  }

  getProdutosFatura() : Array<ProdutoFactura> | null{
    return this.produtosFatura;
  }

  getSubTotal(): number | null {
    return this.subTotal;
  }

  getTaxaIVA(): number | null {
    return this.taxaIVA;
  }

  getTotal(): number | null {
    return this.total;
  }

  getOpcaoImprimir() : number | null {
    return this.opcaoImprimir;
  }

  getTroco() : number | null {
    return this.troco;
  }

  getNumeroFactura() : number | null {
    return this.numeroFactura;
  }

  setSubTotal(valor : number) {
    this.subTotal = valor;
  }

  setTaxaIVA(valor : number) {
    this.taxaIVA = valor;
  }

  setTotal(valor : number) {
    this.total = valor;
  }

  setOpcaoImprimir(valor : number){
    this.opcaoImprimir = valor;
  }

  setTroco(valor : number){
    this.troco = valor;
  }

  

  constructor() { }

}



