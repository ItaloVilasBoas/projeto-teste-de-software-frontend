import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Perfil } from '../../../models/perfil.model';
import { PerfilService } from '../../../services/perfil.service';
import { ItemFilme } from '../../../models/item-filme.interface';
import { MovieList } from '../../../models/movielist.interface';
import { ItemMenu } from '../types/item-menu.type';
import { SharedDataService } from '../../../services/shared-data.service';
import { ItemMovieList } from '../../../models/item-movielist.interface';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfirmacaoComponent } from '../../../shared/dialog-confirmacao/dialog-confirmacao.component';

@Component({
  selector: 'app-usuario.page',
  templateUrl: './usuario.page.component.html',
  styleUrl: './usuario.page.component.sass'
})
export class UsuarioPageComponent {
  perfil!: Perfil
  favoritos!: ItemMovieList[]
  filmesCompletos!: ItemFilme[]
  filmesAssistindo!: ItemFilme[]
  filmesPlanejaAssistir!: ItemFilme[]
  percentualCompleto !: number
  percentualAssistindo!: number
  percentualPlanejaAssistir!: number
  menuPerfil: ItemMenu[] = []

  constructor(private route: ActivatedRoute,
              private router: Router,
              private dialog: MatDialog,
              private perfilService: PerfilService,
              private sharedDataService: SharedDataService) {
    let nomeUsuario = this.route.snapshot.paramMap.get('nomeUsuario')!
    this.perfilService.encontrarPerfil(nomeUsuario).subscribe(perfil => {
      this.perfil = perfil
      if(!this.perfil.fotoPerfil)
        this.perfil.fotoPerfil = 'https://s.ltrbxd.com/static/img/avatar1000.a71b6e9c.png'
      if(!this.perfil.headerPerfil)
        this.perfil.headerPerfil = ''
      this.inicializarListaFilmes(perfil)
      this.inicializarMenu(perfil.listaMovieList)
    })
  }

  inicializarListaFilmes(perfil: Perfil) {
    let total = perfil.listaFilmes.length
    this.filmesCompletos = perfil.listaFilmes.filter(f => f.status == 'completo')
    this.filmesAssistindo = perfil.listaFilmes.filter(f => f.status == 'assistindo')
    this.filmesPlanejaAssistir = perfil.listaFilmes.filter(f => f.status == 'planeja-assistir')
    this.percentualCompleto = this.filmesCompletos.length / total
    this.percentualAssistindo = this.filmesAssistindo.length / total
    this.percentualPlanejaAssistir= this.filmesPlanejaAssistir.length / total
    // this.favoritos = perfil.listaFilmes.filter(f => f.favorito)
    this.favoritos = perfil.listaMovieList[0].itens
  }

  inicializarMenu(listasPerfil: MovieList[]) {
    this.menuPerfil.push({
      titulo: 'Perfil', ativo: false, rota: '',
      data: { titulo: '', descricao: '', itens: this.favoritos, comentarios: [], likes:[] }
    })
    this.menuPerfil.push({
      titulo: 'Completos', ativo: false, rota: 'l/completos',
      data: { titulo: 'Completos', descricao: '', itens: this.filmesCompletos, comentarios: [], likes:[] }
    })
    this.menuPerfil.push({
      titulo: 'Assistindo', ativo: false, rota: 'l/assistindo',
      data: { titulo: 'Assistindo', descricao: '', itens: this.filmesAssistindo, comentarios: [], likes:[] }
    })
    this.menuPerfil.push({
      titulo: 'Planeja Assistir', ativo: false, rota: 'l/planeja-assistir',
      data: { titulo: 'Planeja Assistir', descricao: '', itens: this.filmesPlanejaAssistir, comentarios: [], likes:[] }
    })
    listasPerfil.forEach(lista => {
      this.menuPerfil.push({
        titulo: lista.titulo, ativo: false, rota: `l/${this.slugify(lista.titulo)}`, data: lista
      })
    })
    this.menuPerfil
      .filter(r => this.router.url.includes(r.rota))
      .pop()!.ativo = true
    this.sharedDataService.setData(this.menuPerfil.find(f => f.ativo)!.data)
  }

  criarLista() {
    this.menuPerfil.find(m => m.ativo)!.ativo = false
    this.sharedDataService.setData({})
    this.router.navigate([`/u/${this.perfil.nomeUsuario}/lista`])
  }

  mudarAba(itemMenu: ItemMenu) {
    if(this.router.url != `/u/${this.perfil.nomeUsuario}/lista`)
      return this.redirecionar(itemMenu)

    this.dialog.open(DialogConfirmacaoComponent,
       {
         data: {
           titulo: 'Deseja sair da criação/edição de lista?',
           mensagem: 'Cuidado, se continuar perderá todas as modificações realizadas!'
       }})
     .afterClosed().subscribe({
       next: resposta =>  {if(resposta) this.redirecionar(itemMenu)}
     })
  }

  redirecionar(itemMenu: ItemMenu) {
    let rotaAtiva = this.menuPerfil.find(m => m.ativo)
    if(rotaAtiva)
      rotaAtiva.ativo = false
    itemMenu.ativo = true
    this.sharedDataService.setData(itemMenu.data)
    this.router.navigate([`/u/${this.perfil.nomeUsuario}/${itemMenu.rota}`])
  }

  slugify(str: string) {
    return  str.replace(/^\s+|\s+$/g, '')
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
  }
}
