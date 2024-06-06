import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MovieList } from '../models/movielist.interface';
import { ParMovieList } from '../models/perfil.model';
import { Atividade } from '../models/atividade.interface';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  private listaAtual = new BehaviorSubject<ParMovieList | MovieList | null>(null);
  public readonly data$ = this.listaAtual.asObservable();
  private listaEditar = new BehaviorSubject<ParMovieList | MovieList | null>(null);
  public readonly dataEditar$ = this.listaEditar.asObservable();

  private atividades = new BehaviorSubject<Atividade[] | null>(null)
  public readonly dataAtividades$ = this.atividades.asObservable();

  constructor() { }

  setData(data: any) {
    this.listaAtual.next(data);
  }

  setDataEditar(data: any) {
    this.listaEditar.next(data)
  }

  setDataAtividades(data: Atividade[]) {
    this.atividades.next(data)
  }
}

