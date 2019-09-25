import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SubcategoriaComponent } from './subcategoria/subcategoria.component';
import { ServiciosModule } from './servicios/servicios.module';
import { PacientesModule } from './pacientes/pacientes.module';
import { ConfagendamientoModule } from './confagendamiento/confagendamiento.module';
import { ConfagendamientoExcepModule } from './confagendamiento-excep/confagendamiento-excep.module';
import { CategoriasModule } from './categorias/categorias.module';
import { PaginacionSharedModule } from './paginacionShared/paginacionShared.module';
import { ServiciosPrincipalModule } from './serviciosPrincipal/servicios-principal.module';
import { ReservasModule } from './reservas/reservas.module';
import {NgxPaginationModule} from 'ngx-pagination';
import { ExcelService } from './servicios/servicios-list/service/excel.service';
import { FichasModule } from './fichas/fichas.module';
import { ComisionesModule } from './comisiones/comisiones.module';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login/login.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BasicAuthInterceptor, ErrorInterceptor, fakeBackendProvider } from './login/helpers';
import { SharedHomeModule } from './home/shared-home/shared-home.module';

@NgModule({
  declarations: [
    AppComponent,
    SubcategoriaComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    NgxPaginationModule,
    FormsModule,
    ServiciosModule,
    PacientesModule,
    ConfagendamientoModule,
    ConfagendamientoExcepModule,
    CategoriasModule,
    PaginacionSharedModule,
    ServiciosPrincipalModule,
    ReservasModule,
    FichasModule,
    HttpClientModule,
    ComisionesModule,
    ComisionesModule,
    ReactiveFormsModule,
    SharedHomeModule,
    HttpClientModule,
    AppRoutingModule,

  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    ExcelService,
    fakeBackendProvider
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
