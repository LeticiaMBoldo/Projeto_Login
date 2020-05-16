import { Injectable } from '@angular/core';

//Importando o controlador do Storage 
import { Storage } from '@ionic/storage';

//Importando o controlador do Usuario
//Model que armaze a classe do usuário
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  //O Service precisa ser importado na home.page.ts

  //Importação necessária para usar o Storage nessa classe
  constructor(private storage: Storage) {
  }

  //CRUD
  //Criando um usuário

  //Método que salva o usário dentro do sistema
  /*
    Todos os métodos precisam ser 'async', pois o tempo de reação do 
    storage varia dependendo da maquina
    O 'await' aguarda o código do storage ser executado
  */
  public async salvar(usuario: Usuario){
    //O email é a chave primária da aplicação 
    //O email é utilizado para guardar as informações do usuário
    if(usuario.email) {
      //.set(chave, valor)
      await this.storage.set(usuario.email, usuario);
      return true;
    } else {
      return false;
    } 
  }

  //Método que busca um usuário pelo seu email
  public async busca(email){
    //Variavel local para armazenar um usuário
    let usuario: Usuario;

    /*
      .then => Se deu certo buscar alguma coisa pelo email
      eu vou recebeu um 'valor' que pode ser nulo ou não
      Se não for nulo ele atribui uma valor para o usuário
      Se o email não existir vai retorna como nulo
    */
    await this.storage.get(email).then(valor => {
      if(valor){
        usuario = valor;
      } else {
        usuario = null;
      }
    });
    return usuario;
  }

  //Método que busca todos os usuários cadastrados no banco de dados
  public async buscarTodos() {
    //Variavel que armazena uma lista de usuários
    let usuarios = [];

    /*
      .forEach | Percorre o Storage e armazena cada valor dentro do Array
      .then | Se der certo ele retorna a lista de usuários
      .catch | Se der errado ele retorna um Array vazio
    */
      return await this.storage.forEach((valor, chave, i) => {
      usuarios.push(valor);
    }).then(() => {
      return usuarios;
    }).catch(() => {
      usuarios = [];
    });
  }

  //Método que deleta um usuário
  public async excluir(email) {
    return await this.storage.remove(email);
  }

  //Método que realiza o login
  public async login(email: string, senha: string) {
    let usuario: Usuario;

    await this.storage.get(email).then(valor => {
      //Valida se o usuário é valido
      if(valor && valor.senha == senha) {
        usuario = valor;
      } else {
        usuario = null;
      }
    });
    return usuario;
  }
}