import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from '../home.component';
import { AppHomeRoutingModule } from './app-routing-shared';


@NgModule({
  declarations: [ HomeComponent ],
  imports: [
    CommonModule,
    AppHomeRoutingModule
  ],
  exports: [
    HomeComponent
  ]
})
export class SharedHomeModule { }
