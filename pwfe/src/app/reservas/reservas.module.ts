import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReservasRoutingModule } from './reservas-routing.module';
import { ReservasListComponent } from './reservas-list/reservas-list.component';
import { ReservasAddComponent } from './reservas-add/reservas-add.component';
import { ReservasEditComponent } from './reservas-edit/reservas-edit.component';
import { SharedHomeModule } from '../home/shared-home/shared-home.module';


@NgModule({
  declarations: [ReservasListComponent, ReservasAddComponent, ReservasEditComponent],
  imports: [
    CommonModule,
    ReservasRoutingModule,
    SharedHomeModule
  ]
})
export class ReservasModule { }
