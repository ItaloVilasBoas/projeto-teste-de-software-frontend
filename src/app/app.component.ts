import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent],
  template: `
    <header>
      <app-header/>
    </header>
    <router-outlet></router-outlet>
    <div style="height: 200px; display: flex; align-items: center; justify-content: center;">
      footer
    </div>
  `,
})
export class AppComponent {
  title = 'frontend';
}
