import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Utilizador } from '../models/Utilizador';
import { ProdutoFactura } from '../models/ProdutoFactura';
import { Cliente } from '../models/Cliente';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class DadosAdministradorService {

  private storageKey = 'dadosAdministrador';

  private utilizador: Utilizador | null = null;
  private produtosFatura: Array<ProdutoFactura> = [];
  private subTotal: number | null = null;
  private taxaIVA: number | null = null;
  private total: number | null = null;
  private troco: number | null = null;
  private opcaoImprimir: number | null = null;
  private cliente: Cliente | null = null;
  private numeroFactura: number | null = null;
  private tipoPagamento: string = "";

   constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.carregarDoLocalStorage();
  }

  private carregarDoLocalStorage() {
    if (isPlatformBrowser(this.platformId)) {
      const dados = localStorage.getItem('dadosAdministrador');
      if (dados) {
        const obj = JSON.parse(dados);
        this.utilizador = obj.utilizador ?? null;
        this.produtosFatura = obj.produtosFatura ?? [];
        this.subTotal = obj.subTotal ?? null;
        this.taxaIVA = obj.taxaIVA ?? null;
        this.total = obj.total ?? null;
        this.troco = obj.troco ?? null;
        this.opcaoImprimir = obj.opcaoImprimir ?? null;
        this.cliente = obj.cliente ?? null;
        this.numeroFactura = obj.numeroFactura ?? null;
        this.tipoPagamento = obj.tipoPagamento ?? "";
      }
    }
  }

  private salvarNoLocalStorage() {
    if (isPlatformBrowser(this.platformId)) {
      const obj = {
        utilizador: this.utilizador,
        produtosFatura: this.produtosFatura,
        subTotal: this.subTotal,
        taxaIVA: this.taxaIVA,
        total: this.total,
        troco: this.troco,
        opcaoImprimir: this.opcaoImprimir,
        cliente: this.cliente,
        numeroFactura: this.numeroFactura,
        tipoPagamento: this.tipoPagamento
      };
      localStorage.setItem('dadosAdministrador', JSON.stringify(obj));
    }
  }

  // 🔹 Métodos SETTERS que já salvam no localStorage
  setUtilizador(utilizador: Utilizador) {
    this.utilizador = utilizador;
    this.salvarNoLocalStorage();
  }

  setNumeroFactura(numeroFactura: number) {
    this.numeroFactura = numeroFactura;
    this.salvarNoLocalStorage();
  }

  setTipoPagamento(tp: string) {
    this.tipoPagamento = tp;
    this.salvarNoLocalStorage();
  }

  setCliente(cliente: Cliente) {
    this.cliente = cliente;
    this.salvarNoLocalStorage();
  }

  setProdutosFatura(produtosFatura: Array<ProdutoFactura>) {
    this.produtosFatura = produtosFatura;
    this.salvarNoLocalStorage();
  }

  setSubTotal(valor: number) {
    this.subTotal = valor;
    this.salvarNoLocalStorage();
  }

  setTaxaIVA(valor: number) {
    this.taxaIVA = valor;
    this.salvarNoLocalStorage();
  }

  setTotal(valor: number) {
    this.total = valor;
    this.salvarNoLocalStorage();
  }

  setOpcaoImprimir(valor: number) {
    this.opcaoImprimir = valor;
    this.salvarNoLocalStorage();
  }

  setTroco(valor: number) {
    this.troco = valor;
    this.salvarNoLocalStorage();
  }

  // 🔹 GETTERS normais (sem alteração)
  getUtilizador(): Utilizador | null {
    return this.utilizador;
  }

  getTipoPagamento(): string {
    return this.tipoPagamento;
  }

  getCliente(): Cliente | null {
    return this.cliente;
  }

  getUserName() {
    if (this.utilizador == null) {
      return "";
    } else {
      return this.utilizador.userName;
    }
  }

  getProdutosFatura(): Array<ProdutoFactura> | null {
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

  getOpcaoImprimir(): number | null {
    return this.opcaoImprimir;
  }

  getTroco(): number | null {
    return this.troco;
  }

  getNumeroFactura(): number | null {
    return this.numeroFactura;
  }

  // 🔹 Para limpar todos os dados
  limparDados() {
    localStorage.removeItem(this.storageKey);
    this.utilizador = null;
    this.produtosFatura = [];
    this.subTotal = null;
    this.taxaIVA = null;
    this.total = null;
    this.troco = null;
    this.opcaoImprimir = null;
    this.cliente = null;
    this.numeroFactura = null;
    this.tipoPagamento = "";
  }
}
