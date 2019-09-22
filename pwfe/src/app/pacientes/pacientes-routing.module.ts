import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PacientesAddComponent } from './pacientes-add/pacientes-add.component';
import { PacientesEditComponent } from './pacientes-edit/pacientes-edit.component';
import { PacientesComponent } from './pacientes-list/pacientes.component';
import { AuthGuard } from '../login/guard';

const pacientesRoutes: Routes = [
  { path: 'pacientes',  component: PacientesComponent, canActivate: [AuthGuard] },
  { path: 'pacientes/add',  component: PacientesAddComponent, canActivate: [AuthGuard] },
  { path: 'pacientes/edit/:id',  component: PacientesEditComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(pacientesRoutes)],
  exports: [RouterModule]
})
export class PacientesRoutingModule { }
