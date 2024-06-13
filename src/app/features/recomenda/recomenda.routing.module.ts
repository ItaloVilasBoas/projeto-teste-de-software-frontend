import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RecomendaPageComponent } from "./page/recomenda.page.component";

const routes: Routes = [
  {
    path: '',
    component: RecomendaPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecomendaRoutingModule { }
