import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservasService {

  hhtpHeaders = new HttpHeaders({'Content-Type':'application/json'});
  constructor(private http: HttpClient) {}

  getReservas(): Observable<any> {
    return this.http.get('/stock-pwfe/reserva', {headers: this.hhtpHeaders});
  }

  getReserva(id): Observable<any> {
    return this.http.get('/stock-pwfe/reserva/'+id, {headers: this.hhtpHeaders});
  }

  getMedicos(): Observable<any> {
    var e = {
      soloUsuariosDelSistema: true
    }
    var params = new HttpParams();
    params = params.append('ejemplo', JSON.stringify(e));
    return this.http.get('/stock-pwfe/persona/', { params: params});
  }

  getPacientes(): Observable<any> {
    var e = {
      soloUsuariosDelSistema: false
    }
    var params = new HttpParams();
    params = params.append('ejemplo', JSON.stringify(e));
    return this.http.get('/stock-pwfe/persona/', { params: params});
  }

  deleteReserva(id): Observable<any> {
    return this.http.delete('/stock-pwfe/reserva/' + id, {headers: this.hhtpHeaders});
  }

  filter(element): Observable<any>{
    var params = new HttpParams();
    params = params.append('ejemplo', JSON.stringify(element));
    return this.http.get('/stock-pwfe/reserva/', { params: params});
  }

  filterAdd(id, fecha, disponible): Observable<any>{
    var params = new HttpParams();
    params = params.append('fecha', fecha);
    if(disponible){
      params = params.append('disponible', 'S');
    }
    return this.http.get('/stock-pwfe/persona/'+ id +'/agenda', { params: params});

  }

  postReserva(element): Observable<any>{
    var h = new HttpHeaders();
    h = h.append('Content-Type','application/json');
    h = h.append('usuario','ana');
    return this.http.post('/stock-pwfe/reserva', element, {headers: h});
  }
  
  putReserva(element): Observable<any>{
    var h = new HttpHeaders();
    h = h.append('Content-Type','application/json');
    h = h.append('usuario','ana');
    return this.http.post('/stock-pwfe/reserva', element, {headers: h});
  }

}
