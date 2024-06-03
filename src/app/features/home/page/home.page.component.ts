import { Component } from '@angular/core';
import { CardCarousel } from '../types/card-carousel.type';
import { CardService } from '../../../services/card.service';
import { ListaPopularResponse } from '../../../models/lista-popular-response.interface';
import { ListaService } from '../../../services/lista.service';

@Component({
  selector: 'home-page',
  templateUrl: './home.page.component.html',
  styleUrl: './home.page.component.sass'
})
export class HomePageComponent {
  carousel: CardCarousel[] = []
  listasPopulares: ListaPopularResponse[] = []

  constructor(private cardService: CardService, private listaService: ListaService){
    this.cardService.mostrarFilmesPopulares()
      .subscribe({
        next: (res) => {
          res.slice(0, 6).forEach(
            filme => {
              this.carousel.push({
                idFilme: filme.id,
                pos: this.carousel.length,
                img: filme.urlImagemFundo!,
                css: this.carousel.length == 0 ? 'actual' :
                    this.carousel.length == 1 ? 'next' :
                    this.carousel.length == 5 ? 'prev' : 'hide',
                texto: filme.titulo!
              })
            }
          )
        },
        error: (err) => {

        }
      })

    this.listaService.mostrarListasPopulares()
      .subscribe({
        next: (res) => {
          this.listasPopulares = res
        }
      })
  }
}
