import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatInputModule } from '@angular/material/input'
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog'
import { DialogLoginComponent } from '../dialog-login/dialog-login.component';
import { DialogCadastroComponent } from '../dialog-cadastro/dialog-cadastro.component';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.services';
import { Router } from '@angular/router'
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { CardService } from '../../services/card.service';
import { FilmeSerieResponse } from '../../models/filme-serie-response.interface';
import { FilmeStore } from '../../store/filmes/filmes.reducer';
import { Store, select } from '@ngrx/store';
import { add } from '../../store/filmes/filmes.action';
import { PerfilService } from '../../services/perfil.service';
import { DialogConfirmacaoComponent } from '../dialog-confirmacao/dialog-confirmacao.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatInputModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.sass'
})
export class HeaderComponent {
  logado = false
  nomeUsuarioAual = ''
  searchControl: FormControl = new FormControl;
  searchResultados: FilmeSerieResponse[] = []

  constructor(public dialog: MatDialog,
              private _snackBar: MatSnackBar,
              private store: Store<FilmeStore>,
              private authService: AuthService,
              private router: Router,
              private perfilService: PerfilService,
              private cardService: CardService) {
    const token = this.authService.getToken()
    if(token){
      this.logado = true
      this.nomeUsuarioAual = this.authService.getNomeUsuarioAtual()!
    }
    this.searchControl.valueChanges.pipe(debounceTime(1000)).subscribe(novoValor => {
      this.getResultadoSearch(novoValor)
    });
    if(authService.getNomeUsuarioAtual()) {
      this.store.pipe(select('filmes'), takeUntilDestroyed(), switchMap((store: any) => {
        if(store.filmes.length)
          return []
        return this.perfilService.encontrarPerfil(this.authService.getNomeUsuarioAtual()!)
      })).subscribe(perfil => {
        perfil?.listaFilmes?.forEach(filme => this.store.dispatch(add(filme)))
      })
    }
  }

  getResultadoSearch(busca: string) {
    this.cardService.pesquisarTodos(busca).subscribe({
      next: res => {
        this.searchResultados = res.filmes
      },
      error: _ => this._snackBar.open('Erro na busca. Por favor, tente novamente', 'Ok')
    })
  }

  openLogoutConfiramacao() {
    this.dialog.open(DialogConfirmacaoComponent, {
      data: {
        titulo: 'Sair',
        mensagem: 'Deseja mesmo sair de sua conta?'
      }
    }).afterClosed().subscribe(result => {
      if(result) {
        this.logado = false
        this.authService.clear()
        window.location.reload()
      }
    })
  }

  openLoginDialog(): void {
    this.dialog.open(DialogLoginComponent, {
      autoFocus: false,
    }).afterClosed().subscribe(result => {
      if(result)
        this.logado = true
    })
  }

  openCadastroDialog(): void {
    this.dialog.open(DialogCadastroComponent, {
      autoFocus: false,
    })
  }

  navegarParaFilme(idFilme: number): void {
    this.router.navigate([`/f/${idFilme}`]).then(() => {
      window.location.reload()
    })
  }

  navegarPaginaHome(): void {
    this.router.navigate(['/'])
  }

  navegarPaginaFilmes(): void {
    this.router.navigate(['/filmes'])
  }

  navegarPaginaListas(): void {
    this.router.navigate(['/l/'])
  }

  navegarPerfil(): void {
    this.router.navigate([`/u/${this.nomeUsuarioAual}`])
  }
}
