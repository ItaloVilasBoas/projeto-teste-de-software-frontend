import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaRoutingModule } from './lista.routing.module';
import { ListaPageComponent } from './page/lista.page.component';
import { HomeComponentsModule } from '../home/components/home-components.module';

@NgModule({
  declarations: [ ListaPageComponent ],
  imports: [
    HomeComponentsModule,
    ListaRoutingModule,
    CommonModule
  ],
  exports: [ ListaPageComponent ]
})
export class ListaModule { }
