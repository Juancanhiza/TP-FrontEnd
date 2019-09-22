import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PacientesRoutingModule } from './pacientes-routing.module';
import { PacientesAddComponent } from './pacientes-add/pacientes-add.component';
import { PacientesComponent } from './pacientes-list/pacientes.component';
import { PacientesEditComponent } from './pacientes-edit/pacientes-edit.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { SharedHomeModule } from '../home/shared-home/shared-home.module';

@NgModule({
  declarations: [
    PacientesComponent,
    PacientesAddComponent,
    PacientesEditComponent,    
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    PacientesRoutingModule,
    FormsModule,
    SharedHomeModule
  ]
})
export class PacientesModule { }
