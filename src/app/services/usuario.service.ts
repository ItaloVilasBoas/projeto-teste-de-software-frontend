import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { UsuarioRequest } from '../models/usuario.model';
import { EnvVariables } from '../env';
import { AlterarSenhaRequest } from '../models/alterar-senha-request.mode';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  baseUrl: string = `${EnvVariables.BASE_API_URL}/usuario`;

  constructor(private httpClient: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({'Content-type': 'application/json'})
  }

  validarLogin(email: string, senha: string): Observable<string> {
    return this.httpClient.get<string>(`${this.baseUrl}/login`, {
      headers: { email: email, senha: senha },
      responseType: 'text' as 'json'
    })
  }

  cadastrarUsuario(user : UsuarioRequest): Observable<string> {
    return this.httpClient.post<string>(this.baseUrl, user, {
      responseType: 'text' as 'json'
    })
  }

  atualizarSenha(idUsuario: number, request: AlterarSenhaRequest, token: string): Observable<AlterarSenhaRequest> {
    return this.httpClient.post<AlterarSenhaRequest>(`${this.baseUrl}/${idUsuario}`, request, {
      headers: {token: token},
      responseType: 'text' as 'json'
    })
  }

  removerUsuario(idUsuario: number, token: string) {
    return this.httpClient.delete(`${this.baseUrl}/${idUsuario}`, {
      headers: {token: token},
      responseType: 'text' as 'json'
    })
  }

  handleError(error: HttpErrorResponse){
    return throwError(() => `UrlPath:  Código do erro: ${error.status}, mensagem: ${error.message}`);
  }
}
