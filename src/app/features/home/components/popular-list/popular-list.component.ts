import { Component, Input } from '@angular/core';
import { ListaPopularResponse } from '../../../../models/lista-popular-response.interface';
import { Router } from '@angular/router';
import { ListaService } from '../../../../services/lista.service';
import { AuthService } from '../../../../services/auth.services';

@Component({
  selector: 'popular-list',
  templateUrl: './popular-list.component.html',
  styleUrl: './popular-list.component.sass'
})
export class PopularListComponent {
  @Input() data!: ListaPopularResponse

  constructor(private router: Router,
              private listaService: ListaService,
              private authService: AuthService) {}

  irParaPerfil() {
    this.router.navigate([`/u/${this.data.nomeUsuario}`])
  }

  irParaLista() {
    // this.router.navigate([''])
  }

  darLike() {
    if(this.authService.getToken())
      this.listaService.adicionarLikeNaLista(this.data.idLista, this.authService.getIdUsuarioAtual()!).subscribe({
        next: res => {
          if(res.includes('adicionado'))
            this.data.quantidadeLikesLista++;
          if(res.includes('removido'))
            this.data.quantidadeLikesLista--;
        },
        error: err => console.log(err)
      })
  }
}
