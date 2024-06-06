import { Component } from '@angular/core';
import { FilmeResponse } from '../../../models/filme-response.interface';
import { CardService } from '../../../services/card.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../services/auth.services';
import { DialogFilmeComponent } from '../../../shared/dialog-filme/dialog-filme.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogLoginComponent } from '../../../shared/dialog-login/dialog-login.component';
import { Store, select } from '@ngrx/store';
import { FilmeStore } from '../../../store/filmes/filmes.reducer';
import { ItemFilme } from '../../../models/item-filme.interface';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { add } from '../../../store/filmes/filmes.action';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-filme.page',
  templateUrl: './filme.page.component.html',
  styleUrl: './filme.page.component.sass'
})
export class FilmePageComponent {
  filme!: FilmeResponse
  filmeNaLista: ItemFilme | undefined
  abaAtual = 'elenco'
  loading = true

  constructor(private route: ActivatedRoute,
              private store: Store<FilmeStore>,
              private authService: AuthService,
              private dialog: MatDialog,
              private _snackBar: MatSnackBar,
              private cardService: CardService) {
    let idFilme = this.route.snapshot.paramMap.get('idFilme')!
    this.cardService.detalharFilmes(idFilme)
      .pipe(takeUntilDestroyed(), switchMap(data => {
        this.filme = data
        return this.store.pipe(select('filmes'))
      }))
      .subscribe({
        next: (store: any) =>
         { this.filmeNaLista = store.filmes.find((f: ItemFilme) => f.idTmdb == this.filme.id) },
        error: err => this._snackBar.open(err.message, 'Ok')
      })
  }

  editarFilme() {
    this.dialog.open(DialogFilmeComponent, {
      data: this.filmeNaLista
    })
  }

  adicionarFilme() {
    if(this.authService.getToken()) {
      this.dialog.open(DialogFilmeComponent, {
        data: {
          idTmdb: this.filme.id,
          nomeTmdb: this.filme.titulo,
          urlImage: this.filme.urlCapa
        }
      }).afterClosed().forEach(resultado => {
        this.store.dispatch(add(resultado))
        this.filmeNaLista = resultado
      })
    } else {
      this.dialog.open(DialogLoginComponent, {})
    }
  }

  trocarAba(novaAba: string) {
    this.abaAtual = novaAba
  }
}
