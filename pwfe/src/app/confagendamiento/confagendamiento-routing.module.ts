import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConfagendamientoAddComponent } from './confagendamiento-add/confagendamiento-add.component';
import { ConfagendamientoEditComponent } from './confagendamiento-edit/confagendamiento-edit.component';
import { ConfagendamientoListComponent } from './confagendamiento-list/confagendamiento-list.component';


const confAgendamientoRoutes: Routes = [
  { path: 'horario-atencion-conf/add',  component: ConfagendamientoAddComponent }, 
  { path: 'horario-atencion-conf/edit/:id',  component: ConfagendamientoEditComponent },
/*   { path: 'servicios/:id',  component: ServiciosDetailComponent },*/
  { path: 'horario-atencion-conf',  component: ConfagendamientoListComponent }
];
@NgModule({
  imports: [RouterModule.forChild(confAgendamientoRoutes)],
  exports: [RouterModule]
})
export class ConfagendamientoRoutingModule { }
