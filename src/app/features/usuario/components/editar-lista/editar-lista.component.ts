import { Component } from '@angular/core';
import { SharedDataService } from '../../../../services/shared-data.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MovieList } from '../../../../models/movielist.interface';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilmeSerieResponse } from '../../../../models/filme-serie-response.interface';
import { debounceTime, switchMap } from 'rxjs';
import { CardService } from '../../../../services/card.service';
import { ItemFilme } from '../../../../models/item-filme.interface';
import { ItemMovieList } from '../../../../models/item-movielist.interface';
import { ListaService } from '../../../../services/lista.service';
import { AuthService } from '../../../../services/auth.services';
import { slugify } from '../../composables/slugify';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ParMovieList } from '../../../../models/perfil.model';

@Component({
  selector: 'app-editar-lista',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './editar-lista.component.html',
  styleUrl: './editar-lista.component.sass'
})
export class EditarListaComponent {
  idMovieList: number | undefined
  data!: MovieList
  tituloLista: FormControl = new FormControl;
  searchControl: FormControl = new FormControl;
  searchResultados: FilmeSerieResponse[] = []
  tituloErrorMessage = ''

  constructor(private sharedDataService: SharedDataService,
              private _snackBar: MatSnackBar,
              private router: Router,
              private authService: AuthService,
              private cardService: CardService,
              private listaService: ListaService) {
    this.sharedDataService.dataEditar$
      .pipe(takeUntilDestroyed())
      .subscribe(data => this.inicializaEditarLista(data))
    this.searchControl.valueChanges.pipe(debounceTime(1000))
      .pipe(switchMap(novoValor =>  this.cardService.pesquisarTodos(novoValor)))
      .subscribe({
        next: res => this.searchResultados = res.filmes,
        error: _ => this._snackBar.open('Ocorreu um erro ao buscar filmes', 'Fechar')
      })
  }

  inicializaEditarLista(data: any): void {
    if(data && 'first' in data)
      this.idMovieList = data.first
    this.data = this.inicializaData(data)
    this.tituloLista = new FormControl(this.data.titulo)
  }

  inicializaData(data: MovieList | ParMovieList):  MovieList {
    if(data && 'first' in data)
      return data.second
    else if(data)
      this.data = data
    return { titulo: '', descricao: '', itens: [], comentarios: [], likes: [] }
  }

  adicionarItem(item: FilmeSerieResponse): void {
    if(!this.data.itens.find(i => i.idTmdb == item.id))
      this.data.itens.push({
        idTmdb: item.id,
        nomeTmdb: item.titulo,
        urlImage: item.urlImagem
      })
  }

  removerItem(item: ItemMovieList | ItemFilme): void {
    this.data.itens = this.data.itens.filter(i => i.idTmdb != item.idTmdb)
  }

  updateTituloListaMessage(): void {
    this.tituloErrorMessage= '';
    if(this.tituloLista.hasError('required'))
      this.tituloErrorMessage = 'É necessário fornecer um titulo para a lista'
  }

  salvarLista(): void {
    if(this.tituloLista.invalid){
      this.updateTituloListaMessage()
      return
    }

    this.data.titulo = this.tituloLista.value
    let idPerfil = this.authService.getIdUsuarioAtual()
    let token = this.authService.getToken()
    let url = this.router.url.replace('lista', '')
    if(idPerfil && token) {
      const acao = this.idMovieList ?
        this.listaService.atualizarLista(idPerfil, this.idMovieList, this.data, token) :
        this.listaService.criarLista(idPerfil, this.data, token)
      acao.subscribe({
        next: () => {
          this.router.navigate([`${url}/l/${slugify(this.data.titulo)}`])
            .then(() => window.location.reload())
        },
        error: _ =>
          this._snackBar.open('Não foi possível realizar essa operação. Por favor, tente novamente', 'Ok')
      })
    }
  }
}
