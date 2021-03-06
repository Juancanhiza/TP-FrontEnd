import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComisionesRoutingModule } from './comisiones-routing.module';
import { ComisionesAddComponent } from './comisiones-add/comisiones-add.component';
import { ComisionesEditComponent } from './comisiones-edit/comisiones-edit.component';
import { ComisionesListComponent } from './comisiones-list/comisiones-list.component';
import { FormsModule } from '@angular/forms';
import { SharedHomeModule } from '../home/shared-home/shared-home.module';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [ComisionesAddComponent, ComisionesEditComponent, ComisionesListComponent],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    SharedHomeModule,
    ComisionesRoutingModule
  ]
})
export class ComisionesModule { }
