import { Component } from '@angular/core';
import { SvgCircle } from '../../types/circle.type';
import { ngResizeObserverProviders, NgResizeObserver } from "ng-resize-observer";
import { map, Observable } from 'rxjs'

@Component({
  selector: 'carousel-card',
  templateUrl: './carousel-card.component.html',
  styleUrl: './carousel-card.component.sass',
  providers: [ ngResizeObserverProviders ]
})
export class CarouselCardComponent {
  circles$: Observable<SvgCircle[]> = this.resize$.pipe(
      map(entry => {
        const newCircles: SvgCircle[] = [];
        let quantidadeCirculos = (entry.contentRect.width/28) | 0;
        for (let index = 0; index < quantidadeCirculos; index++) {
          newCircles.push({
            cx: 14.5 + 28 * index,
            cy: 14.5,
            r: 9.5,
          })
        }
        return newCircles;
      })
    );

  constructor(private resize$: NgResizeObserver) { }
}
