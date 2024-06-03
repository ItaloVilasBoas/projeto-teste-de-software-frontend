import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EnvVariables } from '../env';
import { ListaPopularResponse } from '../models/lista-popular-response.interface';
import { Observable } from 'rxjs';
import { ItemFilme } from '../models/item-filme.interface';

@Injectable({
  providedIn: 'root'
})
export class ListaService {
  baseUrl: string = `${EnvVariables.BASE_API_URL}/lista`;

  constructor(private httpClient: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({'Content-type': 'application/json'})
  }

  mostrarListasPopulares(): Observable<ListaPopularResponse[]> {
    return this.httpClient.get<ListaPopularResponse[]>(`${this.baseUrl}/populares`)
  }

  adicionarLikeNaLista(idLista: number, idPerfil: number): Observable<string> {
    return this.httpClient.put<string>(`${this.baseUrl}/likes/${idLista}?perfil=${idPerfil}`, null,{
      responseType: 'text' as 'json'
    })
  }

  removerFilme(idPerfil: number, token: string, request: number): Observable<string> {
    return this.httpClient.delete<string>(`${this.baseUrl}/usuario/${idPerfil}/filme/${request}`, {
      headers: { token: token },
      responseType: 'text' as 'json'
    })
  }

  adicionarFilme(idPerfil: number, token: string, request: ItemFilme): Observable<string> {
    return this.httpClient.post<string>(`${this.baseUrl}/usuario/${idPerfil}`, request,{
      headers: { token: token },
      responseType: 'text' as 'json'
    })
  }
}
