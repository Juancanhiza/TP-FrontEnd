import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SubcategoriaComponent } from './subcategoria/subcategoria.component';
import { ServiciosModule } from './servicios/servicios.module';
import { PacientesModule } from './pacientes/pacientes.module';
import { ConfagendamientoModule } from './confagendamiento/confagendamiento.module';
import { ConfagendamientoExcepModule } from './confagendamiento-excep/confagendamiento-excep.module';
import { CategoriasModule } from './categorias/categorias.module';
import { PaginacionSharedModule } from './paginacionShared/paginacionShared.module';

@NgModule({
  declarations: [
    AppComponent,
    SubcategoriaComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ServiciosModule,
    PacientesModule,
    AppRoutingModule,
    ConfagendamientoModule,
    ConfagendamientoExcepModule,
    CategoriasModule,
    AppRoutingModule,
    PaginacionSharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
