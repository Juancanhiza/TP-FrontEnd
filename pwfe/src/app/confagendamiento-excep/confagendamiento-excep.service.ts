import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfagendamientoExcepService {

  hhtpHeaders = new HttpHeaders({'Content-Type':'application/json'});
  constructor(private http: HttpClient) {}

  getAgendamientosConf(): Observable<any> {
    return this.http.get('/stock-pwfe/horarioExcepcion', {headers: this.hhtpHeaders});
  }

  getAgendamientoConf(id): Observable<any> {
    return this.http.get('/stock-pwfe/horarioExcepcion/' + id, {headers: this.hhtpHeaders});
  }

  deleteAgendamientoConf(id): Observable<any> {
    return this.http.delete('/stock-pwfe/horarioExcepcion/' + id, {headers: this.hhtpHeaders});
  }

  postAgendamientoConf(element): Observable<any> {
    var h = new HttpHeaders();
    h = h.append('Content-Type','application/json');
    h = h.append('usuario','gustavo');
    return this.http.post('/stock-pwfe/horarioExcepcion/', element, {headers: h});
  }

  putAgendamientoConf(element): Observable<any> {
    var h = new HttpHeaders();
    h = h.append('Content-Type','application/json');
    h = h.append('usuario','gustavo');
    return this.http.put('/stock-pwfe/horarioExcepcion/', element, {headers: h});
  }

  getMedicos(): Observable<any> {
    var e = {
      soloUsuariosDelSistema: true
    }
    var params = new HttpParams();
    params = params.append('ejemplo', JSON.stringify(e));
    return this.http.get('/stock-pwfe/persona/', { params: params});
  }

  filter(element): Observable<any> {
    var params = new HttpParams();
    params = params.append('ejemplo', JSON.stringify(element));
    return this.http.get('/stock-pwfe/horarioExcepcion/', { params: params});
  }
}
