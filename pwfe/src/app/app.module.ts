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
import { ServiciosPrincipalModule } from './serviciosPrincipal/servicios-principal.module';
import { ReservasModule } from './reservas/reservas.module';
import {NgxPaginationModule} from 'ngx-pagination';
import { ExcelService } from './servicios/servicios-list/service/excel.service';
import { FichasModule } from './fichas/fichas.module';

@NgModule({
  declarations: [
    AppComponent,
    SubcategoriaComponent,
  ],
  imports: [
    BrowserModule,
    NgxPaginationModule,
    FormsModule,
    ServiciosModule,
    PacientesModule,
    AppRoutingModule,
    ConfagendamientoModule,
    ConfagendamientoExcepModule,
    CategoriasModule,
    AppRoutingModule,
    ServiciosPrincipalModule,
    ReservasModule,
    FichasModule  ],
  providers: [ExcelService],
  bootstrap: [AppComponent]
})
export class AppModule { }
