import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SubcategoriaComponent } from './subcategoria/subcategoria.component';
import { PacientesComponent } from './pacientes/pacientes-list/pacientes.component';

const appRoutes: Routes = [
  { path: 'subcategorias', component:SubcategoriaComponent },
  //{ path: 'pacientes', component:PacientesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
