import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConfagendamientoExcepEditComponent } from './confagendamiento-excep-edit/confagendamiento-excep-edit.component';
import { ConfagendamientoExcepListComponent } from './confagendamiento-excep-list/confagendamiento-excep-list.component';
import { ConfagendamientoExcepAddComponent } from './confagendamiento-excep-add/confagendamiento-excep-add.component';


const routes: Routes = [
  { path: 'horario-atencion-excep-conf/add',  component: ConfagendamientoExcepAddComponent }, 
  { path: 'horario-atencion-excep-conf/edit/:id',  component: ConfagendamientoExcepEditComponent },
  { path: 'horario-atencion-excep-conf',  component: ConfagendamientoExcepListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfagendamientoExcepRoutingModule { }
