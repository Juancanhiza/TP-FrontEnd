import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriasRoutingModule } from './categorias-routing.module';
import { CategoriaListComponent } from './categoria-list/categoria-list.component';
import { CategoriaAddComponent } from './categoria-add/categoria-add.component';
import { CategoriaEditComponent } from './categoria-edit/categoria-edit.component';
import { FormsModule } from '@angular/forms';
import { PaginacionSharedModule } from '../paginacionShared/paginacionShared.module';



@NgModule({
  declarations: [CategoriaListComponent, CategoriaAddComponent, CategoriaEditComponent],
  imports: [
    CommonModule,
    FormsModule,
    CategoriasRoutingModule,
    PaginacionSharedModule
  ]
})
export class CategoriasModule { }
