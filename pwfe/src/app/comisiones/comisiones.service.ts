import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComisionesService {

  hhtpHeaders = new HttpHeaders({'Content-Type' : 'application/json'});
  constructor(private http: HttpClient) {}
  

  getComisiones(): Observable<any> {
    return this.http.get('/stock-pwfe/comisionEmpleado', {headers: this.hhtpHeaders});
  }

  getComision(id): Observable<any> {
    return this.http.get('/stock-pwfe/comisionEmpleado/'+id, {headers: this.hhtpHeaders});
  }

  postComisiones(element): Observable<any> {
    var h = new HttpHeaders();
    h = h.append('Content-Type','application/json');
    h = h.append('usuario','gustavo');
    return this.http.post('/stock-pwfe/comisionEmpleado', element, {headers: h});
  }

  putComisiones(element): Observable<any> {
    return this.http.put('/stock-pwfe/comisionEmpleado', element, {headers: this.hhtpHeaders});
  }

  getMedicos(): Observable<any> {
    var e = {
      soloUsuariosDelSistema: true
    }
    var params = new HttpParams();
    params = params.append('ejemplo', JSON.stringify(e));
    return this.http.get('/stock-pwfe/persona/', { params: params});
  }

  getServicios(): Observable<any> {
    return this.http.get('/stock-pwfe/presentacionProducto', {headers: this.hhtpHeaders});
  }
}
