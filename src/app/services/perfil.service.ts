import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { EnvVariables } from '../env';
import { Perfil } from '../models/perfil.model';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {
  baseUrl: string = `${EnvVariables.BASE_API_URL}/perfil`;

  constructor(private httpClient: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({'Content-type': 'application/json'})
  }

  encontrarPerfilAtual(token: string): Observable<Perfil> {
    return this.httpClient.get<Perfil>(this.baseUrl, {
      headers: { token: token},
    })
  }

  encontrarPerfil(nomeUsuario: string): Observable<Perfil> {
    return this.httpClient.get<Perfil>(`${this.baseUrl}/${nomeUsuario}`)
  }

  handleError(error: HttpErrorResponse){
    return throwError(() => `UrlPath:  Código do erro: ${error.status}, mensagem: ${error.message}`);
  }
}
