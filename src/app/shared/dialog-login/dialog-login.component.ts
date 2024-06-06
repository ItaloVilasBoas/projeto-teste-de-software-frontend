import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card'
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { UsuarioService } from '../../services/usuario.service';
import { AuthService } from '../../services/auth.services';
import { PerfilService } from '../../services/perfil.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-dialog-login',
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
  templateUrl: './dialog-login.component.html',
  styleUrl: './dialog-login.component.sass'
})
export class DialogLoginComponent {
  email = new FormControl('', [Validators.required, Validators.email]);
  senha = new FormControl('', [Validators.required])
  emailErrorMessage = '';
  senhaErrorMessage = '';
  hide = true

  constructor(private usuarioService: UsuarioService,
              private authService: AuthService,
              private _snackBar: MatSnackBar,
              private perfilService: PerfilService,
              private dialogRef: MatDialogRef<DialogLoginComponent>) { }

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
  }

  fazerLogin() {
    this.usuarioService.validarLogin(this.email.value!, this.senha.value!)
      .pipe(switchMap((token: string) => {
        this.authService.setToken(token);
        return this.perfilService.encontrarPerfilAtual(token)
      }))
      .subscribe({
        next: perfil => {
          this.authService.setNomeUsuarioAtual(perfil.nomeUsuario)
          this.authService.setIdUsuarioAtual(perfil.idPerfil)
          window.location.reload()
          this.dialogRef.close(true)
        },
        error: err => {
          let res = err.error ? JSON.parse(err.error) : err
          this._snackBar.open(res.message, "Ok")
        }
      })
  }
}
