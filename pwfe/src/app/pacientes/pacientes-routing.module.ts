import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PacientesAddComponent } from './pacientes-add/pacientes-add.component';
import { PacientesEditComponent } from './pacientes-edit/pacientes-edit.component';
import { PacientesComponent } from './pacientes-list/pacientes.component';

const pacientesRoutes: Routes = [
  { path: 'pacientes',  component: PacientesComponent },
  { path: 'pacientes/add',  component: PacientesAddComponent },
  { path: 'pacientes/edit/:id',  component: PacientesEditComponent },
];

@NgModule({
  imports: [RouterModule.forChild(pacientesRoutes)],
  exports: [RouterModule]
})
export class PacientesRoutingModule { }
