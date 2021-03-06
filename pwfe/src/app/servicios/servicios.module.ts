import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ServiciosRoutingModule } from './servicios-routing.module';
import { ServiciosListComponent } from './servicios-list/servicios-list.component';
import { ServiciosAddComponent } from './servicios-add/servicios-add.component';
import { ServiciosEditComponent } from './servicios-edit/servicios-edit.component';
import { ServiciosDetailComponent } from './servicios-detail/servicios-detail.component';
import { ServiciosFilterPipe } from './servicios-filter.pipe';
import { HttpClientModule } from '@angular/common/http';
import { PaginacionSharedModule } from '../paginacionShared/paginacionShared.module';
import { SharedHomeModule } from '../home/shared-home/shared-home.module';

@NgModule({
  declarations: [
    ServiciosListComponent, 
    ServiciosAddComponent, 
    ServiciosEditComponent, 
    ServiciosDetailComponent,
    ServiciosFilterPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ServiciosRoutingModule,
    PaginacionSharedModule,
    SharedHomeModule
  ]
})
export class ServiciosModule { }
