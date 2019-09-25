import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConfagendamientoAddComponent } from './confagendamiento-add/confagendamiento-add.component';
import { ConfagendamientoEditComponent } from './confagendamiento-edit/confagendamiento-edit.component';
import { ConfagendamientoListComponent } from './confagendamiento-list/confagendamiento-list.component';
import { AuthGuard } from '../login/guard';


const confAgendamientoRoutes: Routes = [
  { path: 'horario-atencion-conf/add',  component: ConfagendamientoAddComponent, canActivate: [AuthGuard] }, 
  { path: 'horario-atencion-conf/edit/:id',  component: ConfagendamientoEditComponent, canActivate: [AuthGuard] },
/*   { path: 'servicios/:id',  component: ServiciosDetailComponent },*/
  { path: 'horario-atencion-conf',  component: ConfagendamientoListComponent, canActivate: [AuthGuard] }
];
@NgModule({
  imports: [RouterModule.forChild(confAgendamientoRoutes)],
  exports: [RouterModule]
})
export class ConfagendamientoRoutingModule { }
