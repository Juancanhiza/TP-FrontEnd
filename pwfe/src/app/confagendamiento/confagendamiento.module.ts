import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfagendamientoRoutingModule } from './confagendamiento-routing.module';
import { ConfagendamientoListComponent } from './confagendamiento-list/confagendamiento-list.component';
import { ConfagendamientoAddComponent } from './confagendamiento-add/confagendamiento-add.component';
import { ConfagendamientoEditComponent } from './confagendamiento-edit/confagendamiento-edit.component';
import { ConfagendamientoDetailComponent } from './confagendamiento-detail/confagendamiento-detail.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { PaginacionSharedModule } from '../paginacionShared/paginacionShared.module';

@NgModule({
  declarations: [
    ConfagendamientoListComponent, 
    ConfagendamientoAddComponent, 
    ConfagendamientoEditComponent, 
    ConfagendamientoDetailComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    PaginacionSharedModule,    
    ConfagendamientoRoutingModule
  ]
})
export class ConfagendamientoModule { }
