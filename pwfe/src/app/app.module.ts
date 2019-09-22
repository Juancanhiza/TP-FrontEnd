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
import { ReservasModule } from './reservas/reservas.module';
import { FichasModule } from './fichas/fichas.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { LoginComponent } from './login/login/login.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
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
    AppRoutingModule,
    ConfagendamientoModule,
    ConfagendamientoExcepModule,
    CategoriasModule,
    ReservasModule,
    AppRoutingModule,
    FichasModule,
    ReactiveFormsModule,
    SharedHomeModule,
    HttpClientModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
