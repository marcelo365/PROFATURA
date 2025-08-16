import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterModule, provideRouter } from '@angular/router';
import { UtilizadoresService } from '../../services/utilizadores.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { error } from 'console';
import { Utilizador } from '../../models/Utilizador';
import { DadosAdministradorService } from '../../services/dados-administrador.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HttpClientModule, CommonModule, RouterLink, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent {
  userName: string = "";
  senha: string = "";
  utilizadorEncontrado : Utilizador | null = null;

  utilizadoresService = inject(UtilizadoresService);
  router = inject(Router);
  dadosAdministrador = inject(DadosAdministradorService);

  constructor(){

  }
  

  fazerLogin() {

    if (this.userName == "") {
      alert("Campo Vazio , Porfavor Digite o seu Username\n");
      return;
    } else if (this.senha == "") {
      alert("Campo Vazio , Porfavor Digite a sua Senha\n");
      return;
    }

    this.utilizadoresService.getUtilizadorByUsername(this.userName).subscribe(res => {

      if (res.senha == this.senha) {
        //ir para outro componente
       console.log(res);
        this.dadosAdministrador.setUtilizador(res);
        if(res.tipo == 1){
          this.router.navigateByUrl('/administrador');
        } else{
          this.router.navigateByUrl('/usuarioNormal');
        }
        
      } else {
        console.log(this.senha + "\n" + res.senha);
        console.log(res);
        alert("Senha Incorrecta\n");
      }


    },
    err =>{
      if(err.status == 404){
        alert("Username Não Encontrado");
      }
    }
    );

  }






}
