import { Component } from '@angular/core';
import { FilmeResponse } from '../../../models/filme-response.interface';
import { CardService } from '../../../services/card.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../services/auth.services';
import { DialogFilmeComponent } from '../../../shared/dialog-filme/dialog-filme.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogLoginComponent } from '../../../shared/dialog-login/dialog-login.component';

@Component({
  selector: 'app-filme.page',
  templateUrl: './filme.page.component.html',
  styleUrl: './filme.page.component.sass'
})
export class FilmePageComponent {
  filme!: FilmeResponse
  abaAtual = 'elenco'

  constructor(private route: ActivatedRoute,
              private authService: AuthService,
              private dialog: MatDialog,
              private cardService: CardService) {
    let idFilme = this.route.snapshot.paramMap.get('idFilme')!
    this.cardService.detalharFilmes(idFilme).subscribe({
      next: data => this.filme = data,
      error: err => console.log(err)
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
      })
    } else {
      this.dialog.open(DialogLoginComponent, {

      })
    }
  }

  trocarAba(novaAba: string) {
    this.abaAtual = novaAba
  }
}
