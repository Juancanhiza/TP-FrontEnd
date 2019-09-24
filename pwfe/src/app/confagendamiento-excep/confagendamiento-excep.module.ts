import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfagendamientoExcepRoutingModule } from './confagendamiento-excep-routing.module';
import { ConfagendamientoExcepAddComponent } from './confagendamiento-excep-add/confagendamiento-excep-add.component';
import { ConfagendamientoExcepListComponent } from './confagendamiento-excep-list/confagendamiento-excep-list.component';
import { ConfagendamientoExcepEditComponent } from './confagendamiento-excep-edit/confagendamiento-excep-edit.component';
import { PaginacionSharedModule } from '../paginacionShared/paginacionShared.module';


@NgModule({
  declarations: [
    ConfagendamientoExcepAddComponent, 
    ConfagendamientoExcepListComponent, 
    ConfagendamientoExcepEditComponent],
  imports: [
    CommonModule,
    ConfagendamientoExcepRoutingModule,
    PaginacionSharedModule
  ]
})
export class ConfagendamientoExcepModule { }
