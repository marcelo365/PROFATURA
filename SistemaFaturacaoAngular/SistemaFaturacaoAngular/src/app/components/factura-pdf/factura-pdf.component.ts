import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FacturaPDFService } from '../../services/factura-pdf.service';
import html2canvas from 'html2canvas';
import jsPDF, * as jspdf from 'jspdf';
import { DadosAdministradorService } from '../../services/dados-administrador.service';
import { ProdutoFactura } from '../../models/ProdutoFactura';
import { Router } from '@angular/router';

@Component({
  selector: 'app-factura-pdf',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './factura-pdf.component.html',
  styleUrl: './factura-pdf.component.scss'
})
export class FacturaPDFComponent implements OnInit, AfterViewInit {

  facturaPDFServices = inject(FacturaPDFService);
  dadosAdmn = inject(DadosAdministradorService);
  router = inject(Router);
  cr = inject(ChangeDetectorRef);
  //
  geradoPor: string = "";
  numeroFactura: number | null = null;
  subTotal: number | null = null;
  taxaIVA: number | null = null;
  total: number | null = null;
  produtosFactura: Array<ProdutoFactura> = [];
  dataCorrente: string = "";
  troco: number | null = null;
  quantiaPaga: number | null = null;
  nomeCliente: string = "";
  tipoPagamento: string = "";
  //

  constructor() {
  }


  ngOnInit(): void {

    var tipoPagamento = document.getElementsByClassName("tipoPagamento")[0];

    this.inicializarFactura();

    if (this.dadosAdmn.getOpcaoImprimir() == 0) {
      this.quantiaPaga = 0;
      this.nomeCliente = "Consumidor Final";
      this.numeroFactura = 0;
      tipoPagamento.classList.add("ocultar");
    } else {
      tipoPagamento.classList.remove("ocultar");
    }



    //this.router.navigateByUrl('/usuarioNormal');
  }

  ngAfterViewInit(): void {
    this.cr.detectChanges();

    this.gerarPDF();

  }



  inicializarFactura() {

    var nome = this.dadosAdmn.getUtilizador()?.nomeCompleto;
    if (nome) {
      this.geradoPor = nome;
    }

    this.subTotal = this.dadosAdmn.getSubTotal();
    this.taxaIVA = this.dadosAdmn.getTaxaIVA();
    this.total = this.dadosAdmn.getTotal();
    this.dataCorrente = this.getFormattedDateTime();
    this.tipoPagamento = this.dadosAdmn.getTipoPagamento();

    var possivelNome = this.dadosAdmn.getCliente()?.nome;
    if (possivelNome) {
      this.nomeCliente = possivelNome;
    } else {
      this.nomeCliente = "Consumidor Final";
    }

    var numeroFactura = this.dadosAdmn.getNumeroFactura();
    if (numeroFactura) {
      this.numeroFactura = numeroFactura;
    } else {
      this.numeroFactura = 0;
    }


    var produtos = this.dadosAdmn.getProdutosFatura();

    if (produtos) {
      this.produtosFactura = produtos;
    }

    if ((this.dadosAdmn.getTroco() == 0) || (this.dadosAdmn.getTroco() == null)) {
      this.quantiaPaga = this.total;
      this.troco = 0;
    } else {
      this.troco = this.dadosAdmn.getTroco();
      this.quantiaPaga = (this.total ? this.total : 0) + (this.troco ? this.troco : 0);
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
        console.log(this.subTotal);
        pdf.save('Andromeda.pdf'); // Salvando PDF
      });
    }
  }


}
