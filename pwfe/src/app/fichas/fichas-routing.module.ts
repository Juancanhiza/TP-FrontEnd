import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FichasAddComponent } from './fichas-add/fichas-add.component';
import { FichasEditComponent } from './fichas-edit/fichas-edit.component';
import { FichasListComponent } from './fichas-list/fichas-list.component';


const routes: Routes = [
  { path: 'ficha/add',  component: FichasAddComponent }, 
  { path: 'ficha/edit/:id',  component: FichasEditComponent },
  { path: 'fichas',  component: FichasListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FichasRoutingModule { }
