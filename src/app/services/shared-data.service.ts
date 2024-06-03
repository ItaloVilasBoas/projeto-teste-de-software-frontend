import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MovieList } from '../models/movielist.interface';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  private listaAtual = new BehaviorSubject<MovieList | null>(null);
  public readonly data$ = this.listaAtual.asObservable();

  constructor() { }

  setData(data: any) {
    this.listaAtual.next(data);
  }
}
