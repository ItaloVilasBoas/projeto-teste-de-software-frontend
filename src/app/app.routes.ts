import { Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./features/home/home.module')
      .then(mod => mod.HomeModule)
  },
  {
    path: 'listas-populares',
    loadChildren: () => import('./features/lista/lista.module')
      .then(mod => mod.ListaModule)
  },
  {
    path: 'feed',
    canActivate: [ AuthGuard ],
    loadChildren: () => import('./features/feed/feed.module')
      .then(mod => mod.FeedModule)
  },
  {
    path: 'recomenda',
    canActivate: [ AuthGuard ],
    loadChildren: () => import('./features/recomenda/recomenda.module')
      .then(mod => mod.RecomendaModule)
  },
  {
    path: 'u/:nomeUsuario',
    loadChildren: () => import('./features/usuario/usuario.module')
      .then(mod => mod.UsuarioModule)
  },
  {
    path: 'l/:nomeUsuario/:idLista',
    loadChildren: () => import('./features/home/home.module')
      .then(mod => mod.HomeModule)
  },
  {
    // path: 'f/:tituloFilme/:anoFilme',
    path: 'f/:idFilme',
    loadChildren: () => import('./features/filme/filme.module')
      .then(mod => mod.FilmeModule)
  },
];
