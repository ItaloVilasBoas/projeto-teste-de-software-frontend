import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ValidaSenhaForte } from '../validators/senha-forte.validator';
import { ValidaSenhasIguais } from '../validators/confirma-senha.validator';
import { UsuarioService } from '../../services/usuario.service';
import { UsuarioRequest } from '../../models/usuario.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dialog-cadastro',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './dialog-cadastro.component.html',
  styleUrl: './dialog-cadastro.component.sass'
})
export class DialogCadastroComponent {
  nome = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.required, Validators.email]);
  senha = new FormControl('', [Validators.required, ValidaSenhaForte()])
  confirmaSenha = new FormControl('', [Validators.required, ValidaSenhasIguais(this.senha)])
  nomeErrorMessage = '';
  emailErrorMessage = '';
  senhaErrorMessage = '';
  confirmaSenhaErrorMessage = '';
  hide = true

  constructor(private usuarioService: UsuarioService,
              private _snackBar: MatSnackBar) {}

  updateNomeErrorMessage() {
    this.nomeErrorMessage = '';
    if(this.nome.hasError('required'))
      this.nomeErrorMessage = 'Campo nome de usuario é obrigatório'
  }

  updateEmailErrorMessage() {
    this.emailErrorMessage = '';
    if(this.email.hasError('required'))
      this.emailErrorMessage = 'Campo email é obrigatório'
    else if(this.email.hasError('email'))
      this.emailErrorMessage = 'Email inválido'
  }

  updateSenhaErrorMessage() {
    this.senhaErrorMessage = '';
    if(this.senha.hasError('required'))
      this.senhaErrorMessage = 'Campo senha é obrigatório'
    else if(this.senha.hasError('senhaFraca'))
      this.senhaErrorMessage =
      `Senha inválida: mínimo 8 caracteres, 1 maiúscula, 1 minúscula, 1 número`
  }

  updateConfirmaSenhaErrorMessage() {
    this.confirmaSenhaErrorMessage = '';
    if(this.confirmaSenha.hasError('required'))
      this.confirmaSenhaErrorMessage = 'Confirme a sua senha'
    else if(this.confirmaSenha.hasError('senhaDiferente'))
      this.confirmaSenhaErrorMessage = 'Senhas diferem';
  }

  cadastrarUsuario() {
    if(this.nome.valid && this.email.valid && this.senha.valid && this.confirmaSenha.valid){
      let usuario: UsuarioRequest = {
        nome: this.nome.value!,
        email: this.email.value!,
        senha: this.senha.value!,
      }
      this.usuarioService.cadastrarUsuario(usuario)
        .subscribe({
          next: res => console.log(res),
          error: err => {
            let res = err.error ? JSON.parse(err.error) : err
            this._snackBar.open(res.message, "Ok")
          }
        })
    }
  }
}
