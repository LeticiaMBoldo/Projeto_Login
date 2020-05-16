import { Component } from '@angular/core';

/* Importação do Alert*/
import { AlertController } from '@ionic/angular'

/* Importação do Router para ajudar nas rotas */
import { Router } from '@angular/router'

/* Importações para utilizar o formulário com validação */
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../services/usuario.service';

/* 
  Para o formulário funcionar é preciso importar 
  ReactiveFormsModule no arquivo .module.ts
*/

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  /* Variavel que recebe o formulário de login */
  public formLogin: FormGroup;

  /* Variavel que armazena as mensagens de verificação */
  public mensagens_validacao = {
    email: [
      { tipo: 'required', mensagem: 'O campo E-mail é obrigatório' },
      { tipo: 'email', mensagem: 'E-mail inválido' },
    ],
    senha: [
      { tipo: 'required', mensagem: 'É obrigatório digitar a senha' },
      { tipo: 'minlength', mensagem: 'A senha deve ter no mínimo 6 caracteres' },
      { tipo: 'maxlength', mensagem: 'A senha deve ter no máximo 8 caracteres' },
    ]
  }

  /* FormBuilder precisa ser declarado no construtor para funcionar */
  /* AlertController precisa ser declarado no construtor para funcionar */
  /* Router precisa ser declarado no construtor para funcionar */
  /* UsuarioService é o seviço responsavel pelo Storage*/
  constructor(
    public formBuilder: FormBuilder, 
    public alertController: AlertController, 
    public router: Router,
    public usuarioService: UsuarioService
    ) {

    /* Montando o formulário */
    this.formLogin = formBuilder.group({
      /* Declarando os campos do formulário */

      /*
        '' armazena os valores digitados
        Validator.compose junta validações
        .email valida para ver se é um email
        .required é um campo obrigatório
        .minLength valida se tem no mínimo 6 caracteres
        .maxLength valida se tem no máximo 8 caracteres
      */
      email: ['', Validators.compose([Validators.email, Validators.required])],
      senha: ['', Validators.compose([Validators.minLength(6), Validators.maxLength(8), Validators.required])]
    });
  }

  /* Criando a função de login */
  public async login() {
    /* Validando se o formulário é valido ou não */
    if (this.formLogin.valid) {
      /* Variaveis para verificar os dados */
      let email = this.formLogin.value.email;
      let senha = this.formLogin.value.senha;

      //Verifica o email e senha de acordo com o método login do Service
      if (await this.usuarioService.login(email, senha)) {
        this.router.navigateByUrl('painel-usuario');
      } else {
        /* Alerta de usuário inválido */
        this.alertUserInvalid();
      }

    } else {
      /* Alerta de formulário inválido */
      this.alertFormInvalid();
    }
  }

  /* Para o Alert aparecer é preciso criar um função */
  async alertFormInvalid() {
    const alert = await this.alertController.create({
      header: 'Erro',
      message: 'Formulário inválido, confira os dados',
      buttons: ['OK']
    });

    await alert.present();
  }

  async alertUserInvalid() {
    const alert = await this.alertController.create({
      header: 'Erro',
      message: 'E-mail/Senha inválido, confira os dados',
      buttons: ['OK']
    });

    await alert.present();
  }
}