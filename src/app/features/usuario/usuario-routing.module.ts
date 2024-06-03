import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuarioPageComponent } from './page/usuario.page.component';
import { ListaComponent } from './components/lista/lista.component';
import { NetworkComponent } from './components/network/network.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { EditarListaComponent } from './components/editar-lista/editar-lista.component';

const routes: Routes = [
  {
    path: '',
    component: UsuarioPageComponent,
    children: [
      {
        path: '',
        component: PerfilComponent
      },
      {
        path: 'l/:slugLista',
        component: ListaComponent
      },
      {
        path: 'lista',
        component: EditarListaComponent
      },
      {
        path: 'rede',
        component: NetworkComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioRoutingModule { }
