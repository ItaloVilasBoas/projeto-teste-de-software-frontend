import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedPageComponent } from './page/feed.page.component';
import { FeedRoutingModule } from './feed.routing.module';

@NgModule({
  declarations: [ FeedPageComponent ],
  imports: [
    FeedRoutingModule,
    CommonModule
  ],
  exports: [ FeedPageComponent ]
})
export class FeedModule { }
