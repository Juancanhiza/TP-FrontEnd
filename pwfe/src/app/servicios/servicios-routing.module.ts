import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ServiciosAddComponent } from './servicios-add/servicios-add.component';
import { ServiciosEditComponent } from './servicios-edit/servicios-edit.component';
import { ServiciosDetailComponent } from './servicios-detail/servicios-detail.component';
import { ServiciosListComponent } from './servicios-list/servicios-list.component';
import { AuthGuard } from '../login/guard';


const serviciosRoutes: Routes = [
  { path: 'servicio-admin/add',  component: ServiciosAddComponent, canActivate: [AuthGuard] }, 
  { path: 'servicio-admin/edit/:id',  component: ServiciosEditComponent, canActivate: [AuthGuard] },
/*   { path: 'servicios/:id',  component: ServiciosDetailComponent },*/
  { path: 'servicios-admin',  component: ServiciosListComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(serviciosRoutes)],
  exports: [RouterModule]
})
export class ServiciosRoutingModule { }
