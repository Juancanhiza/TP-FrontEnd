import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ServiciosListComponent } from './servicios-list/servicios-list.component';
import { ServiciosCreateComponent } from './servicios-create/servicios-create.component';

const routes: Routes = [
  { path: 'serviciosPrincipal',  component: ServiciosListComponent },
  { path: 'serviciosPrincipal/add', component: ServiciosCreateComponent }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServiciosPrincipalRoutingModule { }
