import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FichasService {

  hhtpHeaders = new HttpHeaders({'Content-Type':'application/json'});
  constructor(private http: HttpClient) {}

  getFichas(): Observable<any> {
    return this.http.get('/stock-pwfe/fichaClinica', {headers: this.hhtpHeaders});
  }

  getFicha(id): Observable<any> {
    return this.http.get('/stock-pwfe/fichaClinica/'+id, {headers: this.hhtpHeaders});
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

  getSubCategorias(): Observable<any> {
  
    return this.http.get('/stock-pwfe/tipoProducto/', {headers: this.hhtpHeaders});
  }

  deleteFicha(id): Observable<any> {
    return this.http.delete('/stock-pwfe/fichaClinica/' + id, {headers: this.hhtpHeaders});
  }

  filter(element): Observable<any>{
    var params = new HttpParams();
    params = params.append('ejemplo', JSON.stringify(element));
    return this.http.get('/stock-pwfe/fichaClinica/', { params: params});
  }

  filterAdd(id, fecha, disponible): Observable<any>{
    var params = new HttpParams();
    params = params.append('fecha', fecha);
    if(disponible){
      params = params.append('disponible', 'S');
    }
    return this.http.get('/stock-pwfe/persona/'+ id +'/agenda', { params: params});

  }

  postFicha(element): Observable<any>{
    var h = new HttpHeaders();
    h = h.append('Content-Type','application/json');
    h = h.append('usuario','ana');
    return this.http.post('/stock-pwfe/fichaClinica', element, {headers: h});
  }
  
  putFicha(element): Observable<any>{
    var h = new HttpHeaders();
    h = h.append('Content-Type','application/json');
    return this.http.put('/stock-pwfe/fichaClinica', element, {headers: this.hhtpHeaders});
  }
}
