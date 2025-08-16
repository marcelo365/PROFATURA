import { Component } from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { PaginaInicialComponent } from './components/pagina-inicial/pagina-inicial.component';
import { LoginComponent } from './components/login/login.component';
import { AdministradorComponent } from './components/administrador/administrador.component';
import { UsuarioNormalComponent } from './components/usuario-normal/usuario-normal.component';
import { HttpClientModule } from '@angular/common/http';
import { Router } from 'express';
import { routes } from './app.routes';
import { CommonModule } from '@angular/common';
import { FacturaPDFComponent } from './components/factura-pdf/factura-pdf.component';
import { HistoricoFacturaPDFComponent } from './components/historico-factura-pdf/historico-factura-pdf.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet , PaginaInicialComponent , LoginComponent , RouterLink , AdministradorComponent , UsuarioNormalComponent , HttpClientModule , CommonModule , FacturaPDFComponent , HistoricoFacturaPDFComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'SistemaFaturacaoAngular';
}
