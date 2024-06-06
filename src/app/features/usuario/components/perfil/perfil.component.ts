import { Component, ViewEncapsulation } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { ItemMovieList } from '../../../../models/item-movielist.interface';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SharedDataService } from '../../../../services/shared-data.service';
import { CommonModule } from '@angular/common';
import { Atividade } from '../../../../models/atividade.interface';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [ CommonModule, MatGridListModule, MatIconModule, MatTooltipModule ],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.sass',
  encapsulation: ViewEncapsulation.None
})
export class PerfilComponent {
  favoritos: ItemMovieList[] = []
  atividades: Atividade[] = []

  constructor(private sharedDataService: SharedDataService) {
    this.sharedDataService.data$
      .pipe(takeUntilDestroyed())
      .subscribe(data => {
        if(data && 'first' in data)
          this.favoritos = data.second.itens;
        else if(data)
          this.favoritos = data.itens
      })
    this.sharedDataService.dataAtividades$
      .pipe(takeUntilDestroyed())
      .subscribe(data => {
        if(data)
          this.atividades = data
      })
  }

  getHtmlAcoes(atividade: Atividade): string {
    if(atividade.acao.includes('Adicionou')) {
      const pattern: RegExp = /Adicionou (.+) a (.+)/;
      const matches = pattern.exec(atividade.acao)
      return`<span>Adicionou </span>
              <a>${matches![1]}</a>
              <span>a ${matches![2]}</span>`
    }

    if(atividade.acao.includes('Removeu')) {
      const pattern: RegExp = /Removeu o filme (.+)/;
      const matches = pattern.exec(atividade.acao)
      return`<span>Removeu o filme </span>
             <a>${matches![1]}</a>`
    }

    if(atividade.acao.includes('Criou a lista')) {
      const pattern: RegExp = /Criou a lista (.+)/;
      const matches = pattern.exec(atividade.acao)
      return`<span>Criou a lista</span>
             <a>${matches![1]}</a>`
    }

    if(atividade.acao.includes('Atualizou a lista')) {
      const pattern: RegExp = /Atualizou a lista (.+)/;
      const matches = pattern.exec(atividade.acao)
      return`<span>Atualizou a lista</span>
             <a>${matches![1]}</a>`
    }

    if(atividade.acao.includes('Excluiu a lista')) {
      const pattern: RegExp = /Excluiu a lista (.+)/;
      const matches = pattern.exec(atividade.acao)
      return`<span>Excluiu a lista</span>
             <a>${matches![1]}</a>`
    }

    return ''
  }

  converteTempoDataAcao(dataAcao: Date): string{
    const seconds = Math.floor((new Date().valueOf() - new Date(dataAcao).valueOf()) / 1000);

    let interval = Math.floor(seconds / 31536000);
    if (interval > 1)
      return interval + ' anos atrás';

    interval = Math.floor(seconds / 2592000);
    if (interval > 1)
      return interval + ' meses atrás';

    interval = Math.floor(seconds / 86400);
    if (interval > 1)
      return interval + ' dias atrás';

    interval = Math.floor(seconds / 3600);
    if (interval > 1)
      return interval + ' horas atrás';

    interval = Math.floor(seconds / 60);
    if (interval > 1)
      return interval + ' minutos atrás';

    if(seconds < 10)
      return 'just now';
    return Math.floor(seconds) + ' segundos atrás';
  }
}
