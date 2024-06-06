import { Component, OnDestroy } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { ParMovieList, Perfil } from '../../../models/perfil.model';
import { PerfilService } from '../../../services/perfil.service';
import { ItemFilme } from '../../../models/item-filme.interface';
import { ItemMenu } from '../types/item-menu.type';
import { SharedDataService } from '../../../services/shared-data.service';
import { ItemMovieList } from '../../../models/item-movielist.interface';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfirmacaoComponent } from '../../../shared/dialog-confirmacao/dialog-confirmacao.component';
import { AuthService } from '../../../services/auth.services';
import { slugify } from '../composables/slugify';
import { Store, select } from '@ngrx/store';
import { FilmeStore } from '../../../store/filmes/filmes.reducer';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-usuario.page',
  templateUrl: './usuario.page.component.html',
  styleUrl: './usuario.page.component.sass'
})
export class UsuarioPageComponent implements OnDestroy {
  headerPerfil = ''
  perfil!: Perfil
  menuPerfil: ItemMenu[] = []
  favoritos: ItemMovieList[] = []
  filmesCompletos: ItemFilme[] = []
  filmesAssistindo: ItemFilme[] = []
  filmesPlanejaAssistir: ItemFilme[] = []
  percentualCompleto!: number
  percentualAssistindo!: number
  percentualPlanejaAssistir!: number
  listaPertenceUsuarioAtual = false
  storeSubscription!: Subscription

  constructor(private route: ActivatedRoute,
              private store: Store<FilmeStore>,
              private router: Router,
              private dialog: MatDialog,
              private authService: AuthService,
              private perfilService: PerfilService,
              private sharedDataService: SharedDataService) {
    let nomeUsuario = this.route.snapshot.paramMap.get('nomeUsuario')!
    this.perfilService.encontrarPerfil(nomeUsuario)
      .pipe(takeUntilDestroyed())
      .subscribe(perfil => {
        this.perfil = perfil
        if(!this.perfil.fotoPerfil)
          this.perfil.fotoPerfil = 'https://s.ltrbxd.com/static/img/avatar1000.a71b6e9c.png'
        this.headerPerfil = this.perfil.headerPerfil ? this.perfil.headerPerfil : ''
        this.inicializarStoreSubscription(perfil)
        this.inicializarListaFilmes(perfil)
        this.inicializarMenu(perfil.listaMovieList)
        this.sharedDataService.setDataAtividades(perfil.listaAtividades)
      })
    if(this.authService.getNomeUsuarioAtual())
      this.listaPertenceUsuarioAtual = this.router.url.includes(this.authService.getNomeUsuarioAtual()!)
  }

  inicializarStoreSubscription(perfil: Perfil) {
    this.storeSubscription = this.store
      .pipe(select('filmes'))
      .subscribe((store: any) => {
        if(this.listaPertenceUsuarioAtual)
          this.perfil.listaFilmes = store.filmes
        this.filmesCompletos = perfil.listaFilmes.filter(f => f.status == 'completo')
        this.filmesAssistindo = perfil.listaFilmes.filter(f => f.status == 'assistindo')
        this.filmesPlanejaAssistir = perfil.listaFilmes.filter(f => f.status == 'planeja-assistir')
        this.favoritos = perfil.listaFilmes.filter(f => f.favorito)
      })
  }

  ngOnDestroy(): void {
    this.storeSubscription.unsubscribe()
  }

  inicializarListaFilmes(perfil: Perfil) {
    let total = perfil.listaFilmes.length
    this.filmesCompletos = perfil.listaFilmes.filter(f => f.status == 'completo')
    this.filmesAssistindo = perfil.listaFilmes.filter(f => f.status == 'assistindo')
    this.filmesPlanejaAssistir = perfil.listaFilmes.filter(f => f.status == 'planeja-assistir')
    this.percentualCompleto = this.filmesCompletos.length / total
    this.percentualAssistindo = this.filmesAssistindo.length / total
    this.percentualPlanejaAssistir= this.filmesPlanejaAssistir.length / total
    this.favoritos = perfil.listaFilmes.filter(f => f.favorito)
  }

  inicializarMenu(listasPerfil: ParMovieList[]) {
    this.menuPerfil.push({
      titulo: 'Perfil', ativo: false, rota: '',
      data: { titulo: '', descricao: '', itens: this.favoritos, comentarios: [], likes:[] },
      callItens: () => this.favoritos
    })
    this.menuPerfil.push({
      titulo: 'Completos', ativo: false, rota: 'l/completos',
      data: { titulo: 'Completos', descricao: '', itens: this.filmesCompletos, comentarios: [], likes:[] },
      callItens: () => this.filmesCompletos
    })
    this.menuPerfil.push({
      titulo: 'Assistindo', ativo: false, rota: 'l/assistindo',
      data: { titulo: 'Assistindo', descricao: '', itens: this.filmesAssistindo, comentarios: [], likes:[] },
      callItens: () => this.filmesAssistindo
    })
    this.menuPerfil.push({
      titulo: 'Planeja Assistir', ativo: false, rota: 'l/planeja-assistir',
      data: { titulo: 'Planeja Assistir', descricao: '', itens: this.filmesPlanejaAssistir, comentarios: [], likes:[] },
      callItens: () => this.filmesPlanejaAssistir
    })
    listasPerfil.forEach(lista => {
      this.menuPerfil.push({
        titulo: lista.second.titulo, ativo: false, rota: `l/${slugify(lista.second.titulo)}`, data: lista,
      })
    })
    let rotaAtual = this.router.url.split(`/u/${this.perfil.nomeUsuario}/`).pop()
    this.menuPerfil
      .filter(r => rotaAtual == r.rota)
      .pop()!.ativo = true
    this.sharedDataService.setData(this.menuPerfil.find(f => f.ativo)!.data)
  }

  criarLista() {
    this.menuPerfil.find(m => m.ativo)!.ativo = false
    this.sharedDataService.setDataEditar({
      titulo: '',
      descricao: '',
      itens: [],
      comentarios: [],
      likes: []
    })
    this.router.navigate([`/u/${this.perfil.nomeUsuario}/lista`])
  }

  mudarAba(itemMenu: ItemMenu) {
    if(this.router.url != `/u/${this.perfil.nomeUsuario}/lista`)
      return this.redirecionar(itemMenu)

    this.dialog.open(DialogConfirmacaoComponent, {
         data: {
           titulo: 'Deseja sair da criação/edição de lista?',
           mensagem: 'Cuidado, se continuar perderá todas as modificações realizadas!'
       }})
     .afterClosed().subscribe({
       next: resposta =>  {
         if(resposta)
           this.redirecionar(itemMenu)
       }
     })
  }

  redirecionar(itemMenu: ItemMenu) {
    let rotaAtiva = this.menuPerfil.find(m => m.ativo)
    if(rotaAtiva)
      rotaAtiva.ativo = false
    itemMenu.ativo = true
    if(itemMenu.callItens) {
      if('second' in itemMenu.data)
        itemMenu.data.second.itens = itemMenu.callItens()
      else
        itemMenu.data.itens = itemMenu.callItens()
    }
    this.sharedDataService.setData(itemMenu.data)
    this.router.navigate([`/u/${this.perfil.nomeUsuario}/${itemMenu.rota}`])
  }
}

