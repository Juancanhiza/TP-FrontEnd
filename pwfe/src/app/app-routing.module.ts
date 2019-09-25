import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SubcategoriaComponent } from './subcategoria/subcategoria.component';
import { AuthGuard } from './login/guard';
import { LoginComponent } from './login/login/login.component';
import { HomeComponent } from './home/home.component';
import { PacientesComponent } from './pacientes/pacientes-list/pacientes.component';
import { ServiciosListComponent } from './servicios/servicios-list/servicios-list.component';
import { ReservasListComponent } from './reservas/reservas-list/reservas-list.component';
import { FichasListComponent } from './fichas/fichas-list/fichas-list.component';
import { CategoriaListComponent } from './categorias/categoria-list/categoria-list.component';
import { ConfagendamientoListComponent } from './confagendamiento/confagendamiento-list/confagendamiento-list.component';
import { ConfagendamientoExcepListComponent } from './confagendamiento-excep/confagendamiento-excep-list/confagendamiento-excep-list.component';

const appRoutes: Routes = [
 { path: 'login', component: LoginComponent },
 { path: '', component: HomeComponent, canActivate: [AuthGuard] },
 { path: 'subcategorias', component:SubcategoriaComponent, canActivate: [AuthGuard]  }
 /* { path: '', component: HomeComponent, canActivate: [AuthGuard] },
 { path: 'login', component: LoginComponent },
 { path: 'pacientes', component: PacientesComponent, canActivate: [AuthGuard]  },
 { path: 'servicios', component: ServiciosListComponent, canActivate: [AuthGuard] },
 { path: 'reservas', component: ReservasListComponent, canActivate: [AuthGuard] },
 { path: 'fichas', component: FichasListComponent, canActivate: [AuthGuard] },
 { path: 'categorias', component: CategoriaListComponent, canActivate: [AuthGuard] },
 { path: 'horario-atencion-conf', component: ConfagendamientoListComponent, canActivate: [AuthGuard] },
 { path: 'horario-atencion-excep-conf', component: ConfagendamientoExcepListComponent, canActivate: [AuthGuard] }, */

];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
