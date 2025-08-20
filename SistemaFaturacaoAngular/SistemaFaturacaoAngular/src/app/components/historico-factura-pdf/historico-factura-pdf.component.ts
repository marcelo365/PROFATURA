import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DadoHistoricoFactura } from '../../models/DadoHistoricoFactura';
import { DadosHistoricoFacturaService } from '../../services/dados-historico-factura.service';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-historico-factura-pdf',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './historico-factura-pdf.component.html',
  styleUrl: './historico-factura-pdf.component.scss'
})
export class HistoricoFacturaPDFComponent implements OnInit, AfterViewInit {

  //injecções de dependencia
  dadosServices = inject(DadosHistoricoFacturaService);
  cr = inject(ChangeDetectorRef);
  //

  dataCorrente: string = this.getFormattedDateTime();
  dadosHistoricoFactura: Array<DadoHistoricoFactura> = [];
  administradorGerouNome: string = "";
  administradorGerouBI: string = "";

  //em facturas com periodo
  dataComeco: string = "";
  dataFim: string = "";
  //

  //em relatorio de venda por produto
  nomeProduto: string = "";

  //

  constructor() {
  }

  ngOnInit() {
    this.inicializarDados();
  }

  ngAfterViewInit(): void {

    this.cr.detectChanges();
    this.gerarPDF();
  }

  shouldHideQuantidade(): boolean {
    // Lógica para determinar se a quantidade deve ser ocultada
    return this.dadosServices.tipoRelatorio !== 2;
  }

  inicializarDados() {

    var periodo = document.getElementsByClassName("periodo")[0];
    var produto = document.getElementsByClassName("produto")[0];
    var quantidade = document.getElementsByClassName("quantidade")[0];
    var historico = document.getElementsByClassName("historico")[0];
    var relatorio = document.getElementsByClassName("relatorio")[0];


    this.dadosHistoricoFactura = this.dadosServices.dadosHistoricosFaturas;
    this.administradorGerouNome = this.dadosServices.administradorGerouNome;
    this.administradorGerouBI = this.dadosServices.administradorGerouBI;


    if (this.dadosServices.tipoRelatorio == 1) {
      this.dataComeco = this.dadosServices.dataComeco;
      this.dataFim = this.dadosServices.dataFim;

      periodo.classList.remove("ocultar");
      produto.classList.add("ocultar");
      historico.classList.remove("ocultar");
      relatorio.classList.add("ocultar");
      quantidade.classList.add("ocultar");

    } else if (this.dadosServices.tipoRelatorio == 0) {
      periodo.classList.add("ocultar");
      produto.classList.add("ocultar");
      historico.classList.remove("ocultar");
      relatorio.classList.add("ocultar");
      quantidade.classList.add("ocultar");

    } else {

      this.nomeProduto = this.dadosServices.nomeProduto;

      periodo.classList.add("ocultar");
      produto.classList.remove("ocultar");
      historico.classList.add("ocultar");
      relatorio.classList.remove("ocultar");
      quantidade.classList.remove("ocultar");

    }
  }

  getFormattedDateTime(): string {
    const date = new Date();

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Os meses começam do 0, então adicione 1
    const year = date.getFullYear();

    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${day}/${month}/${year} - ${hours}:${minutes}:${seconds}`;
  }

  gerarPDF() {
    var facturaElement = document.getElementById("print-area");

    if (facturaElement) {

      html2canvas(facturaElement).then((canvas) => {
        // Largura e altura do PDF
        const pdfWidth = 210;
        const pdfHeight = 297;

        const contentDataURL = canvas.toDataURL('image/png');
        let pdf = new jsPDF('p', 'mm', 'a4'); // Criando PDF
        const imgProps = pdf.getImageProperties(contentDataURL);

        const pdfHeightImg = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(contentDataURL, 'PNG', 0, 0, pdfWidth, pdfHeightImg);
        pdf.save('ProFatura.pdf'); // Salvando PDF
      });
    }
  }


}
