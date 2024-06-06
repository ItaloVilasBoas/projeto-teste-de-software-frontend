import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ CommonModule, RouterOutlet, HeaderComponent, FooterComponent ],
  template: `
    <header>
      <app-header/>
    </header>
    <router-outlet></router-outlet>
    <footer>
      <app-footer/>
    </footer>
  `,
})
export class AppComponent {
  title = 'frontend';
}
