import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ItemFilme } from '../../models/item-filme.interface';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ListaService } from '../../services/lista.service';
import { AuthService } from '../../services/auth.services';

@Component({
  selector: 'app-dialog-filme',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatButtonToggleModule,
    FormsModule
  ],
  templateUrl: './dialog-filme.component.html',
  styleUrl: './dialog-filme.component.sass'
})
export class DialogFilmeComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: ItemFilme,
              private listaService: ListaService,
              private authService: AuthService,
              private dialogRef: MatDialogRef<DialogFilmeComponent>) { }

  salvar() {
    let idPerfil = this.authService.getIdUsuarioAtual()
    let token = this.authService.getToken()
    if(idPerfil && token) {
      this.listaService.adicionarFilme(idPerfil, token, this.data).subscribe({
        next: _ => this.dialogRef.close(true),
        error: err => console.log(err)
      })
    }
  }
}
