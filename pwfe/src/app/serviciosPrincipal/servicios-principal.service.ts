import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class ServiciosPrincipalService {

  httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) { }

  getServicios() {
    return this.http.get('/stock-pwfe/servicio', { headers: this.httpHeaders });
  }

  getSubCategorias(): Observable<any> {

    return this.http.get('/stock-pwfe/tipoProducto/', {headers: this.httpHeaders});
  }

  getMedicos(): Observable<any> {
    const e = {
      soloUsuariosDelSistema: true
    };
    let params = new HttpParams();
    params = params.append('ejemplo', JSON.stringify(e));
    return this.http.get('/stock-pwfe/persona/', { params });
  }

  getPacientes(): Observable<any> {
    const e = {
      soloUsuariosDelSistema: false
    };
    let params = new HttpParams();
    params = params.append('ejemplo', JSON.stringify(e));
    return this.http.get('/stock-pwfe/persona/', { params });
  }

  filter(element): Observable<any>{
    var params = new HttpParams();
    params = params.append('ejemplo', JSON.stringify(element));
    return this.http.get('/stock-pwfe/servicio/', { params: params});
  }





}
