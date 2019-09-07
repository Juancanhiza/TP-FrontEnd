import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoriaComponent } from './categoria/categoria.component';
import { SubcategoriaComponent } from './subcategoria/subcategoria.component';
import { PacientesComponent } from './pacientes/pacientes.component';

const appRoutes: Routes = [
  { path: 'categorias', component:CategoriaComponent },
  { path: 'subcategorias', component:SubcategoriaComponent },
  { path: 'pacientes', component:PacientesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
