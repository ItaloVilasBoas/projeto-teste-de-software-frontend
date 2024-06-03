import { Component } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { ItemMovieList } from '../../../../models/item-movielist.interface';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SharedDataService } from '../../../../services/shared-data.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [ CommonModule, MatGridListModule ],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.sass'
})
export class PerfilComponent {
  favoritos!: ItemMovieList[]

  constructor(private sharedDataService: SharedDataService) {
    this.sharedDataService.data$
      .pipe(takeUntilDestroyed())
      .subscribe(data => {
        this.favoritos = data!.itens
      })
  }
}
