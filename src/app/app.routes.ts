import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./features/home/home.module')
      .then(mod => mod.HomeModule)
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
  // {
  //   path: 'filmes',
  //   loadChildren: () => import('./features/filme/filme.module')
  //     .then(mod => mod.FilmeModule)
  // },
  {
    // path: 'f/:tituloFilme/:anoFilme',
    path: 'f/:idFilme',
    loadChildren: () => import('./features/filme/filme.module')
      .then(mod => mod.FilmeModule)
  },
];
