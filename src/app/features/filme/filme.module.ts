import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilmeRoutingModule } from './filme.routing.module';
import { FilmePageComponent } from './page/filme.page.component';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [ FilmePageComponent ],
  imports: [
    CommonModule,
    MatGridListModule,
    MatCardModule,
    MatButtonModule,
    FilmeRoutingModule
  ],
  exports: [ FilmePageComponent ],
})
export class FilmeModule { }
