import { InvokeFunctionExpr } from '@angular/compiler';
import { ChangeDetectorRef, Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ProdutosService } from '../../services/produtos.service';
import { Produto } from '../../models/Produto';
import { CommonModule } from '@angular/common';
import { DadosAdministradorService } from '../../services/dados-administrador.service';
import { ProdutoFactura } from '../../models/ProdutoFactura';
import { parse } from 'path';
import { subscribe } from 'diagnostics_channel';
import { UtilizadoresService } from '../../services/utilizadores.service';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import * as jspdf from 'jspdf';
import { FacturaPDFService } from '../../services/factura-pdf.service';
import { Resolver } from 'dns';
import { FacturaPDFComponent } from '../factura-pdf/factura-pdf.component';
import { FacturasService } from '../../services/facturas.service';
import { FacturasProdutosService } from '../../services/facturas-produtos.service';
import { Factura } from '../../models/Factura';
import { FacturaProduto } from '../../models/FacturaProduto';
import { ClientesService } from '../../services/clientes.service';
import { Cliente } from '../../models/Cliente';
import { Utilizador } from '../../models/Utilizador';

@Component({
  selector: 'app-usuario-normal',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './usuario-normal.component.html',
  styleUrl: './usuario-normal.component.scss'
})
export class UsuarioNormalComponent implements OnInit {

  //injecções de dependência
  produtosServices = inject(ProdutosService);
  utilizadoresServices = inject(UtilizadoresService);
  dadosAdministrador = inject(DadosAdministradorService);
  facturaPDFServices = inject(FacturaPDFService);
  facturasServices = inject(FacturasService);
  facturasProdutosServices = inject(FacturasProdutosService);
  clientesServices = inject(ClientesService);
  router = inject(Router);
  cr = inject(ChangeDetectorRef);
  //

  userName: string = this.dadosAdministrador.getUserName();
  abaSeleccionada: string = "gerarFacturas";

  //visualizar Produtos
  produtosDisponiveis: Array<Produto> = [];
  produtosVisualizar: Array<Produto> = [];
  procurarProdutoInput: string = "";
  //

  //factura
  produtosFactura: Array<ProdutoFactura> = [];
  subtotalProdutos: number | null = 0;
  taxaIVA: number | null = 0;
  totalProdutos: number | null = 0;
  listaApagar: Array<ProdutoFactura> = [];
  //

  //autenticação para remover produto
  userNameAdmn: string = "";
  senhaAdmn: string = "";
  //

  //autenticação de cliente
  telemovelCliente: number | null = null;
  nomeCliente: string = "";
  clienteCriado: Cliente | null = null;
  //

  //alterar senha
  senhaActual: string = "";
  novaSenha: string = "";
  confirmacaoSenha: string = "";
  utilizadorCriado: Utilizador | null = null;
  //

  //variaveis de uso geral
  produtoApanhado: Produto | null = null;
  produtoFatura: ProdutoFactura | null = null;
  quantiaPagamentoDinheiro: number | null = null;
  facturaCriada: Factura | null = null;
  facturaProdutoCriada: FacturaProduto | null = null;
  numeroFatura: number | null = null;
  //


  constructor() {
  }

  ngOnInit(): void {
    this.produtosServices.getAllProdutos().subscribe(res => {
      this.produtosDisponiveis = res;
      this.produtosVisualizar = res;
    });
  }

  inicializar() {
    this.resetarListaProdutos();
    this.procurarProdutoInput = "";
  }

  irAlterarSenha() {
    this.abaSeleccionada = "alterarSenha";
    var bodyVisualizarProdutos = document.getElementsByClassName("bodyVisualizarProdutos")[0];
    var factura = document.getElementsByClassName("factura")[0];
    var alterarSenha = document.getElementsByClassName("alterarSenha")[0];
    var form = document.getElementsByClassName("form")[0];
    var opcoesPagamento = document.getElementsByClassName("opcoesPagamento")[0];
    var pagamentoDinheiro = document.getElementsByClassName("pagamentoDinheiro")[0];
    var autenticarCliente = document.getElementsByClassName("autenticarCliente")[0];
    var cadastrarCliente = document.getElementsByClassName("cadastrarCliente")[0];




    bodyVisualizarProdutos.classList.add("ocultar");
    factura.classList.add("ocultar");
    alterarSenha.classList.remove("ocultar");
    form.classList.add("ocultar");
    opcoesPagamento.classList.add("ocultar");
    pagamentoDinheiro.classList.add("ocultar");
    autenticarCliente.classList.add("ocultar");
    cadastrarCliente.classList.add("ocultar");

  }

  irGerarFacturas() {
    this.abaSeleccionada = "gerarFacturas";

    var bodyVisualizarProdutos = document.getElementsByClassName("bodyVisualizarProdutos")[0];
    var factura = document.getElementsByClassName("factura")[0];
    var alterarSenha = document.getElementsByClassName("alterarSenha")[0];
    var form = document.getElementsByClassName("form")[0];
    var opcoesPagamento = document.getElementsByClassName("opcoesPagamento")[0];
    var pagamentoDinheiro = document.getElementsByClassName("pagamentoDinheiro")[0];
    var autenticarCliente = document.getElementsByClassName("autenticarCliente")[0];
    var cadastrarCliente = document.getElementsByClassName("cadastrarCliente")[0];


    bodyVisualizarProdutos.classList.remove("ocultar");
    factura.classList.remove("ocultar");
    alterarSenha.classList.add("ocultar");
    form.classList.add("ocultar");
    opcoesPagamento.classList.add("ocultar");
    pagamentoDinheiro.classList.add("ocultar");
    autenticarCliente.classList.add("ocultar");
    cadastrarCliente.classList.add("ocultar");

  }






  resetarListaProdutos() {
    //this.produtosDisponiveis = [];
    this.produtosVisualizar = this.produtosDisponiveis;
  }

  resetarProdutosVisualizar() {
    this.produtosVisualizar = [];
  }

  customParseInt(value: string): number {
    const isNumeric = /^\d+$/.test(value);
    return isNumeric ? parseInt(value, 10) : NaN;
  }

  fazerPesquisa() {
    var jaEncontrado = false;

    if (!(this.procurarProdutoInput == "")) {

      if (isNaN(this.customParseInt(this.procurarProdutoInput))) {

        this.produtosDisponiveis.forEach(produto => {
          if (produto.nome == this.procurarProdutoInput) {
            this.resetarProdutosVisualizar();
            this.produtosVisualizar.push(produto);
            jaEncontrado = true;
          }
        });

        if (!jaEncontrado) {
          this.resetarProdutosVisualizar();
          this.produtosDisponiveis.forEach(produto => {
            if (produto.categoria == this.procurarProdutoInput) {
              this.produtosVisualizar.push(produto);
              jaEncontrado = true;
            }
          });
        }

        if (!jaEncontrado) {
          alert("Produtos(s) não Encontrado(s)");
          this.resetarListaProdutos();
        }

      } else {

        this.produtosDisponiveis.forEach(produto => {
          if (produto.produtoID == parseInt(this.procurarProdutoInput)) {
            this.resetarProdutosVisualizar();
            this.produtosVisualizar.push(produto);
            jaEncontrado = true;
          }

        });

        if (!jaEncontrado) {
          alert("Produtos(s) não Encontrado(s)");
          this.resetarListaProdutos();
        }

      }

    }
  }

  adicionarProdutoFactura(id: number) {

    this.produtosDisponiveis.forEach(produto => {
      if (produto.produtoID == id) {
        this.produtoApanhado = produto;
      }
    });

    if (this.produtoApanhado) {

      if (this.produtoApanhado.quantidadeEmEstoque == 0) {
        alert("Este Produto não possui nenhum stock de momento\n");
      } else {

        var jaAdicionado = false;

        this.produtosFactura.forEach(produtoFactura => {
          if (produtoFactura.nome == this.produtoApanhado?.nome) {
            produtoFactura.quantidade++;
            produtoFactura.subtotal = produtoFactura.quantidade * produtoFactura.preco;
            jaAdicionado = true;
          }
        });

        if (!jaAdicionado) {
          this.produtoFatura = {
            nome: this.produtoApanhado.nome,
            preco: this.produtoApanhado.preco,
            quantidade: 1,
            subtotal: this.produtoApanhado.preco
          }

          this.produtosFactura.push(this.produtoFatura);
        }

        this.atualizarSubTotalAPagar();

        this.produtoApanhado.quantidadeEmEstoque--;
        this.produtoApanhado.activo = (this.produtoApanhado.quantidadeEmEstoque == 0) ? false : true;

        //atualizar produtos visualizar e atualizar produtos disponiveis
        this.produtosVisualizar.forEach(produto => {
          if (produto.produtoID == this.produtoApanhado?.produtoID) {
            produto.quantidadeEmEstoque = this.produtoApanhado.quantidadeEmEstoque;
            produto.activo = this.produtoApanhado.activo;
          }
        });

        this.produtosDisponiveis.forEach(produto => {
          if (produto.produtoID == this.produtoApanhado?.produtoID) {
            produto.quantidadeEmEstoque = this.produtoApanhado.quantidadeEmEstoque;
            produto.activo = this.produtoApanhado.activo;
          }
        });
        //

        console.log(this.produtosDisponiveis);
        console.log(this.produtosVisualizar);

      }


    }


  }

  atualizarSubTotalAPagar() {
    this.subtotalProdutos = 0;

    this.produtosFactura.forEach(produtoFactura => {
      if (this.subtotalProdutos != null) {
        this.subtotalProdutos += produtoFactura.subtotal;
      }
    });

    this.taxaIVA = (this.subtotalProdutos * 0.14);
    this.totalProdutos = this.subtotalProdutos + this.taxaIVA;

    this.taxaIVA = parseFloat(this.taxaIVA.toFixed(2));
    this.totalProdutos = parseFloat(this.totalProdutos.toFixed(2));
    this.subtotalProdutos = parseFloat(this.subtotalProdutos.toFixed(2));
  }

  eliminarProdutoFactura(nomeProdutoFactura: string) {
    var listaApagarElement1 = document.getElementsByClassName("listaApagar")[0];
    var btnApagar = document.getElementsByClassName("btnApagar")[0];

    if ((listaApagarElement1.classList.contains("ocultar")) && (btnApagar.classList.contains("ocultar"))) {
      listaApagarElement1.classList.remove("ocultar");
      btnApagar.classList.remove("ocultar");
    }

    this.produtosFactura.forEach(produtoFactura => {
      if (produtoFactura.nome == nomeProdutoFactura) {
        this.produtoFatura = produtoFactura;
      }
    });

    if (this.produtoFatura) {

      if (!this.listaApagar.includes(this.produtoFatura)) {
        this.listaApagar.push(this.produtoFatura);
      }
    }
  }

  retornarEliminarProdutoFactura(nomeProdutoFactura: string) {

    this.listaApagar.forEach(produtoFactura => {
      if (produtoFactura.nome == nomeProdutoFactura) {
        this.produtoFatura = produtoFactura;
      }
    });

    if (this.produtoFatura) {
      this.listaApagar.splice(this.listaApagar.indexOf(this.produtoFatura), 1);
    }

    if (this.listaApagar.length == 0) {
      var listaApagarElement1 = document.getElementsByClassName("listaApagar")[0];
      var btnApagar = document.getElementsByClassName("btnApagar")[0];

      listaApagarElement1.classList.add("ocultar");
      btnApagar.classList.add("ocultar");
    }
  }

  efectuarRemocaoProdutosFactura() {
    var factura = document.getElementsByClassName("factura")[0];
    var form = document.getElementsByClassName("form")[0];

    factura.classList.add("ocultar");
    form.classList.remove("ocultar");
  }

  autenticarRemocao() {

    if (this.userNameAdmn == "") {
      alert("Campo Vazio , Porfavor Digite o seu Username\n");
      return;
    } else if (this.senhaAdmn == "") {
      alert("Campo Vazio , Porfavor Digite a sua Senha\n");
      return;
    }

    this.utilizadoresServices.getUtilizadorByUsername(this.userNameAdmn).subscribe(res => {

      if (res.senha == this.senhaAdmn) {
        if (res.tipo == 1) {

          this.listaApagar.forEach(prodFactApagar => {
            let produtoFatura = this.produtosFactura.find(produtoFactura => produtoFactura.nome == prodFactApagar.nome);

            if (produtoFatura) {

              //atualizar produtos visualizar e atualizar produtos disponiveis
              var produtoVisualizar = this.produtosVisualizar.find(produto => produto.nome == produtoFatura.nome);
              if (produtoVisualizar) {
                console.log(produtoFatura.quantidade);
                produtoVisualizar.quantidadeEmEstoque += (produtoFatura.quantidade / 2);
              }

              var produtoDisponivel = this.produtosDisponiveis.find(produto => produto.nome == produtoFatura.nome);
              if (produtoDisponivel) {
                produtoDisponivel.quantidadeEmEstoque += (produtoFatura.quantidade / 2);

              }


              this.produtosFactura.splice(this.produtosFactura.indexOf(produtoFatura), 1);
            }
            //
          });

          //apagar a lista de apagar
          this.listaApagar = [];
          //

          alert("Remoção de Produtos na Factura feita com Sucesso\n");
          this.senhaAdmn = "";
          this.userNameAdmn = "";
          this.voltarFactura();

          //
          var listaApagarElement1 = document.getElementsByClassName("listaApagar")[0];
          var btnApagar = document.getElementsByClassName("btnApagar")[0];

          listaApagarElement1.classList.add("ocultar");
          btnApagar.classList.add("ocultar");
          this.atualizarSubTotalAPagar();
          //

        } else {
          alert("Conta Pertencente a um Funcionário");
        }

      } else {
        alert("Senha Incorrecta\n");
      }

    },
      err => {
        if (err.status == 404) {
          alert("Username Não Encontrado");
        }
      }
    );

  }


  voltarAutenticarCliente() {
    var autenticarCliente = document.getElementsByClassName("autenticarCliente")[0];
    var cadastrarCliente = document.getElementsByClassName("cadastrarCliente")[0];

    autenticarCliente.classList.remove("ocultar");
    cadastrarCliente.classList.add("ocultar");
  }

  irCadastrarCliente() {
    var autenticarCliente = document.getElementsByClassName("autenticarCliente")[0];
    var cadastrarCliente = document.getElementsByClassName("cadastrarCliente")[0];

    autenticarCliente.classList.add("ocultar");
    cadastrarCliente.classList.remove("ocultar");
  }

  voltarCadastrarCliente() {
    var autenticarCliente = document.getElementsByClassName("autenticarCliente")[0];
    var cadastrarCliente = document.getElementsByClassName("cadastrarCliente")[0];

    autenticarCliente.classList.remove("ocultar");
    cadastrarCliente.classList.add("ocultar");
  }

  voltarFactura() {
    var factura = document.getElementsByClassName("factura")[0];
    var form = document.getElementsByClassName("form")[0];

    factura.classList.remove("ocultar");
    form.classList.add("ocultar");
  }

  voltarFacturaCliente() {
    var factura = document.getElementsByClassName("factura")[0];
    var bodyVisualizarProdutos = document.getElementsByClassName("bodyVisualizarProdutos")[0];
    var autenticarCliente = document.getElementsByClassName("autenticarCliente")[0];

    factura.classList.remove("ocultar");
    bodyVisualizarProdutos.classList.remove("ocultar");
    autenticarCliente.classList.add("ocultar");
  }



  irPagar() { //ir para opcoesPagamento
    var autenticarCliente = document.getElementsByClassName("autenticarCliente")[0];
    var opcoesPagamento = document.getElementsByClassName("opcoesPagamento")[0];

    opcoesPagamento.classList.remove("ocultar");
    autenticarCliente.classList.add("ocultar");
  }

  irAutenticarCliente() {
    var factura = document.getElementsByClassName("factura")[0];
    var bodyVisualizarProdutos = document.getElementsByClassName("bodyVisualizarProdutos")[0];
    var autenticarCliente = document.getElementsByClassName("autenticarCliente")[0];

    factura.classList.add("ocultar");
    bodyVisualizarProdutos.classList.add("ocultar");
    autenticarCliente.classList.remove("ocultar");
  }

  voltarPagar() {
    var autenticarCliente = document.getElementsByClassName("autenticarCliente")[0];
    var opcoesPagamento = document.getElementsByClassName("opcoesPagamento")[0];

    autenticarCliente.classList.remove("ocultar");
    opcoesPagamento.classList.add("ocultar");
  }

  gerarFaturaProForma() {
    this.dadosAdministrador.setOpcaoImprimir(0);
    this.setarDadosAdmn();
    this.dadosAdministrador.setTroco(0);
    this.router.navigateByUrl('/factura');
  }

  setarDadosAdmn() {
    this.atualizarSubTotalAPagar();
    this.dadosAdministrador.setProdutosFatura(this.produtosFactura);

    if ((this.subtotalProdutos != null) && (this.taxaIVA != null) && (this.totalProdutos != null) && (this.clienteCriado != null)) {
      this.dadosAdministrador.setSubTotal(this.subtotalProdutos);
      this.dadosAdministrador.setTaxaIVA(this.taxaIVA);
      this.dadosAdministrador.setTotal(this.totalProdutos);
      this.dadosAdministrador.setCliente(this.clienteCriado);
    }

    if ((this.subtotalProdutos != null) && (this.taxaIVA != null) && (this.totalProdutos != null)) {
      this.dadosAdministrador.setSubTotal(this.subtotalProdutos);
      this.dadosAdministrador.setTaxaIVA(this.taxaIVA);
      this.dadosAdministrador.setTotal(this.totalProdutos);
    }
  }

  irPagamentoDinheiro() {
    var opcoesPagamento = document.getElementsByClassName("opcoesPagamento")[0];
    var pagamentoDinheiro = document.getElementsByClassName("pagamentoDinheiro")[0];

    opcoesPagamento.classList.add("ocultar");
    pagamentoDinheiro.classList.remove("ocultar");
  }

  voltarPagamentoDinheiro() {
    var opcoesPagamento = document.getElementsByClassName("opcoesPagamento")[0];
    var pagamentoDinheiro = document.getElementsByClassName("pagamentoDinheiro")[0];

    opcoesPagamento.classList.remove("ocultar");
    pagamentoDinheiro.classList.add("ocultar");
  }

  async efectuarPagamentoDinheiro() {
    if (this.quantiaPagamentoDinheiro == null) {
      alert("Campo Vazio , Porfavor digite a quantia a pagar\n");
      return;
    } else if (this.quantiaPagamentoDinheiro < 0) {
      alert("Porfavor digite uma quantia válida");
      return;
    } else if (this.quantiaPagamentoDinheiro < (this.totalProdutos ? this.totalProdutos : 0)) {
      alert("Quantia Insuficiente");
      return;
    }

    this.setarDadosAdmn();
    this.dadosAdministrador.setOpcaoImprimir(1);
    this.dadosAdministrador.setTroco(this.quantiaPagamentoDinheiro - (this.totalProdutos ? this.totalProdutos : 0));
    this.dadosAdministrador.setTipoPagamento("Dinheiro");


    this.atualizarStockProdutosDisponiveis();
    await this.criarFacturasProdutos();
    this.dadosAdministrador.setNumeroFactura(this.numeroFatura ? this.numeroFatura : 0);

    this.router.navigateByUrl('/factura');
  }

  async efectuarPagamentoMulticaixa() {
    this.setarDadosAdmn();
    this.dadosAdministrador.setOpcaoImprimir(2);
    this.dadosAdministrador.setTroco(0);
    this.dadosAdministrador.setTipoPagamento("Multicaixa");
    //
    this.atualizarStockProdutosDisponiveis();
    await this.criarFacturasProdutos();
    //
    this.dadosAdministrador.setNumeroFactura(this.numeroFatura ? this.numeroFatura : 0);
    this.router.navigateByUrl('/factura');
  }

  atualizarStockProdutosDisponiveis() {
    this.produtosDisponiveis.forEach(produtoDisponivel => {
      this.produtosServices.updateProduto(produtoDisponivel).subscribe(res => {
        if (res) {
          console.log("produtos atualizados");
        }
      },
        err => {
          console.log("produtos não atualizados");
        }
      );
    });
  }

  async criarFacturasProdutos() {

    var idUsuario = this.dadosAdministrador.getUtilizador()?.userID;
    var idCliente = this.clienteCriado?.clienteID;

    if ((idUsuario != null) && (this.totalProdutos != null) && (idCliente != null)) {

      //criar factura primeiro
      this.facturaCriada = {
        facturaID: 0,
        userID: idUsuario,
        total: this.totalProdutos,
        clienteID: idCliente,
        dataFactura: this.formatarDataParaSQL(new Date())
      };

      try {
        const res = await this.facturasServices.createFactura(this.facturaCriada).toPromise();
        console.log(res);
        if (res) {
          this.numeroFatura = res;
        }

        this.cr.detectChanges();

        if ((res != -1) && res) {
          console.log("Factura Criada");

          // criar as facturasProdutos
          for (const produtoFactura of this.produtosFactura) {
            const idProduto = await this.getProdutoIDByProdutoFactura(produtoFactura.nome);

            this.facturaProdutoCriada = {
              facturaProdutoID: 0,
              facturaID: res,
              produtoID: idProduto ? idProduto : 0,
              quantidade: produtoFactura.quantidade,
              subTotal: produtoFactura.subtotal
            };

            try {
              const res1 = await this.facturasProdutosServices.createFacturaProduto(this.facturaProdutoCriada).toPromise();
              if (res1) {
                console.log("FacturaProduto Criada");
              }
            } catch (err) {
              console.log("FacturaProduto Não Criada");
            }
          }
        }
      } catch (err) {
        console.log("Factura não criada");
      }


      /*this.facturasServices.createFactura(this.facturaCriada).subscribe(res => {
        console.log(res);
        this.numeroFatura = res;
        this.cr.detectChanges();
        if (res != -1) {
          console.log("Factura Criada");
          
          //criar as facturasProdutos

          this.produtosFactura.forEach(async produtoFactura => {

            var idProduto = await this.getProdutoIDByProdutoFactura(produtoFactura.nome);

            this.facturaProdutoCriada = {
              facturaProdutoID: 0,
              facturaID: res,
              produtoID: idProduto ? idProduto : 0,
              quantidade: produtoFactura.quantidade,
              subTotal: produtoFactura.subtotal
            }

            this.facturasProdutosServices.createFacturaProduto(this.facturaProdutoCriada).subscribe(res1 => {
              if (res1) {
                console.log("FacturaProduto Criada");
              }
            },
              err => {
                console.log("FacturaProduto Não Criada");
              }
            );
          });

          //

        }
      },
        err => {
          console.log("Factura não criada");
        });*/
    }
  }

  async getProdutoIDByProdutoFactura(nome: string): Promise<number | null> {
    try {
      const res = await this.produtosServices.getProdutoByNome(nome).toPromise();
      return res ? res.produtoID : null;
    } catch (err) {
      console.error('Erro ao buscar produto:', err);
      return null;
    }
  }

  formatarDataParaSQL(data: Date): string {
    const year = data.getFullYear();
    const month = this.padLeftZero(data.getMonth() + 1); // Month is zero-based
    const day = this.padLeftZero(data.getDate());
    const hours = this.padLeftZero(data.getHours());
    const minutes = this.padLeftZero(data.getMinutes());
    const seconds = this.padLeftZero(data.getSeconds());

    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.124Z`;
  }

  padLeftZero(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }

  isDecimal(num: number): boolean {
    return num !== Math.trunc(num);
  }

  autenticarCliente() {
    if (this.telemovelCliente == null) {
      alert("Campo Vazio , Porfavor Digite o Telemóvel\n");
      return;
    } else if (this.telemovelCliente < 0) {
      alert("Porfavor digite um número válido (positivo) para o Telemóvel\n");
      return;
    } else if (this.isDecimal(this.telemovelCliente)) {
      alert("Porfavor digite um número inteiro para o telemovel");
      return;
    }

    this.clientesServices.getClienteByTelemovel(this.telemovelCliente).subscribe(res => {
      if (res) {
        alert("Autenticação feita com sucesso\n");
        this.telemovelCliente = null;
        this.clienteCriado = res;
        this.irPagar();
      }
    },
      err => {
        alert("Nenhum Cliente com este telemóvel\n");
        this.telemovelCliente = null;
      }
    );
  }

  efectuarCadastroCliente() {
    if (this.nomeCliente == "") {
      alert("Campo Vazio , Porfavor Digite o Nome do Cliente\n");
      return;
    } else if (this.telemovelCliente == null) {
      alert("Campo Vazio , Porfavor Digite o Telemóvel\n");
      return;
    } else if (this.telemovelCliente < 0) {
      alert("Porfavor digite um número válido (positivo) para o Telemóvel\n");
      return;
    } else if (this.isDecimal(this.telemovelCliente)) {
      alert("Porfavor digite um número inteiro para o telemovel");
      return;
    }

    this.clienteCriado = {
      clienteID: 0,
      nome: this.nomeCliente,
      telemovel: this.telemovelCliente
    }

    this.clientesServices.createCliente(this.clienteCriado).subscribe(res => {
      if (res != -1) {
        alert("Cliente Criado Com Sucesso\n");
        this.telemovelCliente = null;
        this.nomeCliente = "";
        this.voltarCadastrarCliente();
      }
    },
      err => {
        alert("Telemóvel já registado no sistema");
      }
    );
  }

  mudarSenha() {
    if (this.senhaActual == "") {
      alert("Campo Vazio , Porfavor Digite a senha actual\n");
      return;
    } else if (this.novaSenha == "") {
      alert("Campo Vazio , Porfavor Digite a nova senha\n");
      return;
    } else if (this.confirmacaoSenha == "") {
      alert("Campo Vazio , Porfavor Digite a senha confirmada\n");
      return;
    } else if (this.senhaActual != this.dadosAdministrador.getUtilizador()?.senha) {
      alert("Senha Actual Incorrecta");
      return;
    } else if (this.novaSenha != this.confirmacaoSenha) {
      alert("Nova senha diferente da senha confirmada , verifique porfavor");
      return;
    }


    const userID = this.dadosAdministrador.getUtilizador()?.userID;
    const BI = this.dadosAdministrador.getUtilizador()?.bilheteIdentidade;
    const nome = this.dadosAdministrador.getUtilizador()?.nomeCompleto;
    const userName = this.dadosAdministrador.getUtilizador()?.userName;
    const tipo = this.dadosAdministrador.getUtilizador()?.tipo;
    const email = this.dadosAdministrador.getUtilizador()?.email;

    if ((userID != null) && (BI != null) && (nome != null) && (userName != null) && (tipo != null) && (email != null)) {

      console.log(this.dadosAdministrador.getUtilizador());

      this.utilizadorCriado = {
        userID: userID,
        email: email,
        bilheteIdentidade: BI,
        nomeCompleto: nome,
        senha: this.novaSenha,
        tipo: tipo,
        userName: userName
      }

      console.log(this.utilizadorCriado);

      this.utilizadoresServices.updateUtilizador(this.utilizadorCriado).subscribe(res => {
        if (res != null) {
          alert("Palavra Passe Alterada com Sucesso\n");
          this.senhaActual = "";
          this.novaSenha = "";
          this.confirmacaoSenha = "";
        }

      },
        err => {
          console.log("Erro ao alterar palavra passe");
        }
      );

    }

  }








}
