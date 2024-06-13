import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideState, provideStore } from '@ngrx/store';
import { filmeReducer } from './store/filmes/filmes.reducer';
import { redeReducer } from './store/rede/rede.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), provideClientHydration(), provideAnimationsAsync(), provideAnimationsAsync(),
    provideHttpClient(withFetch()), provideStore(),
    provideState({name: 'filmes', reducer: filmeReducer}),
    provideState({name: 'rede', reducer: redeReducer}),
  ]
};
