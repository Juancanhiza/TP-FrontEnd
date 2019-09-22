import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ConfagendamientoService {

  hhtpHeaders = new HttpHeaders({'Content-Type':'application/json'});
  constructor(private http: HttpClient) {}

  getAgendamientosConf(): Observable<any> {
    return this.http.get('/stock-pwfe/personaHorarioAgenda', {headers: this.hhtpHeaders});
  }

  getAgendamientoConf(id): Observable<any> {
    return this.http.get('/stock-pwfe/personaHorarioAgenda/' + id, {headers: this.hhtpHeaders});
  }
  
  getAgendamientosConfRango(element): Observable<any> {
    var params = new HttpParams();
    params = params.append('inicio', JSON.stringify(element.inicio));
    params = params.append('cantidad', JSON.stringify(element.cantidad));
    params = params.append('orderBy', 'dia');
    params = params.append('orderDir', 'asc');
    return this.http.get('/stock-pwfe/personaHorarioAgenda/', { params: params});
  }

  deleteAgendamientoConf(id): Observable<any> {
    return this.http.delete('/stock-pwfe/personaHorarioAgenda/' + id, {headers: this.hhtpHeaders});
  }

  postAgendamientoConf(element): Observable<any> {
    var h = new HttpHeaders();
    h = h.append('Content-Type','application/json');
    h = h.append('usuario','gustavo');
    return this.http.post('/stock-pwfe/personaHorarioAgenda/', element, {headers: h});
  }

  putAgendamientoConf(element): Observable<any> {
    var h = new HttpHeaders();
    h = h.append('Content-Type','application/json');
    h = h.append('usuario','gustavo');
    return this.http.put('/stock-pwfe/personaHorarioAgenda/', element, {headers: h});
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
    return this.http.get('/stock-pwfe/personaHorarioAgenda/', { params: params});
  }
}
