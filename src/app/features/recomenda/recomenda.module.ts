import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecomendaPageComponent } from './page/recomenda.page.component';
import { RecomendaRoutingModule } from './recomenda.routing.module';

@NgModule({
  declarations: [ RecomendaPageComponent ],
  imports: [
    RecomendaRoutingModule,
    CommonModule
  ],
  exports: [ RecomendaPageComponent ]
})
export class RecomendaModule { }
