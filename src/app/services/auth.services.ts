import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private storage: Storage | undefined;

  constructor(@Inject(DOCUMENT) private document: Document) {
    this.storage = this.document.defaultView?.localStorage
  }

  getIdUsuarioAtual(): number | null {
    if (!this.storage || !this.storage.getItem('idUsuario'))
      return null
    return parseInt(this.storage.getItem('idUsuario')!)
  }

  setIdUsuarioAtual(idUsuario: number): boolean {
    if(this.storage){
      this.storage.setItem('idUsuario', idUsuario.toString())
      return true
    }
    return false
  }

  getNomeUsuarioAtual(): string | null {
    if (!this.storage || !this.storage.getItem('nomeUsuario'))
      return null
    return this.storage.getItem('nomeUsuario')!
  }

  setNomeUsuarioAtual(nomeUsuario: string): boolean {
    if(this.storage){
      this.storage.setItem('nomeUsuario', nomeUsuario)
      return true
    }
    return false
  }

  getToken(): string | null {
    if (!this.storage || !this.storage.getItem('token'))
      return null
    return this.storage.getItem('token')!
  }

  setToken(token: string): boolean {
    if(this.storage){
      this.storage.setItem('token', token)
      return true
    }
    return false
  }

  remove(key: string): boolean {
    if (this.storage) {
      this.storage.removeItem(key)
      return true
    }
    return false
  }

  clear(): boolean {
    if(this.storage) {
      this.storage.removeItem('token')
      this.storage.removeItem('nomeUsuario')
      this.storage.removeItem('idUsuario')
    }
    return false
  }
}
