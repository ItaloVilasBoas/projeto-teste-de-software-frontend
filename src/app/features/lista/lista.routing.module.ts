import { RouterModule, Routes } from "@angular/router";
import { ListaPageComponent } from "./page/lista.page.component";
import { NgModule } from "@angular/core";

const routes: Routes = [
  {
    path: '',
    component: ListaPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListaRoutingModule { }
