import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FilmePageComponent } from "./page/filme.page.component";

const routes: Routes = [
  {
    path: '',
    component: FilmePageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FilmeRoutingModule { }
