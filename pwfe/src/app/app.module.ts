import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SubcategoriaComponent } from './subcategoria/subcategoria.component';
import { ServiciosModule } from './servicios/servicios.module';
import { PacientesComponent } from './pacientes/pacientes.component';
import { ConfagendamientoModule } from './confagendamiento/confagendamiento.module'
import { CategoriasModule } from './categorias/categorias.module';

@NgModule({
  declarations: [
    AppComponent,
    SubcategoriaComponent,
    PacientesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ServiciosModule,
    ConfagendamientoModule,
    AppRoutingModule,
    CategoriasModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
