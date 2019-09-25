import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SubcategoriaComponent } from './subcategoria/subcategoria.component';
import { PacientesComponent } from './pacientes/pacientes-list/pacientes.component';
import { ArchivoComponent } from './archivo/archivo.component';

const appRoutes: Routes = [
  {
    path: '', 
    redirectTo: 'reservas', 
    pathMatch: 'full'
  },
  { path: 'subcategorias', component:SubcategoriaComponent },
  { path: 'archivo', component: ArchivoComponent}
  //{ path: 'pacientes', component:PacientesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
