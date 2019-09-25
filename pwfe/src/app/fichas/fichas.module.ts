import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FichasRoutingModule } from './fichas-routing.module';
import { FichasListComponent } from './fichas-list/fichas-list.component';
import { FichasAddComponent } from './fichas-add/fichas-add.component';
import { FichasEditComponent } from './fichas-edit/fichas-edit.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [FichasListComponent, FichasAddComponent, FichasEditComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    FichasRoutingModule
  ]
})
export class FichasModule { }
