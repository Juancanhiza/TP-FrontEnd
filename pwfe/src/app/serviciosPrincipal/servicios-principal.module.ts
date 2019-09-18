import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule, MatPaginatorModule, MatProgressSpinnerModule,
  MatSortModule, MatTableModule } from '@angular/material';
import { ServiciosPrincipalRoutingModule } from './servicios-principal-routing.module';
import { ServiciosListComponent } from './servicios-list/servicios-list.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiciosCreateComponent } from './servicios-create/servicios-create.component';

@NgModule({
  declarations: [ServiciosListComponent, ServiciosCreateComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    ServiciosPrincipalRoutingModule,
    BrowserAnimationsModule
  ]
})
export class ServiciosPrincipalModule { }
