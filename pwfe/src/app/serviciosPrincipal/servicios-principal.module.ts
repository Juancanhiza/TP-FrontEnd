import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ServiciosPrincipalRoutingModule } from './servicios-principal-routing.module';
import { ServiciosListComponent } from './servicios-list/servicios-list.component';
import { ServiciosCreateComponent } from './servicios-create/servicios-create.component';

@NgModule({
  declarations: [ServiciosListComponent, ServiciosCreateComponent],
  imports: [
    CommonModule,
    FormsModule,
    ServiciosPrincipalRoutingModule
  ]
})
export class ServiciosPrincipalModule { }
