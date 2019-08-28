import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ServiciosAddComponent } from './servicios-add/servicios-add.component';
import { ServiciosEditComponent } from './servicios-edit/servicios-edit.component';
import { ServiciosDetailComponent } from './servicios-detail/servicios-detail.component';
import { ServiciosListComponent } from './servicios-list/servicios-list.component';


const serviciosRoutes: Routes = [
  { path: 'servicio/add',  component: ServiciosAddComponent }, 
  { path: 'servicio/edit/:id',  component: ServiciosEditComponent },
/*   { path: 'servicios/:id',  component: ServiciosDetailComponent },*/
  { path: 'servicios',  component: ServiciosListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(serviciosRoutes)],
  exports: [RouterModule]
})
export class ServiciosRoutingModule { }
