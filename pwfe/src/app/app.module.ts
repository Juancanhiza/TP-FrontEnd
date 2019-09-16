import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SubcategoriaComponent } from './subcategoria/subcategoria.component';
import { ServiciosModule } from './servicios/servicios.module';
import { PacientesComponent } from './pacientes/pacientes.component';
import { ConfagendamientoModule } from './confagendamiento/confagendamiento.module';
<<<<<<< HEAD
import { CategoriasModule } from './categorias/categorias.module';

=======
import { ConfagendamientoExcepModule } from './confagendamiento-excep/confagendamiento-excep.module';
import { CategoriasModule } from './categorias/categorias.module'
>>>>>>> 5b6272a43796f8500cba07083c03bc48507eba32
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
    ConfagendamientoExcepModule,
    CategoriasModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
