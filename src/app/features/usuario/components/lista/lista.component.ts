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

@Component({
  selector: 'app-lista',
  standalone: true,
  imports: [ CommonModule, MatGridListModule, MatButtonModule, MatIconModule ],
  templateUrl: './lista.component.html',
  styleUrl: './lista.component.sass'
})
export class ListaComponent {
  movieList!: MovieList
  listaPertenceUsuarioAtual = false

  constructor(private sharedDataService: SharedDataService,
              private router: Router,
              private dialog: MatDialog,
              private listaService: ListaService,
              private authService: AuthService) {
    this.sharedDataService.data$
      .pipe(takeUntilDestroyed())
      .subscribe(data => this.movieList = data!)
    if(this.authService.getNomeUsuarioAtual())
      this.listaPertenceUsuarioAtual = this.router.url.includes(this.authService.getNomeUsuarioAtual()!)
  }

  abrirDialogConfirmacao(itemMenu: any) {
    this.dialog.open(DialogConfirmacaoComponent, {
        data: {
          titulo: 'Remover Filme',
          mensagem: `Tem certeza que deseja remover ${itemMenu.nomeTmdb}?`
        }
      })
      .afterClosed().subscribe(confirma => {
        if(confirma) {
          let token = this.authService.getToken()
          let idPerfil = this.authService.getIdUsuarioAtual()
          if(idPerfil && token) {
            this.listaService.removerFilme(idPerfil, token, itemMenu.idTmdb).subscribe({
              next: res => console.log(res),
              error: err => console.log(err)
            })
          }
        }
      })
  }

  abrirDialogFilme(itemMenu: any) {
    this.dialog.open(DialogFilmeComponent, {
      data: {
        idTmdb: itemMenu.idTmdb,
        nomeTmdb: itemMenu.nomeTmdb,
        status: itemMenu.status,
        score: itemMenu.score,
        comentario: itemMenu.comentario,
        favorito: itemMenu.favorito,
        urlImage: itemMenu.urlImage
      }
    })
    // .afterClosed(sucesso => {
    //   if(sucesso)
    //
    // })
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

  naoEhListaPadrao(titulo: string) {
    return !['Completos', 'Assistindo', 'Planeja Assistir'].includes(titulo)
  }
}
