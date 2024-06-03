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
import { Router } from '@angular/router'
import { PerfilService } from '../../services/perfil.service';
import { MatDialogRef } from '@angular/material/dialog';

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

  constructor(private router: Router,
              private usuarioService: UsuarioService,
              private authService: AuthService,
              private perfilService: PerfilService,
              private dialogRef: MatDialogRef<DialogLoginComponent>) {
    // merge(this.email.statusChanges, this.email.valueChanges)
    //   .pipe(takeUntilDestroyed())
    //   .subscribe(() => this.updateEmailErrorMessage())
    // merge(this.senha.statusChanges, this.senha.valueChanges)
    //   .pipe(takeUntilDestroyed())
    //   .subscribe(() => this.updateSenhaErrorMessage())
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
  }

  fazerLogin() {
    this.usuarioService
      .validarLogin(this.email.value!, this.senha.value!)
      .subscribe({
        next: (token) => {
          this.authService.setToken(token)
          this.perfilService.encontrarPerfilAtual(token).subscribe(perfil => {
            this.authService.setNomeUsuarioAtual(perfil.nomeUsuario)
            this.authService.setIdUsuarioAtual(perfil.idPerfil)
            this.router.navigate([`/u/${perfil.nomeUsuario}`])
          })
          this.dialogRef.close(true)
        },
        error: (err) => {
          console.log(err)
        }
      })
  }
}
