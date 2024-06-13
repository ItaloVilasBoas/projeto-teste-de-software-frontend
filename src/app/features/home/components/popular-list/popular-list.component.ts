import { Component, Input } from '@angular/core';
import { ListaPopularResponse } from '../../../../models/lista-popular-response.interface';
import { Router } from '@angular/router';
import { ListaService } from '../../../../services/lista.service';
import { AuthService } from '../../../../services/auth.services';
import { MatSnackBar } from '@angular/material/snack-bar';
import { slugify } from '../../../usuario/composables/slugify';

@Component({
  selector: 'popular-list',
  templateUrl: './popular-list.component.html',
  styleUrl: './popular-list.component.sass'
})
export class PopularListComponent {
  @Input() data!: ListaPopularResponse

  constructor(private router: Router,
              private _snackBar: MatSnackBar,
              private listaService: ListaService,
              private authService: AuthService) {}

  irParaPerfil() {
    this.router.navigate([`/u/${this.data.nomeUsuario}`])
  }

  irParaLista() {
    this.router.navigate([`/u/${this.data.nomeUsuario}/l/${slugify(this.data.nomeLista)}`])
  }

  darLike() {
    if(this.authService.getToken())
      this.listaService.adicionarLikeNaLista(this.data.idLista, this.authService.getIdUsuarioAtual()!).subscribe({
        next: res => {
          if(res.includes('adicionado'))
            this.data.quantidadeLikesLista++;
          if(res.includes('removido'))
            this.data.quantidadeLikesLista--;
        },
        error: _ => this._snackBar.open('Não foi possível realizar essa operação. Por favor, tente novamente', 'Ok')
      })
  }
}
