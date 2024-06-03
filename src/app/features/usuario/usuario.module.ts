import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioPageComponent } from './page/usuario.page.component';
import { UsuarioComponentsModule } from './components/components.module';
import { UsuarioRoutingModule } from './usuario-routing.module';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [ UsuarioPageComponent ],
  imports: [
    CommonModule,
    MatGridListModule,
    UsuarioComponentsModule,
    MatTooltipModule,
    MatIconModule,
    UsuarioRoutingModule
  ],
  exports: [ UsuarioPageComponent ]
})
export class UsuarioModule { }
