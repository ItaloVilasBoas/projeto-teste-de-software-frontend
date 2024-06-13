import { Component } from '@angular/core';
import { PerfilService } from '../../../services/perfil.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.services';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FilmesRecomendados } from '../../../models/recomendacoes.interface';

@Component({
  selector: 'app-recomenda.page',
  templateUrl: './recomenda.page.component.html',
  styleUrl: './recomenda.page.component.sass'
})
export class RecomendaPageComponent {
  recomendacoes: FilmesRecomendados[] = []

  constructor(private perfilService: PerfilService,
              private authService: AuthService,
              private _snackBar: MatSnackBar,
              private router: Router)
  {
    let idUsuarioAtual = this.authService.getIdUsuarioAtual()
    if(idUsuarioAtual)
      this.perfilService.recomendarFilmes(idUsuarioAtual)
        .pipe(takeUntilDestroyed())
        .subscribe({
          next: res => this.recomendacoes = res.filter(res => res.second.length > 0),
          error: _ => this._snackBar.open("Ocorreu um erro ao buscar as recomendações para seu perfil", "Ok")
        })
    else
      this.router.navigate([''])
  }

  navegarParaFilme(idFilme: number) {
    this.router.navigate([`f/${idFilme}`])
  }
}
