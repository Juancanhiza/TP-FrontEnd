import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoriaListComponent } from './categoria-list/categoria-list.component';
import { CategoriaAddComponent } from './categoria-add/categoria-add.component';
import { CategoriaEditComponent } from './categoria-edit/categoria-edit.component';

const routes: Routes = [
  { path: 'categorias',  component: CategoriaListComponent },
  { path: 'categorias/add',  component: CategoriaAddComponent },
  { path: 'categorias/edit/:id',  component: CategoriaEditComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriasRoutingModule { }
