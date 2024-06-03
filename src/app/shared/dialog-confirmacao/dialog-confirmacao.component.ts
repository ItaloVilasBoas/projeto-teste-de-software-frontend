import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-confirmacao',
  standalone: true,
  imports: [ MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent ],
  templateUrl: './dialog-confirmacao.component.html',
})
export class DialogConfirmacaoComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
