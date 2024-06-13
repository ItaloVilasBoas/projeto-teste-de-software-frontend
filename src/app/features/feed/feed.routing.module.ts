import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FeedPageComponent } from "./page/feed.page.component";

const routes: Routes = [
  {
    path: '',
    component: FeedPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeedRoutingModule { }
