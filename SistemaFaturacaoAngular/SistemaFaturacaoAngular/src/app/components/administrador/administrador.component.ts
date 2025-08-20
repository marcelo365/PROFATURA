import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Utilizador } from '../../models/Utilizador';
import { DadosAdministradorService } from '../../services/dados-administrador.service';
import { UtilizadoresService } from '../../services/utilizadores.service';
import { ProdutosService } from '../../services/produtos.service';
import { Produto } from '../../models/Produto';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Cliente } from '../../models/Cliente';
import { ClientesService } from '../../services/clientes.service';
import { DadosHistoricoFacturaService } from '../../services/dados-historico-factura.service';
import { Factura } from '../../models/Factura';
import { FacturasService } from '../../services/facturas.service';
import { DadoHistoricoFactura } from '../../models/DadoHistoricoFactura';
import { FacturasProdutosService } from '../../services/facturas-produtos.service';

@Component({
  selector: 'app-administrador',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './administrador.component.html',
  styleUrl: './administrador.component.scss'
})
export class AdministradorComponent implements OnInit {

  dadosAdministrador = inject(DadosAdministradorService);
  utilizadoresService = inject(UtilizadoresService);
  produtosServices = inject(ProdutosService);
  clientesServices = inject(ClientesService);
  dadosHistoricoServices = inject(DadosHistoricoFacturaService);
  facturasServices = inject(FacturasService);
  facturasProdutosServices = inject(FacturasProdutosService);
  router = inject(Router);

  userName: string = this.dadosAdministrador.getUserName();
  abaSeleccionada: string = "";

  //cadastro de administradores
  nomeCompletoCadastroAdministrador: string = "";
  emailCadastroAdministrador: string = "";
  bilheteIdentidadeCadastroAdministrador: string = "";
  userNameCadastroAdministrador: string = "";
  senhaCadastroAdministrador: string = "";
  utilizadorCriadoCadastroAdministrador: Utilizador | null = null;
  //

  //Cadastro de funcionários
  nomeCompleto: string = "";
  email: string = "";
  bilheteIdentidade: string = "";
  userNameFuncionario: string = "";
  senha: string = "";
  //

  //cadastro de cliente
  nomeCliente: string = "";
  telemovel: number | null = null;
  clienteCriado: Cliente | null = null;
  //

  //visualizar produtos
  produtosDisponiveis: Array<Produto> = [];
  procurarProdutoInput: string = "";
  produtoCriado: Produto | null = null;
  produtoAtualizado: Produto | null = null;
  //


  //visualizar funcionários
  funcionariosDisponiveis: Array<Utilizador> = [];
  procurarFuncionarioInput: number | null = null;
  nomeCompletoFuncionario: string = "";
  emailFuncionario: string = "";
  bilheteIdentidadeFuncionario: string = "";
  //

  //visualizarClientes
  procurarClienteInput: number | null = null;
  clientesDisponiveis: Array<Cliente> = [];
  nomeClienteEditar: string = "";
  telemovelClienteEditar: number | null = null;
  //

  //cadastro de produtos
  nomeProduto: string = "";
  precoProduto: number | null = null;
  quantidadeEmEstoqueProduto: number | null = null;
  categoriaProduto: string = "";
  dataDeCadastroProduto: string = "";
  produtoID: number = 0;
  categoriasDisponiveis: Array<String> = ["Alimentos e Bebidas", "Eletrônicos", "Roupas e Acessórios", "Casa e Jardim", "Saúde e Beleza", "Esportes e Lazer", "Automotivo", "Livros e Mídias", "Papelaria e Escritório", "Animais de Estimação", "Brinquedos e Bebês"];
  //

  //alterar senha
  senhaActual: string = "";
  novaSenha: string = "";
  confirmacaoSenha: string = "";
  //

  //gerar pdf facturas historico e relatorios
  facturasArmazenadas: Array<Factura> = [];
  arrayHistoricoFacturas: Array<DadoHistoricoFactura> = [];
  dadoHistoricoCriado: DadoHistoricoFactura | null = null;
  clienteObtido: Cliente | null = null;
  //


  //inserir periodos para factura
  dataComeco: string = "";
  dataFim: string = "";
  //

  //inserir produto para factura
  nomeProdutoFactura: string = "";
  //

  //dashboard
  top5produtosMaisVendidos: Array<Produto> = [];
  clienteComMaisReceita: Cliente | null = null;
  funcionarioComMaisReceita: Utilizador | null = null;
  //

  constructor() {
    console.log(this.dadosAdministrador.getUserName());
  }


  ngOnInit(): void {
    this.resetarListaProdutos();
    this.procurarProdutoInput = "";
    this.produtosServices.getAllProdutos().subscribe(res => {
      this.produtosDisponiveis = res;
    });
    this.inicializarListaFuncionarios();
    this.inicializarListaClientes();
    this.inicializarTop5ProdutosMaisVendidos();
    this.inicializarClienteComMaisReceita();
    this.inicializarFuncionarioComMaisReceita();
  }

  inicializarTop5ProdutosMaisVendidos() {
    this.produtosServices.getTop5ProdutosMaisVendidos().subscribe(res => {
      this.top5produtosMaisVendidos = res;
    });
  }

  inicializarFuncionarioComMaisReceita() {
    this.utilizadoresService.getFuncionarioComMaisReceita().subscribe(res => {
      this.funcionarioComMaisReceita = res;
    });
  }

  inicializarClienteComMaisReceita() {
    this.clientesServices.getClienteComMaisReceita().subscribe(res => {
      this.clienteComMaisReceita = res;
      console.log(this.clienteComMaisReceita);
    });
  }

  inicializarListaFuncionarios() {
    this.utilizadoresService.getAllUtilizadores().subscribe(res => {
      this.funcionariosDisponiveis = res;
    });
  }

  inicializarListaClientes() {
    this.clientesServices.getAllClientes().subscribe(res => {
      this.clientesDisponiveis = res;
    });
  }

  irCadastrarProdutos() {
    this.abaSeleccionada = "cadastrarProdutos";
    var paginaPrincipal = <HTMLDivElement>document.getElementsByClassName("paginaPrincipal")[0];
    var cadastrarProdutos = <HTMLDivElement>document.getElementsByClassName("cadastrarProdutos")[0];
    var visualizarProdutos = <HTMLDivElement>document.getElementsByClassName("visualizarProdutos")[0];
    var cadastrarAdministradores = <HTMLDivElement>document.getElementsByClassName("cadastrarAdministradores")[0];
    var cadastrarFuncionarios = <HTMLDivElement>document.getElementsByClassName("cadastrarFuncionarios")[0];
    var editarProduto = <HTMLDivElement>document.getElementsByClassName("editarProduto")[0];
    var cadastrarClientes = <HTMLDivElement>document.getElementsByClassName("cadastrarClientes")[0];
    var gestaoFaturas = <HTMLDivElement>document.getElementsByClassName("gestaoFaturas")[0];
    var digitarPeriodos = document.getElementsByClassName("digitarPeriodos")[0];
    var digitarProduto = document.getElementsByClassName("digitarProduto")[0];
    var visualizarFuncionarios = document.getElementsByClassName("visualizarFuncionarios")[0];
    this.voltarVisualizarFuncionario();
    this.voltarVisualizarCliente();
    var visualizarClientes = document.getElementsByClassName("visualizarClientes")[0];
    var alterarSenha = document.getElementsByClassName("alterarSenha")[0];
    var dashboard = document.getElementsByClassName("dashboard")[0];



    paginaPrincipal.classList.add("ocultar");
    cadastrarProdutos.classList.remove("ocultar");
    visualizarProdutos.classList.add("ocultar");
    cadastrarAdministradores.classList.add("ocultar");
    editarProduto.classList.add("ocultar");
    cadastrarFuncionarios.classList.add("ocultar");
    cadastrarClientes.classList.add("ocultar");
    gestaoFaturas.classList.add("ocultar");
    digitarPeriodos.classList.add("ocultar");
    digitarProduto.classList.add("ocultar");
    visualizarFuncionarios.classList.add("ocultar");
    visualizarClientes.classList.add("ocultar");
    alterarSenha.classList.add("ocultar");
    dashboard.classList.add("ocultar");
    this.resetarDadosCadastroProdutos();
  }

  irVisualizarProdutos() {
    this.abaSeleccionada = "visualizarProdutos";

    var paginaPrincipal = <HTMLDivElement>document.getElementsByClassName("paginaPrincipal")[0];
    var cadastrarProdutos = <HTMLDivElement>document.getElementsByClassName("cadastrarProdutos")[0];
    var visualizarProdutos = <HTMLDivElement>document.getElementsByClassName("visualizarProdutos")[0];
    var cadastrarAdministradores = <HTMLDivElement>document.getElementsByClassName("cadastrarAdministradores")[0];
    var editarProduto = <HTMLDivElement>document.getElementsByClassName("editarProduto")[0];
    var cadastrarFuncionarios = <HTMLDivElement>document.getElementsByClassName("cadastrarFuncionarios")[0];
    var cadastrarClientes = <HTMLDivElement>document.getElementsByClassName("cadastrarClientes")[0];
    var gestaoFaturas = <HTMLDivElement>document.getElementsByClassName("gestaoFaturas")[0];
    var digitarPeriodos = document.getElementsByClassName("digitarPeriodos")[0];
    var digitarProduto = document.getElementsByClassName("digitarProduto")[0];
    var visualizarFuncionarios = document.getElementsByClassName("visualizarFuncionarios")[0];
    this.voltarVisualizarFuncionario();
    this.voltarVisualizarCliente();
    var visualizarClientes = document.getElementsByClassName("visualizarClientes")[0];
    var alterarSenha = document.getElementsByClassName("alterarSenha")[0];
    var dashboard = document.getElementsByClassName("dashboard")[0];



    paginaPrincipal.classList.add("ocultar");
    cadastrarProdutos.classList.add("ocultar");
    visualizarProdutos.classList.remove("ocultar");
    cadastrarAdministradores.classList.add("ocultar");
    editarProduto.classList.add("ocultar");
    cadastrarFuncionarios.classList.add("ocultar");
    cadastrarClientes.classList.add("ocultar");
    gestaoFaturas.classList.add("ocultar");
    digitarPeriodos.classList.add("ocultar");
    digitarProduto.classList.add("ocultar");
    visualizarFuncionarios.classList.add("ocultar");
    visualizarClientes.classList.add("ocultar");
    alterarSenha.classList.add("ocultar");
    dashboard.classList.add("ocultar");
    this.ngOnInit();
  }

  irCadastrarAdministradores() {
    this.abaSeleccionada = "registarAdministradores";
    var paginaPrincipal = <HTMLDivElement>document.getElementsByClassName("paginaPrincipal")[0];
    var cadastrarProdutos = <HTMLDivElement>document.getElementsByClassName("cadastrarProdutos")[0];
    var visualizarProdutos = <HTMLDivElement>document.getElementsByClassName("visualizarProdutos")[0];
    var cadastrarAdministradores = <HTMLDivElement>document.getElementsByClassName("cadastrarAdministradores")[0];
    var cadastrarFuncionarios = <HTMLDivElement>document.getElementsByClassName("cadastrarFuncionarios")[0];
    var editarProduto = <HTMLDivElement>document.getElementsByClassName("editarProduto")[0];
    var cadastrarClientes = <HTMLDivElement>document.getElementsByClassName("cadastrarClientes")[0];
    var gestaoFaturas = <HTMLDivElement>document.getElementsByClassName("gestaoFaturas")[0];
    var digitarPeriodos = document.getElementsByClassName("digitarPeriodos")[0];
    var digitarProduto = document.getElementsByClassName("digitarProduto")[0];
    var visualizarFuncionarios = document.getElementsByClassName("visualizarFuncionarios")[0];
    this.voltarVisualizarFuncionario();
    this.voltarVisualizarCliente();
    var visualizarClientes = document.getElementsByClassName("visualizarClientes")[0];
    var alterarSenha = document.getElementsByClassName("alterarSenha")[0];
    var dashboard = document.getElementsByClassName("dashboard")[0];


    paginaPrincipal.classList.add("ocultar");
    cadastrarProdutos.classList.add("ocultar");
    visualizarProdutos.classList.add("ocultar");
    cadastrarAdministradores.classList.remove("ocultar");
    editarProduto.classList.add("ocultar");
    cadastrarFuncionarios.classList.add("ocultar");
    cadastrarClientes.classList.add("ocultar");
    gestaoFaturas.classList.add("ocultar");
    digitarPeriodos.classList.add("ocultar");
    digitarProduto.classList.add("ocultar");
    visualizarFuncionarios.classList.add("ocultar");
    visualizarClientes.classList.add("ocultar");
    alterarSenha.classList.add("ocultar");
    dashboard.classList.add("ocultar");

  }

  irCadastrarFuncionarios() {
    this.abaSeleccionada = "registarFuncionarios";

    var paginaPrincipal = <HTMLDivElement>document.getElementsByClassName("paginaPrincipal")[0];
    var cadastrarProdutos = <HTMLDivElement>document.getElementsByClassName("cadastrarProdutos")[0];
    var visualizarProdutos = <HTMLDivElement>document.getElementsByClassName("visualizarProdutos")[0];
    var cadastrarAdministradores = <HTMLDivElement>document.getElementsByClassName("cadastrarAdministradores")[0];
    var cadastrarFuncionarios = <HTMLDivElement>document.getElementsByClassName("cadastrarFuncionarios")[0];
    var editarProduto = <HTMLDivElement>document.getElementsByClassName("editarProduto")[0];
    var cadastrarClientes = <HTMLDivElement>document.getElementsByClassName("cadastrarClientes")[0];
    var gestaoFaturas = <HTMLDivElement>document.getElementsByClassName("gestaoFaturas")[0];
    var digitarPeriodos = document.getElementsByClassName("digitarPeriodos")[0];
    var digitarProduto = document.getElementsByClassName("digitarProduto")[0];
    var visualizarFuncionarios = document.getElementsByClassName("visualizarFuncionarios")[0];
    this.voltarVisualizarFuncionario();
    this.voltarVisualizarCliente();
    var visualizarClientes = document.getElementsByClassName("visualizarClientes")[0];
    var alterarSenha = document.getElementsByClassName("alterarSenha")[0];
    var dashboard = document.getElementsByClassName("dashboard")[0];


    paginaPrincipal.classList.add("ocultar");
    cadastrarProdutos.classList.add("ocultar");
    visualizarProdutos.classList.add("ocultar");
    cadastrarAdministradores.classList.add("ocultar");
    editarProduto.classList.add("ocultar");
    cadastrarFuncionarios.classList.remove("ocultar");
    cadastrarClientes.classList.add("ocultar");
    gestaoFaturas.classList.add("ocultar");
    digitarPeriodos.classList.add("ocultar");
    digitarProduto.classList.add("ocultar");
    visualizarFuncionarios.classList.add("ocultar");
    visualizarClientes.classList.add("ocultar");
    alterarSenha.classList.add("ocultar");
    dashboard.classList.add("ocultar");

  }

  irCadastrarClientes() {
    this.abaSeleccionada = "cadastrarClientes";

    var paginaPrincipal = <HTMLDivElement>document.getElementsByClassName("paginaPrincipal")[0];
    var cadastrarProdutos = <HTMLDivElement>document.getElementsByClassName("cadastrarProdutos")[0];
    var visualizarProdutos = <HTMLDivElement>document.getElementsByClassName("visualizarProdutos")[0];
    var cadastrarAdministradores = <HTMLDivElement>document.getElementsByClassName("cadastrarAdministradores")[0];
    var cadastrarFuncionarios = <HTMLDivElement>document.getElementsByClassName("cadastrarFuncionarios")[0];
    var editarProduto = <HTMLDivElement>document.getElementsByClassName("editarProduto")[0];
    var cadastrarClientes = <HTMLDivElement>document.getElementsByClassName("cadastrarClientes")[0];
    var gestaoFaturas = <HTMLDivElement>document.getElementsByClassName("gestaoFaturas")[0];
    var digitarPeriodos = document.getElementsByClassName("digitarPeriodos")[0];
    var digitarProduto = document.getElementsByClassName("digitarProduto")[0];
    var visualizarFuncionarios = document.getElementsByClassName("visualizarFuncionarios")[0];
    this.voltarVisualizarFuncionario();
    this.voltarVisualizarCliente();
    var visualizarClientes = document.getElementsByClassName("visualizarClientes")[0];
    var alterarSenha = document.getElementsByClassName("alterarSenha")[0];
    var dashboard = document.getElementsByClassName("dashboard")[0];

    paginaPrincipal.classList.add("ocultar");
    cadastrarProdutos.classList.add("ocultar");
    visualizarProdutos.classList.add("ocultar");
    cadastrarAdministradores.classList.add("ocultar");
    editarProduto.classList.add("ocultar");
    cadastrarFuncionarios.classList.add("ocultar");
    cadastrarClientes.classList.remove("ocultar");
    gestaoFaturas.classList.add("ocultar");
    digitarPeriodos.classList.add("ocultar");
    digitarProduto.classList.add("ocultar");
    visualizarFuncionarios.classList.add("ocultar");
    visualizarClientes.classList.add("ocultar");
    alterarSenha.classList.add("ocultar");
    dashboard.classList.add("ocultar");

  }

  irGestaoFaturas() {
    this.abaSeleccionada = "facturas";

    var paginaPrincipal = <HTMLDivElement>document.getElementsByClassName("paginaPrincipal")[0];
    var cadastrarProdutos = <HTMLDivElement>document.getElementsByClassName("cadastrarProdutos")[0];
    var visualizarProdutos = <HTMLDivElement>document.getElementsByClassName("visualizarProdutos")[0];
    var cadastrarAdministradores = <HTMLDivElement>document.getElementsByClassName("cadastrarAdministradores")[0];
    var cadastrarFuncionarios = <HTMLDivElement>document.getElementsByClassName("cadastrarFuncionarios")[0];
    var editarProduto = <HTMLDivElement>document.getElementsByClassName("editarProduto")[0];
    var cadastrarClientes = <HTMLDivElement>document.getElementsByClassName("cadastrarClientes")[0];
    var gestaoFaturas = <HTMLDivElement>document.getElementsByClassName("gestaoFaturas")[0];
    var digitarPeriodos = document.getElementsByClassName("digitarPeriodos")[0];
    var digitarProduto = document.getElementsByClassName("digitarProduto")[0];
    var visualizarFuncionarios = document.getElementsByClassName("visualizarFuncionarios")[0];
    this.voltarVisualizarFuncionario();
    this.voltarVisualizarCliente();
    var visualizarClientes = document.getElementsByClassName("visualizarClientes")[0];
    var alterarSenha = document.getElementsByClassName("alterarSenha")[0];
    var dashboard = document.getElementsByClassName("dashboard")[0];

    paginaPrincipal.classList.add("ocultar");
    cadastrarProdutos.classList.add("ocultar");
    visualizarProdutos.classList.add("ocultar");
    cadastrarAdministradores.classList.add("ocultar");
    editarProduto.classList.add("ocultar");
    cadastrarFuncionarios.classList.add("ocultar");
    cadastrarClientes.classList.add("ocultar");
    gestaoFaturas.classList.remove("ocultar");
    digitarPeriodos.classList.add("ocultar");
    digitarProduto.classList.add("ocultar");
    visualizarFuncionarios.classList.add("ocultar");
    visualizarClientes.classList.add("ocultar");
    alterarSenha.classList.add("ocultar");
    dashboard.classList.add("ocultar");

  }

  irInserirPeriodos() {
    var paginaPrincipal = <HTMLDivElement>document.getElementsByClassName("paginaPrincipal")[0];
    var cadastrarProdutos = <HTMLDivElement>document.getElementsByClassName("cadastrarProdutos")[0];
    var visualizarProdutos = <HTMLDivElement>document.getElementsByClassName("visualizarProdutos")[0];
    var cadastrarAdministradores = <HTMLDivElement>document.getElementsByClassName("cadastrarAdministradores")[0];
    var cadastrarFuncionarios = <HTMLDivElement>document.getElementsByClassName("cadastrarFuncionarios")[0];
    var editarProduto = <HTMLDivElement>document.getElementsByClassName("editarProduto")[0];
    var cadastrarClientes = <HTMLDivElement>document.getElementsByClassName("cadastrarClientes")[0];
    var gestaoFaturas = <HTMLDivElement>document.getElementsByClassName("gestaoFaturas")[0];
    var digitarPeriodos = document.getElementsByClassName("digitarPeriodos")[0];
    var digitarProduto = document.getElementsByClassName("digitarProduto")[0];
    var visualizarFuncionarios = document.getElementsByClassName("visualizarFuncionarios")[0];
    this.voltarVisualizarFuncionario();
    this.voltarVisualizarCliente();
    var visualizarClientes = document.getElementsByClassName("visualizarClientes")[0];
    var alterarSenha = document.getElementsByClassName("alterarSenha")[0];
    var dashboard = document.getElementsByClassName("dashboard")[0];

    paginaPrincipal.classList.add("ocultar");
    cadastrarProdutos.classList.add("ocultar");
    visualizarProdutos.classList.add("ocultar");
    cadastrarAdministradores.classList.add("ocultar");
    editarProduto.classList.add("ocultar");
    cadastrarFuncionarios.classList.add("ocultar");
    cadastrarClientes.classList.add("ocultar");
    gestaoFaturas.classList.add("ocultar");
    digitarPeriodos.classList.remove("ocultar");
    digitarProduto.classList.add("ocultar");
    visualizarFuncionarios.classList.add("ocultar");
    visualizarClientes.classList.add("ocultar");
    alterarSenha.classList.add("ocultar");
    dashboard.classList.add("ocultar");

  }

  irInserirProduto() {
    var paginaPrincipal = <HTMLDivElement>document.getElementsByClassName("paginaPrincipal")[0];
    var cadastrarProdutos = <HTMLDivElement>document.getElementsByClassName("cadastrarProdutos")[0];
    var visualizarProdutos = <HTMLDivElement>document.getElementsByClassName("visualizarProdutos")[0];
    var cadastrarAdministradores = <HTMLDivElement>document.getElementsByClassName("cadastrarAdministradores")[0];
    var cadastrarFuncionarios = <HTMLDivElement>document.getElementsByClassName("cadastrarFuncionarios")[0];
    var editarProduto = <HTMLDivElement>document.getElementsByClassName("editarProduto")[0];
    var cadastrarClientes = <HTMLDivElement>document.getElementsByClassName("cadastrarClientes")[0];
    var gestaoFaturas = <HTMLDivElement>document.getElementsByClassName("gestaoFaturas")[0];
    var digitarPeriodos = document.getElementsByClassName("digitarPeriodos")[0];
    var digitarProduto = document.getElementsByClassName("digitarProduto")[0];
    var visualizarFuncionarios = document.getElementsByClassName("visualizarFuncionarios")[0];
    this.voltarVisualizarFuncionario();
    this.voltarVisualizarCliente();
    var visualizarClientes = document.getElementsByClassName("visualizarClientes")[0];
    var alterarSenha = document.getElementsByClassName("alterarSenha")[0];
    var dashboard = document.getElementsByClassName("dashboard")[0];

    paginaPrincipal.classList.add("ocultar");
    cadastrarProdutos.classList.add("ocultar");
    visualizarProdutos.classList.add("ocultar");
    cadastrarAdministradores.classList.add("ocultar");
    editarProduto.classList.add("ocultar");
    cadastrarFuncionarios.classList.add("ocultar");
    cadastrarClientes.classList.add("ocultar");
    gestaoFaturas.classList.add("ocultar");
    digitarPeriodos.classList.add("ocultar");
    digitarProduto.classList.remove("ocultar");
    visualizarFuncionarios.classList.add("ocultar");
    visualizarClientes.classList.add("ocultar");
    alterarSenha.classList.add("ocultar");
    dashboard.classList.add("ocultar");

  }

  irVisualizarFuncionarios() {
    this.abaSeleccionada = "visualizarTrabalhadores";

    var paginaPrincipal = <HTMLDivElement>document.getElementsByClassName("paginaPrincipal")[0];
    var cadastrarProdutos = <HTMLDivElement>document.getElementsByClassName("cadastrarProdutos")[0];
    var visualizarProdutos = <HTMLDivElement>document.getElementsByClassName("visualizarProdutos")[0];
    var cadastrarAdministradores = <HTMLDivElement>document.getElementsByClassName("cadastrarAdministradores")[0];
    var cadastrarFuncionarios = <HTMLDivElement>document.getElementsByClassName("cadastrarFuncionarios")[0];
    var editarProduto = <HTMLDivElement>document.getElementsByClassName("editarProduto")[0];
    var cadastrarClientes = <HTMLDivElement>document.getElementsByClassName("cadastrarClientes")[0];
    var gestaoFaturas = <HTMLDivElement>document.getElementsByClassName("gestaoFaturas")[0];
    var digitarPeriodos = document.getElementsByClassName("digitarPeriodos")[0];
    var digitarProduto = document.getElementsByClassName("digitarProduto")[0];
    var visualizarFuncionarios = document.getElementsByClassName("visualizarFuncionarios")[0];
    this.voltarVisualizarFuncionario();
    this.voltarVisualizarCliente();
    var visualizarClientes = document.getElementsByClassName("visualizarClientes")[0];
    var alterarSenha = document.getElementsByClassName("alterarSenha")[0];
    var dashboard = document.getElementsByClassName("dashboard")[0];


    paginaPrincipal.classList.add("ocultar");
    cadastrarProdutos.classList.add("ocultar");
    visualizarProdutos.classList.add("ocultar");
    cadastrarAdministradores.classList.add("ocultar");
    editarProduto.classList.add("ocultar");
    cadastrarFuncionarios.classList.add("ocultar");
    cadastrarClientes.classList.add("ocultar");
    gestaoFaturas.classList.add("ocultar");
    digitarPeriodos.classList.add("ocultar");
    digitarProduto.classList.add("ocultar");
    visualizarFuncionarios.classList.remove("ocultar");
    visualizarClientes.classList.add("ocultar");
    alterarSenha.classList.add("ocultar");
    dashboard.classList.add("ocultar");

  }

  irVisualizarClientes() {
    this.abaSeleccionada = "visualizarClientes";

    var paginaPrincipal = <HTMLDivElement>document.getElementsByClassName("paginaPrincipal")[0];
    var cadastrarProdutos = <HTMLDivElement>document.getElementsByClassName("cadastrarProdutos")[0];
    var visualizarProdutos = <HTMLDivElement>document.getElementsByClassName("visualizarProdutos")[0];
    var cadastrarAdministradores = <HTMLDivElement>document.getElementsByClassName("cadastrarAdministradores")[0];
    var cadastrarFuncionarios = <HTMLDivElement>document.getElementsByClassName("cadastrarFuncionarios")[0];
    var editarProduto = <HTMLDivElement>document.getElementsByClassName("editarProduto")[0];
    var cadastrarClientes = <HTMLDivElement>document.getElementsByClassName("cadastrarClientes")[0];
    var gestaoFaturas = <HTMLDivElement>document.getElementsByClassName("gestaoFaturas")[0];
    var digitarPeriodos = document.getElementsByClassName("digitarPeriodos")[0];
    var digitarProduto = document.getElementsByClassName("digitarProduto")[0];
    var visualizarFuncionarios = document.getElementsByClassName("visualizarFuncionarios")[0];
    this.voltarVisualizarFuncionario();
    this.voltarVisualizarCliente();
    var visualizarClientes = document.getElementsByClassName("visualizarClientes")[0];
    var alterarSenha = document.getElementsByClassName("alterarSenha")[0];
    var dashboard = document.getElementsByClassName("dashboard")[0];

    paginaPrincipal.classList.add("ocultar");
    cadastrarProdutos.classList.add("ocultar");
    visualizarProdutos.classList.add("ocultar");
    cadastrarAdministradores.classList.add("ocultar");
    editarProduto.classList.add("ocultar");
    cadastrarFuncionarios.classList.add("ocultar");
    cadastrarClientes.classList.add("ocultar");
    gestaoFaturas.classList.add("ocultar");
    digitarPeriodos.classList.add("ocultar");
    digitarProduto.classList.add("ocultar");
    visualizarFuncionarios.classList.add("ocultar");
    visualizarClientes.classList.remove("ocultar");
    alterarSenha.classList.add("ocultar");
    dashboard.classList.add("ocultar");

  }

  irAlterarSenha() {
    this.abaSeleccionada = "alterarSenha";

    var paginaPrincipal = <HTMLDivElement>document.getElementsByClassName("paginaPrincipal")[0];
    var cadastrarProdutos = <HTMLDivElement>document.getElementsByClassName("cadastrarProdutos")[0];
    var visualizarProdutos = <HTMLDivElement>document.getElementsByClassName("visualizarProdutos")[0];
    var cadastrarAdministradores = <HTMLDivElement>document.getElementsByClassName("cadastrarAdministradores")[0];
    var cadastrarFuncionarios = <HTMLDivElement>document.getElementsByClassName("cadastrarFuncionarios")[0];
    var editarProduto = <HTMLDivElement>document.getElementsByClassName("editarProduto")[0];
    var cadastrarClientes = <HTMLDivElement>document.getElementsByClassName("cadastrarClientes")[0];
    var gestaoFaturas = <HTMLDivElement>document.getElementsByClassName("gestaoFaturas")[0];
    var digitarPeriodos = document.getElementsByClassName("digitarPeriodos")[0];
    var digitarProduto = document.getElementsByClassName("digitarProduto")[0];
    var visualizarFuncionarios = document.getElementsByClassName("visualizarFuncionarios")[0];
    this.voltarVisualizarFuncionario();
    this.voltarVisualizarCliente();
    var visualizarClientes = document.getElementsByClassName("visualizarClientes")[0];
    var alterarSenha = document.getElementsByClassName("alterarSenha")[0];
    var dashboard = document.getElementsByClassName("dashboard")[0];

    paginaPrincipal.classList.add("ocultar");
    cadastrarProdutos.classList.add("ocultar");
    visualizarProdutos.classList.add("ocultar");
    cadastrarAdministradores.classList.add("ocultar");
    editarProduto.classList.add("ocultar");
    cadastrarFuncionarios.classList.add("ocultar");
    cadastrarClientes.classList.add("ocultar");
    gestaoFaturas.classList.add("ocultar");
    digitarPeriodos.classList.add("ocultar");
    digitarProduto.classList.add("ocultar");
    visualizarFuncionarios.classList.add("ocultar");
    visualizarClientes.classList.add("ocultar");
    alterarSenha.classList.remove("ocultar");
    dashboard.classList.add("ocultar");
  }

  irDashBoard() {
    this.abaSeleccionada = "dashboard";

    var paginaPrincipal = <HTMLDivElement>document.getElementsByClassName("paginaPrincipal")[0];
    var cadastrarProdutos = <HTMLDivElement>document.getElementsByClassName("cadastrarProdutos")[0];
    var visualizarProdutos = <HTMLDivElement>document.getElementsByClassName("visualizarProdutos")[0];
    var cadastrarAdministradores = <HTMLDivElement>document.getElementsByClassName("cadastrarAdministradores")[0];
    var cadastrarFuncionarios = <HTMLDivElement>document.getElementsByClassName("cadastrarFuncionarios")[0];
    var editarProduto = <HTMLDivElement>document.getElementsByClassName("editarProduto")[0];
    var cadastrarClientes = <HTMLDivElement>document.getElementsByClassName("cadastrarClientes")[0];
    var gestaoFaturas = <HTMLDivElement>document.getElementsByClassName("gestaoFaturas")[0];
    var digitarPeriodos = document.getElementsByClassName("digitarPeriodos")[0];
    var digitarProduto = document.getElementsByClassName("digitarProduto")[0];
    var visualizarFuncionarios = document.getElementsByClassName("visualizarFuncionarios")[0];
    this.voltarVisualizarFuncionario();
    this.voltarVisualizarCliente();
    var visualizarClientes = document.getElementsByClassName("visualizarClientes")[0];
    var alterarSenha = document.getElementsByClassName("alterarSenha")[0];
    var dashboard = document.getElementsByClassName("dashboard")[0];

    paginaPrincipal.classList.add("ocultar");
    cadastrarProdutos.classList.add("ocultar");
    visualizarProdutos.classList.add("ocultar");
    cadastrarAdministradores.classList.add("ocultar");
    editarProduto.classList.add("ocultar");
    cadastrarFuncionarios.classList.add("ocultar");
    cadastrarClientes.classList.add("ocultar");
    gestaoFaturas.classList.add("ocultar");
    digitarPeriodos.classList.add("ocultar");
    digitarProduto.classList.add("ocultar");
    visualizarFuncionarios.classList.add("ocultar");
    visualizarClientes.classList.add("ocultar");
    alterarSenha.classList.add("ocultar");
    dashboard.classList.remove("ocultar");
  }


  fazerCadastroAdministrador(tipoUser: number) {

    if ((tipoUser == 1) ? (this.nomeCompletoCadastroAdministrador == "") : (this.nomeCompleto == "")) {
      alert("Campo Vazio , Porfavor Digite o Nome Completo\n");
      return;
    } else if ((tipoUser == 1) ? (this.emailCadastroAdministrador == "") : (this.email == "")) {
      alert("Campo Vazio , Porfavor Digite o Email\n");
      return;
    } else if ((tipoUser == 1) ? (this.bilheteIdentidadeCadastroAdministrador == "") : (this.bilheteIdentidade == "")) {
      alert("Campo Vazio , Porfavor Digite o Bilhete de Identidade\n");
      return;
    } else if ((tipoUser == 1) ? (this.userNameCadastroAdministrador == "") : (this.userNameFuncionario == "")) {
      alert("Campo Vazio , Porfavor Digite o Username\n");
      return;
    } else if ((tipoUser == 1) ? (this.senhaCadastroAdministrador == "") : (this.senha == "")) {
      alert("Campo Vazio , Porfavor Digite a Senha\n");
      return;
    } else if ((tipoUser == 1) ? (!this.isValidEmail(this.emailCadastroAdministrador)) : (!this.isValidEmail(this.email))) {
      alert("Digite um Email no formato válido\n");
      return;
    }

    this.utilizadorCriadoCadastroAdministrador = {
      userID: 0,
      bilheteIdentidade: (tipoUser == 1) ? this.bilheteIdentidadeCadastroAdministrador : this.bilheteIdentidade,
      nomeCompleto: (tipoUser == 1) ? this.nomeCompletoCadastroAdministrador : this.nomeCompleto,
      senha: (tipoUser == 1) ? this.senhaCadastroAdministrador : this.senha,
      userName: (tipoUser == 1) ? this.userNameCadastroAdministrador : this.userNameFuncionario,
      email: (tipoUser == 1) ? this.emailCadastroAdministrador : this.email,
      tipo: tipoUser
    };

    this.utilizadoresService.createUtilizador(this.utilizadorCriadoCadastroAdministrador).subscribe(res => {
      if (res) {

        if (tipoUser == 0) {
          alert("Funcionário Criado com Sucesso");
          this.setarDadosCadastroAdministrador();
        } else {
          alert("Administrador Criado com Sucesso");
          this.setarDadosCadastroAdministrador();
        }

      }
    },
      err => {
        alert("Username Já Existente ou Bilhete de Identidade Já registrado");
      }

    );
  }

  setarDadosCadastroAdministrador() {
    this.bilheteIdentidadeCadastroAdministrador = "";
    this.userNameCadastroAdministrador = "";
    this.emailCadastroAdministrador = "";
    this.senhaCadastroAdministrador = "";
    this.nomeCompletoCadastroAdministrador = "";

    this.nomeCompleto = "";
    this.bilheteIdentidade = "";
    this.email = "";
    this.userNameFuncionario = "";
    this.senha = "";

  }

  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  customParseInt(value: string): number {
    const isNumeric = /^\d+$/.test(value);
    return isNumeric ? parseInt(value, 10) : NaN;
  }

  fazerPesquisa() {

    if (!(this.procurarProdutoInput == "")) {

      if (isNaN(this.customParseInt(this.procurarProdutoInput))) {

        this.produtosServices.getProdutoByNome(this.procurarProdutoInput).subscribe(res => {
          console.log(res);
          this.resetarListaProdutos();
          this.produtosDisponiveis.push(res);
          console.log(this.produtosDisponiveis);
          this.procurarProdutoInput = "";
          return;

        },
          err => {

            this.produtosServices.getProdutosByCategorias(this.procurarProdutoInput).subscribe(res => {
              console.log(res);

              if (res.length == 0) {
                alert("Produtos(s) não Encontrado(s)");
                this.ngOnInit();
              } else {
                this.resetarListaProdutos();
                this.produtosDisponiveis = res;
                this.procurarProdutoInput = "";
              }

            }
            );

          }

        );



      } else {

        this.produtosServices.getProdutoByID(parseInt(this.procurarProdutoInput)).subscribe(res => {
          console.log(res);
          this.resetarListaProdutos();
          this.produtosDisponiveis.push(res);
          this.procurarProdutoInput = "";
        },
          err => {
            alert("Produtos(s) não Encontrado(s)");
            this.procurarProdutoInput = "";
            this.ngOnInit();
          }
        );

      }

    }
  }

  async fazerPesquisaFuncionario() {

    if (this.procurarFuncionarioInput != null) {

      try {
        const resFunc = await this.utilizadoresService.getUtilizador(this.procurarFuncionarioInput).toPromise();
        if (resFunc != null) {
          this.funcionariosDisponiveis = [];
          this.funcionariosDisponiveis.push(resFunc);
          this.procurarFuncionarioInput = null;
        }
      } catch (err) {
        alert("Funcionário não encontrado");
        console.log("Funcionario não encontrado");
        this.inicializarListaFuncionarios();
        this.procurarFuncionarioInput = null;
      }
    }
  }

  async pesquisarCliente() {

    if (this.procurarClienteInput != null) {

      try {
        const resCli = await this.clientesServices.getClienteByTelemovel(this.procurarClienteInput).toPromise();
        if (resCli != null) {
          this.clientesDisponiveis = [];
          this.clientesDisponiveis.push(resCli);
          this.procurarClienteInput = null;
        }
      } catch (err) {
        alert("Cliente não encontrado");
        console.log("Cliente não encontrado");
        this.inicializarListaClientes();
        this.procurarClienteInput = null;;
      }


    }

  }

  resetarListaProdutos() {
    this.produtosDisponiveis = [];
  }

  fazerCadastroProduto() {

    if (this.nomeProduto == "") {
      alert("Campo Vazio , Porfavor Digite o Nome do Produto\n");
      return;
    } else if (this.precoProduto == null) {
      alert("Campo Vazio , Porfavor Digite o Preço do Produto\n");
      return;
    } else if (this.quantidadeEmEstoqueProduto == null) {
      alert("Campo Vazio , Porfavor Digite a Quantidade em Estoque do Produto\n");
      return;
    } else if (this.categoriaProduto == "") {
      alert("Campo Vazio , Porfavor Digite a Categoria do Produto\n");
      return;
    } else if (this.precoProduto < 0) {
      alert("Porfavor digite um número positivo para o preço do produto\n");
      return;
    } else if (this.quantidadeEmEstoqueProduto < 0) {
      alert("Porfavor digite um número positivo para a quantidade em estoque\n");
      return;
    } else if (this.isDecimal(this.quantidadeEmEstoqueProduto)) {
      alert("Porfavor digite um número inteiro para a quantidade em estoque");
      return;
    }

    this.dataDeCadastroProduto = this.formatarDataParaSQL(new Date());
    var select = document.getElementById("categoriasSelect");



    this.produtoCriado = {
      produtoID: 0,
      nome: this.nomeProduto,
      preco: this.precoProduto,
      quantidadeEmEstoque: this.quantidadeEmEstoqueProduto,
      categoria: this.categoriaProduto,
      activo: (this.quantidadeEmEstoqueProduto == 0) ? false : true,
      dataDeCadastro: this.dataDeCadastroProduto
    };


    this.produtosServices.createProduto(this.produtoCriado).subscribe(res => {
      if (res) {
        alert("Produto Criado Com Sucesso\n");
        this.resetarDadosCadastroProdutos();
      }
    },
      err => {
        alert("Nome do produto já registado");
      }
    );


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

  resetarDadosCadastroProdutos() {
    this.nomeProduto = "";
    this.precoProduto = null;
    this.categoriaProduto = "";
    this.quantidadeEmEstoqueProduto = null;
  }

  voltarVisualizarProduto() {
    var visualizarProdutos = <HTMLDivElement>document.getElementsByClassName("visualizarProdutos")[0];
    var editarProduto = <HTMLDivElement>document.getElementsByClassName("editarProduto")[0];
    visualizarProdutos.classList.remove("ocultar");
    editarProduto.classList.add("ocultar");
    this.ngOnInit();
  }

  voltarVisualizarFuncionario() {
    var visualizarFuncionarios = <HTMLDivElement>document.getElementsByClassName("visualizarFuncionarios")[0];
    var editarFuncionario = <HTMLDivElement>document.getElementsByClassName("editarFuncionario")[0];
    visualizarFuncionarios.classList.remove("ocultar");
    editarFuncionario.classList.add("ocultar");
    this.inicializarListaFuncionarios();
  }

  voltarVisualizarCliente() {
    var visualizarClientes = <HTMLDivElement>document.getElementsByClassName("visualizarClientes")[0];
    var editarCliente = <HTMLDivElement>document.getElementsByClassName("editarCliente")[0];
    visualizarClientes.classList.remove("ocultar");
    editarCliente.classList.add("ocultar");
    this.inicializarListaClientes();
  }

  irParaEditarProduto(id: number) {
    var visualizarProdutos = <HTMLDivElement>document.getElementsByClassName("visualizarProdutos")[0];
    var editarProduto = <HTMLDivElement>document.getElementsByClassName("editarProduto")[0];
    visualizarProdutos.classList.add("ocultar");
    editarProduto.classList.remove("ocultar");

    this.produtosDisponiveis.forEach(produto => {
      if (produto.produtoID == id) {
        this.produtoCriado = produto;
      }
    });

    if (this.produtoCriado) {
      this.nomeProduto = this.produtoCriado.nome;
      this.categoriaProduto = this.produtoCriado.categoria;
      this.precoProduto = this.produtoCriado.preco;
      this.quantidadeEmEstoqueProduto = this.produtoCriado.quantidadeEmEstoque;
      this.dataDeCadastroProduto = this.produtoCriado.dataDeCadastro;
      this.produtoID = this.produtoCriado.produtoID;
    }

  }

  irEditarFuncionario(id: number) {
    var visualizarFuncionarios = <HTMLDivElement>document.getElementsByClassName("visualizarFuncionarios")[0];
    var editarFuncionario = <HTMLDivElement>document.getElementsByClassName("editarFuncionario")[0];
    visualizarFuncionarios.classList.add("ocultar");
    editarFuncionario.classList.remove("ocultar");

    this.funcionariosDisponiveis.forEach(func => {
      if (func.userID == id) {
        this.utilizadorCriadoCadastroAdministrador = func;
      }
    });

    if (this.utilizadorCriadoCadastroAdministrador) {
      this.nomeCompletoFuncionario = this.utilizadorCriadoCadastroAdministrador.nomeCompleto;
      this.emailFuncionario = this.utilizadorCriadoCadastroAdministrador.email;
      this.bilheteIdentidadeFuncionario = this.utilizadorCriadoCadastroAdministrador.bilheteIdentidade;
    }
  }

  irEditarCliente(id: number) {
    var visualizarClientes = <HTMLDivElement>document.getElementsByClassName("visualizarClientes")[0];
    var editarCliente = <HTMLDivElement>document.getElementsByClassName("editarCliente")[0];
    visualizarClientes.classList.add("ocultar");
    editarCliente.classList.remove("ocultar");

    this.clientesDisponiveis.forEach(cliente => {
      if (cliente.clienteID == id) {
        this.clienteCriado = cliente;
      }
    });

    if (this.clienteCriado) {
      this.nomeClienteEditar = this.clienteCriado.nome;
      this.telemovelClienteEditar = this.clienteCriado.telemovel;
    }

  }

  editarProduto() {

    if (this.nomeProduto == "") {
      alert("Campo Vazio , Porfavor Digite o Nome do Produto\n");
      return;
    } else if (this.precoProduto == null) {
      alert("Campo Vazio , Porfavor Digite o Preço do Produto\n");
      return;
    } else if (this.quantidadeEmEstoqueProduto == null) {
      alert("Campo Vazio , Porfavor Digite a Quantidade em Estoque do Produto\n");
      return;
    } else if (this.categoriaProduto == "") {
      alert("Campo Vazio , Porfavor Digite a Categoria do Produto\n");
      return;
    } else if (this.precoProduto < 0) {
      alert("Porfavor digite um número positivo para o preço do produto\n");
      return;
    } else if (this.quantidadeEmEstoqueProduto < 0) {
      alert("Porfavor digite um número positivo para a quantidade em estoque\n");
      return;
    } else if (this.isDecimal(this.quantidadeEmEstoqueProduto)) {
      alert("Porfavor digite um número inteiro para a quantidade em estoque");
      return;
    }

    this.produtoAtualizado = {
      produtoID: this.produtoID,
      nome: this.nomeProduto,
      preco: this.precoProduto,
      quantidadeEmEstoque: this.quantidadeEmEstoqueProduto,
      categoria: this.categoriaProduto,
      activo: (this.quantidadeEmEstoqueProduto == 0) ? false : true,
      dataDeCadastro: this.dataDeCadastroProduto
    };

    this.produtosServices.updateProduto(this.produtoAtualizado).subscribe(res => {
      if (res) {
        alert("Produto Atualizado Com Sucesso\n");
        this.resetarDadosCadastroProdutos();
        this.voltarVisualizarProduto();
      }
    },
      err => {
        alert("Nome do produto já existente");
      }
    );

  }

  efectuarEdicaoFuncionario() {

    if (this.nomeCompletoFuncionario == "") {
      alert("Campo Vazio , Porfavor Digite o Nome do funcionário\n");
      return;
    } else if (this.emailFuncionario == "") {
      alert("Campo Vazio , Porfavor Digite o Email\n");
      return;
    } else if (this.bilheteIdentidadeFuncionario == "") {
      alert("Campo Vazio , Porfavor Digite o nº bilhete de identidase\n");
      return;
    } else if (!this.isValidEmail(this.emailFuncionario)) {
      alert("Digite um Email no formato válido\n");
      return;
    }

    if (this.utilizadorCriadoCadastroAdministrador) {

      this.utilizadorCriadoCadastroAdministrador = {
        userID: this.utilizadorCriadoCadastroAdministrador.userID,
        userName: this.utilizadorCriadoCadastroAdministrador.userName,
        tipo: this.utilizadorCriadoCadastroAdministrador.tipo,
        email: this.emailFuncionario,
        nomeCompleto: this.nomeCompletoFuncionario,
        senha: this.utilizadorCriadoCadastroAdministrador.senha,
        bilheteIdentidade: this.bilheteIdentidadeFuncionario
      }

      this.utilizadoresService.updateUtilizador(this.utilizadorCriadoCadastroAdministrador).subscribe(res => {
        if (res) {
          alert("Funcionário Atualizado Com Sucesso\n");
          this.voltarVisualizarFuncionario();
        }
      },
        err => {
          alert("Bilhete de Identidade já existente");
        }
      );

    }

  }

  efectuarEdicaoCliente() {

    if (this.nomeClienteEditar == "") {
      alert("Campo Vazio , Porfavor Digite o Nome do Cliente\n");
      return;
    } else if (this.telemovelClienteEditar == null) {
      alert("Campo Vazio , Porfavor Digite o nº de telemóvel\n");
      return;
    }

    if (this.clienteCriado) {

      this.clienteCriado = {
        clienteID: this.clienteCriado.clienteID,
        nome: this.nomeClienteEditar,
        telemovel: this.telemovelClienteEditar
      }

      this.clientesServices.updateCliente(this.clienteCriado).subscribe(res => {
        if (res) {
          alert("Cliente Atualizado Com Sucesso\n");
          this.voltarVisualizarCliente();
        }
      },
        err => {
          alert("Telemóvel já existente");
        }
      );

    }

  }

  eliminarProduto(id: number) {

    this.produtosServices.deleteProduto(id).subscribe(res => {
      alert("Produto removido com Sucesso");
      this.ngOnInit();
    },
      err => {
        alert("Erro ao Remover Produto");
      }

    );
  }

  eliminarFuncionario(id: number) {
    this.utilizadoresService.deleteUtilizador(id).subscribe(res => {
      alert("Funcionário removido com Sucesso");
      this.inicializarListaFuncionarios();
    },
      err => {
        alert("Erro ao Remover Funcionario");
      }

    );
  }

  eliminarCliente(id: number) {
    this.clientesServices.deleteCliente(id).subscribe(res => {
      alert("Cliente removido com Sucesso");
      this.inicializarListaClientes();
    },
      err => {
        alert("Erro ao Remover Cliente");
      }

    );
  }

  fazerCadastroCliente() {
    if (this.nomeCliente == "") {
      alert("Campo Vazio , Porfavor Digite o Nome do Cliente\n");
      return;
    } else if (this.telemovel == null) {
      alert("Campo Vazio , Porfavor Digite o Telemóvel\n");
      return;
    } else if (this.telemovel < 0) {
      alert("Porfavor digite um número válido (positivo) para o Telemóvel\n");
      return;
    } else if (this.isDecimal(this.telemovel)) {
      alert("Porfavor digite um número inteiro para o telemovel");
      return;
    }

    this.clienteCriado = {
      clienteID: 0,
      nome: this.nomeCliente,
      telemovel: this.telemovel
    }

    this.clientesServices.createCliente(this.clienteCriado).subscribe(res => {
      if (res != -1) {
        alert("Cliente Criado Com Sucesso\n");
        this.telemovel = null;
        this.nomeCliente = "";
      }
    },
      err => {
        alert("Telemóvel já registado no sistema");
      }
    );
  }

  async gerarHistoricoTodasFacturas() {

    this.arrayHistoricoFacturas = [];

    var nomeFuncionario = this.dadosAdministrador.getUtilizador()?.nomeCompleto;
    var BIFuncionario = this.dadosAdministrador.getUtilizador()?.bilheteIdentidade;

    if ((nomeFuncionario != null) && (BIFuncionario != null)) {
      this.dadosHistoricoServices.administradorGerouNome = nomeFuncionario;
      this.dadosHistoricoServices.administradorGerouBI = BIFuncionario;
      this.dadosHistoricoServices.tipoRelatorio = 0;
    }

    try {

      const res = await this.facturasServices.getAllFacturas().toPromise();
      if (res != null) {
        this.facturasArmazenadas = res;
      }

      this.facturasArmazenadas.forEach(async factura => {

        const rescli = await this.clientesServices.getCliente(factura.clienteID).toPromise();
        const resFunc = await this.utilizadoresService.getUtilizador(factura.userID).toPromise();

        if ((rescli != null) && (resFunc != null)) {


          this.dadoHistoricoCriado = {
            dataFatura: factura.dataFactura,
            numeroFatura: factura.facturaID,
            nomeCliente: rescli?.nome,
            nomeFuncionario: resFunc.nomeCompleto,
            BIFuncionario: resFunc.bilheteIdentidade,
            telemovelCliente: rescli.telemovel,
            quantidade: 0,
            total: factura.total
          }

          this.arrayHistoricoFacturas.push(this.dadoHistoricoCriado);
        }

      });

      //passar para o serviço
      this.dadosHistoricoServices.dadosHistoricosFaturas = this.arrayHistoricoFacturas;
      //

      this.router.navigateByUrl('/facturaHistorico');

    } catch (err) {
      console.log("Facturas nao retornadas");
    }

  }

  async gerarRelatorioPeriodo() {

    this.arrayHistoricoFacturas = [];

    if (this.dataComeco == "") {
      alert("Campo Vazio , Porfavor digite a Data de Começo\n");
      return;
    } else if (this.dataFim == "") {
      alert("Campo Vazio , Porfavor digite a Data de Fim\n");
      return;
    }

    const data1 = new Date(this.dataComeco);
    const data2 = new Date(this.dataFim);

    if (data1 > data2) {
      alert("A data de começo precisa ser menor que a data de fim");
      return;
    }



    /////
    /////
    ////

    var nomeFuncionario = this.dadosAdministrador.getUtilizador()?.nomeCompleto;
    var BIFuncionario = this.dadosAdministrador.getUtilizador()?.bilheteIdentidade;

    if ((nomeFuncionario != null) && (BIFuncionario != null)) {
      this.dadosHistoricoServices.administradorGerouNome = nomeFuncionario;
      this.dadosHistoricoServices.administradorGerouBI = BIFuncionario;
      this.dadosHistoricoServices.dataComeco = this.dataComeco;
      this.dadosHistoricoServices.dataFim = this.dataFim;
      this.dadosHistoricoServices.tipoRelatorio = 1;
    }

    try {

      const res = await this.facturasServices.getFacturasByDataFactura(this.dataComeco, this.dataFim + " 23:59:59").toPromise();
      if (res != null) {
        this.facturasArmazenadas = res;
      }

      console.log(res);

      this.facturasArmazenadas.forEach(async factura => {

        const rescli = await this.clientesServices.getCliente(factura.clienteID).toPromise();
        const resFunc = await this.utilizadoresService.getUtilizador(factura.userID).toPromise();

        if ((rescli != null) && (resFunc != null)) {


          this.dadoHistoricoCriado = {
            dataFatura: factura.dataFactura,
            numeroFatura: factura.facturaID,
            nomeCliente: rescli?.nome,
            nomeFuncionario: resFunc.nomeCompleto,
            BIFuncionario: resFunc.bilheteIdentidade,
            telemovelCliente: rescli.telemovel,
            quantidade: 0,
            total: factura.total
          }

          this.arrayHistoricoFacturas.push(this.dadoHistoricoCriado);
        }

      });

      //passar para o serviço
      this.dadosHistoricoServices.dadosHistoricosFaturas = this.arrayHistoricoFacturas;
      //

      this.router.navigateByUrl('/facturaHistorico');

    } catch (err) {
      console.log("Facturas nao retornadas");
    }

    ////
    ///
    ///

  }

  async gerarRelatorioProduto() {

    this.arrayHistoricoFacturas = [];

    if (this.nomeProdutoFactura == "") {
      alert("Campo Vazio , Porfavor digite o Nome do produto\n");
      return;
    }

    var nomeFuncionario = this.dadosAdministrador.getUtilizador()?.nomeCompleto;
    var BIFuncionario = this.dadosAdministrador.getUtilizador()?.bilheteIdentidade;

    if ((nomeFuncionario != null) && (BIFuncionario != null)) {
      this.dadosHistoricoServices.administradorGerouNome = nomeFuncionario;
      this.dadosHistoricoServices.administradorGerouBI = BIFuncionario;
      this.dadosHistoricoServices.tipoRelatorio = 2;
    }

    try {
      const res = await this.produtosServices.getProdutoByNome(this.nomeProdutoFactura).toPromise();

      if (res != null) {

        this.dadosHistoricoServices.nomeProduto = res.nome;
        var id = res.produtoID;
        const resFacturasProdutos = await this.facturasProdutosServices.getFacturasProdutosByProduto(id).toPromise();

        if (resFacturasProdutos != null) {

          resFacturasProdutos.forEach(async facturaProduto => {

            const resFactura = await this.facturasServices.getFactura(facturaProduto.facturaID).toPromise();
            if (resFactura != null) {

              const resUtilizador = await this.utilizadoresService.getUtilizador(resFactura.userID).toPromise();
              const resCliente = await this.clientesServices.getCliente(resFactura.clienteID).toPromise();

              if ((resCliente != null) && (resUtilizador != null)) {

                this.dadoHistoricoCriado = {
                  numeroFatura: resFactura.facturaID,
                  dataFatura: resFactura.dataFactura,
                  nomeFuncionario: resUtilizador.nomeCompleto,
                  nomeCliente: resCliente.nome,
                  telemovelCliente: resCliente.telemovel,
                  BIFuncionario: resUtilizador.bilheteIdentidade,
                  quantidade: facturaProduto.quantidade,
                  total: facturaProduto.subTotal
                }

                //
                this.arrayHistoricoFacturas.push(this.dadoHistoricoCriado);
                //

              }
            }
          });

          //passar para o serviço
          this.dadosHistoricoServices.dadosHistoricosFaturas = this.arrayHistoricoFacturas;
          //

          this.router.navigateByUrl('/facturaHistorico');

          console.log(this.arrayHistoricoFacturas);

        }

      } else {
        alert("Produto não encontrado");
        console.log("Produto não encontrado");
      }
    } catch (err) {
      alert("Produto não encontrado");
      console.log("Produto não encontrado");
    }

    this.nomeProdutoFactura == "";


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

      this.utilizadorCriadoCadastroAdministrador = {
        userID: userID,
        email: email,
        bilheteIdentidade: BI,
        nomeCompleto: nome,
        senha: this.novaSenha,
        tipo: tipo,
        userName: userName
      }

      console.log(this.utilizadorCriadoCadastroAdministrador);

      this.utilizadoresService.updateUtilizador(this.utilizadorCriadoCadastroAdministrador).subscribe(res => {
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
