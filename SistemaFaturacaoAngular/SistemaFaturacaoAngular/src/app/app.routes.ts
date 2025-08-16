import { Routes , RouterModule } from '@angular/router';
import { PaginaInicialComponent } from './components/pagina-inicial/pagina-inicial.component';
import { LoginComponent } from './components/login/login.component';
import { AdministradorComponent } from './components/administrador/administrador.component';
import { UsuarioNormalComponent } from './components/usuario-normal/usuario-normal.component';
import { FacturaPDFComponent } from './components/factura-pdf/factura-pdf.component';
import { HistoricoFacturaPDFComponent } from './components/historico-factura-pdf/historico-factura-pdf.component';

export const routes: Routes = [
    { path: '', component: PaginaInicialComponent },
    { path: 'login', component: LoginComponent },
    { path: 'administrador', component: AdministradorComponent },
    { path: 'usuarioNormal', component: UsuarioNormalComponent },
    { path: 'factura', component: FacturaPDFComponent },
    { path: 'facturaHistorico', component: HistoricoFacturaPDFComponent }
];
