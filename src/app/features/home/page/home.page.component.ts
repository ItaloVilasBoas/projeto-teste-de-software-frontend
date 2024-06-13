import { Component } from '@angular/core';
import { CardCarousel } from '../types/card-carousel.type';
import { CardService } from '../../../services/card.service';
import { ListaPopularResponse } from '../../../models/lista-popular-response.interface';
import { ListaService } from '../../../services/lista.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'home-page',
  templateUrl: './home.page.component.html',
  styleUrl: './home.page.component.sass'
})
export class HomePageComponent {
  carousel: CardCarousel[] = []
  listasPopulares: ListaPopularResponse[] = []

  constructor(private cardService: CardService,
              private _snackBar: MatSnackBar,
              private router: Router,
              private listaService: ListaService){
    const positionCssClasses: Record<number, string> = {
      0: 'actual',
      1: 'next',
      5: 'prev'
    };

    this.cardService.mostrarFilmesPopulares()
      .pipe(takeUntilDestroyed())
      .subscribe({
        next: (res) => {
          res.slice(0, 6).forEach(filme =>  {
            this.carousel.push({
              idFilme: filme.id,
              pos: this.carousel.length,
              img: filme.urlImagemFundo!,
              css: positionCssClasses[this.carousel.length] || 'hide',
              texto: filme.titulo!
            });
          });
        },
        error: (_) => this._snackBar.open('Erro ao carregar os filmes populares', 'Fechar')
      })
    this.listaService.mostrarListasPopulares()
      .pipe(takeUntilDestroyed())
      .subscribe({
        next: (res) => {
          this.listasPopulares = res.slice(0, 4)
        }
      })
  }

  irParaExplorarMais() {
    this.router.navigate([`listas-populares`])
  }
}

