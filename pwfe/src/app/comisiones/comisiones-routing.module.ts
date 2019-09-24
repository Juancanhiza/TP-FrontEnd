import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ComisionesAddComponent } from './comisiones-add/comisiones-add.component';
import { ComisionesEditComponent } from './comisiones-edit/comisiones-edit.component';
import { ComisionesListComponent } from './comisiones-list/comisiones-list.component';


const routes: Routes = [
  {path: 'comision/add', component: ComisionesAddComponent},
  {path: 'comision/edit/:id', component: ComisionesEditComponent},
  {path: 'comisiones', component: ComisionesListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComisionesRoutingModule { }
