import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiciosPrincipalRoutingModule } from './servicios-principal-routing.module';
import { ServiciosListComponent } from './servicios-list/servicios-list.component';
import { ServiciosCreateComponent } from './servicios-create/servicios-create.component';

@NgModule({
  declarations: [ServiciosListComponent, ServiciosCreateComponent],
  imports: [
    CommonModule,
    ServiciosPrincipalRoutingModule
  ]
})
export class ServiciosPrincipalModule { }
