import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { SubcategoriaComponent } from './subcategoria/subcategoria.component';
import { HttpClientModule } from '@angular/common/http';
import { ServiciosComponent } from './servicios/servicios.component';
import { ServiciosFilterPipe } from './servicios-filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    CategoriaComponent,
    SubcategoriaComponent,
    ServiciosComponent,
    ServiciosFilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {
        path: 'categorias',
        component:CategoriaComponent
      },
      {
        path : 'subcategorias',
        component:SubcategoriaComponent
      },
      {
        path : 'servicios',
        component:ServiciosComponent
      }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
