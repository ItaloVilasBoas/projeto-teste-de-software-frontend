import { Component, Inject } from '@angular/core';
import { SharedDataService } from '../../../../services/shared-data.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MovieList } from '../../../../models/movielist.interface';

@Component({
  selector: 'app-editar-lista',
  templateUrl: './editar-lista.component.html',
  styleUrl: './editar-lista.component.sass'
})
export class EditarListaComponent {
  data!: MovieList

  constructor(private sharedDataService: SharedDataService) {
    this.sharedDataService.data$
      .pipe(takeUntilDestroyed())
      .subscribe(data => this.data = data!)
  }


}
