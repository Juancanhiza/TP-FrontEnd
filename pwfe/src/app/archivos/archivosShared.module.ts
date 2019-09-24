import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArchivosAddComponent } from './archivos-add/archivos-add.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ 
    ArchivosAddComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports:[
    ArchivosAddComponent
  ]
})
export class ArchivosSharedModule { }
