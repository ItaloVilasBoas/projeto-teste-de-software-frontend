import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselCardComponent } from './carousel-card/carousel-card.component';
import { CarouselComponent } from './carousel/carousel.component';
import { PopularListComponent } from './popular-list/popular-list.component';
import { MatIconModule } from '@angular/material/icon'
import { MatGridListModule } from '@angular/material/grid-list'
import { MatIconButton } from '@angular/material/button';

@NgModule({
  declarations: [ CarouselCardComponent, CarouselComponent, PopularListComponent ],
  imports: [
    CommonModule,
    MatIconModule,
    MatIconButton,
    MatGridListModule
  ],
  exports: [ CarouselCardComponent, CarouselComponent, PopularListComponent ]
})
export class HomeComponentsModule { }
