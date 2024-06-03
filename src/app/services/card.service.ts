import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EnvVariables } from '../env';
import { FilmeResponse } from '../models/filme-response.interface';
import { FilmeSerieResponse } from '../models/filme-serie-response.interface';
import { PessoaResponse } from '../models/pessoa-response.interface';
import { MultiBuscaResponse } from '../models/card-multi-busca.interface';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  baseUrl: string = `${EnvVariables.BASE_API_URL}/card`;

  constructor(private httpClient: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({'Content-type': 'application/json'})
  }

  mostrarFilmesPopulares(): Observable<FilmeResponse[]> {
    return this.httpClient.get<FilmeResponse[]>(`${this.baseUrl}/populares`)
  }

  pesquisarTodos(busca: string): Observable<MultiBuscaResponse> {
    return this.httpClient.get<MultiBuscaResponse>(`${this.baseUrl}?nome=${busca}`)
  }

  pesquisarFilmes(busca: string): Observable<FilmeSerieResponse> {
    return this.httpClient.get<FilmeSerieResponse>(`${this.baseUrl}/filme?nome=${busca}`)
  }

  detalharFilmes(idFilme: string): Observable<FilmeResponse> {
    return this.httpClient.get<FilmeResponse>(`${this.baseUrl}/filme/${idFilme}`)
  }

  pesquisarSeries(busca: string): Observable<FilmeSerieResponse> {
    return this.httpClient.get<FilmeSerieResponse>(`${this.baseUrl}/serie?nome=${busca}`)
  }

  detalharSerie(idFilme: string): Observable<FilmeResponse> {
    return this.httpClient.get<FilmeResponse>(`${this.baseUrl}/serie/${idFilme}`)
  }

  pesquisarPessoas(busca: string): Observable<PessoaResponse> {
    return this.httpClient.get<PessoaResponse>(`${this.baseUrl}/pessoa?nome=${busca}`)
  }
}
