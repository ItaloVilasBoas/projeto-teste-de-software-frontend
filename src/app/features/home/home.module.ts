import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponentsModule } from './components/home-components.module';
import { HomePageComponent } from './page/home.page.component';
import { MatGridListModule } from '@angular/material/grid-list';


@NgModule({
  declarations: [ HomePageComponent ],
  imports: [
    CommonModule,
    HomeComponentsModule,
    HomeRoutingModule,
    MatGridListModule
  ],
  exports: [ HomePageComponent ]
})
export class HomeModule { }
