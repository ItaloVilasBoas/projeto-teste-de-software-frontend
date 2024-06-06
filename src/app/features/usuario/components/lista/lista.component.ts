import { Component } from '@angular/core';
import { SharedDataService } from '../../../../services/shared-data.service';
import { MovieList } from '../../../../models/movielist.interface';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { ItemFilme } from '../../../../models/item-filme.interface';
import { ItemMovieList } from '../../../../models/item-movielist.interface';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../../../services/auth.services';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { DialogFilmeComponent } from '../../../../shared/dialog-filme/dialog-filme.component';
import { MatDialog } from '@angular/material/dialog';
import { ListaService } from '../../../../services/lista.service';
import { DialogConfirmacaoComponent } from '../../../../shared/dialog-confirmacao/dialog-confirmacao.component';
import { FilmeStore } from '../../../../store/filmes/filmes.reducer';
import { Store, select } from '@ngrx/store';
import { remove, save } from '../../../../store/filmes/filmes.action';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-lista',
  standalone: true,
  imports: [ CommonModule, MatGridListModule, MatButtonModule, MatIconModule ],
  templateUrl: './lista.component.html',
  styleUrl: './lista.component.sass'
})
export class ListaComponent {
  idMovieList: number | undefined
  movieList!: MovieList
  listaPertenceUsuarioAtual = false

  constructor(private sharedDataService: SharedDataService,
              private _snackBar: MatSnackBar,
              private store: Store<FilmeStore>,
              private router: Router,
              private dialog: MatDialog,
              private listaService: ListaService,
              private authService: AuthService) {
    this.sharedDataService.data$
      .pipe(takeUntilDestroyed())
      .subscribe(data => {
        const { first, second } = 'first' in data! ? data : { first: undefined, second: data! }
        this.idMovieList = first
        this.movieList = second
      })

    if(this.authService.getNomeUsuarioAtual()) {
      this.listaPertenceUsuarioAtual = this.router.url.includes(this.authService.getNomeUsuarioAtual()!)
      if(this.ehListaPadrao(this.movieList.titulo)) {
        this.store.pipe(select('filmes'), takeUntilDestroyed()).subscribe((store: any) => {
          const mapIds = this.movieList.itens.map(f => f.idTmdb)
          this.movieList.itens = store.filmes.filter((f: ItemFilme) => mapIds.includes(f.idTmdb))
        })
      }
    }
  }

  abrirDialogConfirmacao(itemFilme: any) {
    this.dialog.open(DialogConfirmacaoComponent, {
        data: {
          titulo: 'Remover Filme',
          mensagem: `Tem certeza que deseja remover ${itemFilme.nomeTmdb}?`
        }
      })
      .afterClosed().subscribe(confirma => {
        if(confirma) {
          let token = this.authService.getToken()
          let idPerfil = this.authService.getIdUsuarioAtual()
          if(idPerfil && token) {
            this.listaService.removerFilme(idPerfil, token, itemFilme.idTmdb).subscribe({
              next: _ => this.store.dispatch(remove(itemFilme)),
              error: _ => this._snackBar.open('Não foi possível realizar essa operação. Por favor, tente novamente', 'Ok')
            })
          }
        }
      })
  }

  abrirDialogFilme(itemFilme: any) {
    this.dialog.open(DialogFilmeComponent, {
      data: {
        idTmdb: itemFilme.idTmdb,
        nomeTmdb: itemFilme.nomeTmdb,
        status: itemFilme.status,
        score: itemFilme.score,
        comentario: itemFilme.comentario,
        favorito: itemFilme.favorito,
        urlImage: itemFilme.urlImage
      }
    })
    .afterClosed().subscribe(itemEditado => {
      if(itemEditado) {
        this.store.dispatch(save(itemEditado))
        if(itemEditado.status != itemFilme.status)
          this.movieList.itens = this.movieList.itens.filter(f => f.idTmdb != itemEditado.idTmdb)
      }
    })
  }

  irParaPaginaFilme(id: number) {
    this.router.navigate([`/f/${id}`])
  }

  temScore(item: ItemFilme | ItemMovieList) {
    return 'score' in item
  }

  getArrayScore(item: any) {
    return Array.from(
      { length: Math.floor(item.score) },
      (_, index) => index + 1
    )
  }

  tamanhoEstrelaCortada(item: any) {
    return 100 - ((item.score - Math.floor(item.score)) * 100)
  }

  ehListaPadrao(titulo: string) {
    return ['Completos', 'Assistindo', 'Planeja Assistir'].includes(titulo)
  }

  abrirDialogConfirmacaoExcluirLista() {
    this.dialog.open(DialogConfirmacaoComponent, {
        data: {
          titulo: 'Remover Lista',
          mensagem: `Tem certeza que deseja excluir ${this.movieList.titulo}? essa ação não pode ser desfeita`
        }
      })
      .afterClosed().subscribe(confirma => {
        if(confirma) {
          let token = this.authService.getToken()
          if(token && this.idMovieList) {
            this.listaService.excluirLista(this.idMovieList, token).subscribe({
              next: () => {
                this.router.navigate([`/u/${this.authService.getNomeUsuarioAtual()}`])
                  .then(() => window.location.reload())
              },
              error: _ => this._snackBar.open('Não foi possível realizar essa operação. Por favor, tente novamente', 'Ok')
            })
          }
        }
      })
  }

  editarLista() {
    this.sharedDataService.setDataEditar({ first: this.idMovieList, second: this.movieList })
    this.router.navigate([`/u/${this.authService.getNomeUsuarioAtual()}/lista`])
  }
}

