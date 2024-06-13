import { Component } from '@angular/core';
import { ListaService } from '../../../services/lista.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ListaPopularResponse } from '../../../models/lista-popular-response.interface';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-lista.page',
  templateUrl: './lista.page.component.html',
  styleUrl: './lista.page.component.sass'
})
export class ListaPageComponent {
  listasPopulares: ListaPopularResponse[] = []
  mostrar = 4

  constructor(private listaService: ListaService,
              private _snackBar: MatSnackBar) {
    this.listaService.mostrarListasPopulares()
      .pipe(takeUntilDestroyed())
      .subscribe({
        next: (res) => {
          this.listasPopulares = res
        }
      })
  }

  mostrarMaisAction() {
    if(this.mostrar >= this.listasPopulares.length)
      this._snackBar.open('Não há mais lista popular a ser exibida', 'Ok')

    this.mostrar += 4
    // this.mostrar -= this.mostrar % this.listasPopulares.length
  }
}
