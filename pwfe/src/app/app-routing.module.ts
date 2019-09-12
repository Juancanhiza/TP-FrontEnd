import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoriaComponent } from './categoria/categoria.component';
import { SubcategoriaComponent } from './subcategoria/subcategoria.component';

const appRoutes: Routes = [
  { 
    path: 'categoria', component:CategoriaComponent 
  },
  { 
    path : 'subcategorias', component:SubcategoriaComponent 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
