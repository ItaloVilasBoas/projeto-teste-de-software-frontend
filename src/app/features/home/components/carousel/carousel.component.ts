import { Component, Input } from '@angular/core';
import { CardCarousel } from '../../types/card-carousel.type';
import { Router } from '@angular/router';

@Component({
  selector: 'carousel',
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.sass'
})
export class CarouselComponent {
  @Input() items: CardCarousel[] = []

  constructor(private router: Router) { }

  rodarCarousel(actualCard: CardCarousel): void {
    if(actualCard.css == 'actual')
      this.irParaFilme(actualCard.idFilme)
    if(actualCard.css == 'hide')
      return

    const nextCardId =  ((actualCard.pos + 1) % this.items.length)
    const prevCardId =  ((actualCard.pos - 1) < 0 ? this.items.length : actualCard.pos ) - 1
    const nextCard = this.items.find(next => next.pos === nextCardId)
    const prevCard = this.items.find(prev => prev.pos === prevCardId)

    this.items.forEach(card => card.css = 'hide')
    nextCard!.css = 'next'
    prevCard!.css = 'prev'
    actualCard.css = 'actual'
  }

  irParaFilme(id: number) {
    this.router.navigate([`/f/${id}`])
  }
}

