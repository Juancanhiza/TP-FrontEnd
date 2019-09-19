import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReservasAddComponent } from './reservas-add/reservas-add.component';
import { ReservasEditComponent } from './reservas-edit/reservas-edit.component';
import { ReservasListComponent } from './reservas-list/reservas-list.component';


const routes: Routes = [
  { path: 'reserva/add',  component: ReservasAddComponent }, 
  { path: 'reserva/edit/:id',  component: ReservasEditComponent },
  { path: 'reservas',  component: ReservasListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReservasRoutingModule { }
