import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PacientesService {

  hhtpHeaders = new HttpHeaders({'Content-Type':'application/json'});
  constructor(private http: HttpClient) {}

  getPacientes(): Observable<any> {
    return this.http.get('/stock-pwfe/persona', {headers: this.hhtpHeaders});
  }

  getPaciente(id): Observable<any> {
    return this.http.get('/stock-pwfe/persona/' + id, {headers: this.hhtpHeaders});
  }
  
  getPacienteRango(element): Observable<any> {
    var params = new HttpParams();
    params = params.append('inicio', JSON.stringify(element.inicio));
    params = params.append('cantidad', JSON.stringify(element.cantidad));
    return this.http.get('/stock-pwfe/persona/', { params: params});
  }

  deletePaciente(id): Observable<any> {
    return this.http.delete('/stock-pwfe/persona/' + id, {headers: this.hhtpHeaders});
  }
  
  putPaciente(element): Observable<any> {
    return this.http.put('/stock-pwfe/persona', element, {headers: this.hhtpHeaders});
  }

  postPaciente(element): Observable<any> {
    return this.http.post('/stock-pwfe/persona', element, {headers: this.hhtpHeaders});
  }

  /*
  getBySubcategoria(element): Observable<any> {
    console.log('/stock-pwfe/presentacionProducto?ejemplo=' + element);
    var h = new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'})
    return this.http.get('/stock-pwfe/presentacionProducto?ejemplo=' + element, {headers: this.hhtpHeaders});
  } */
  /*
  getByNombre(element): Observable<any> {
    console.log('/stock-pwfe/presentacionProducto?ejemplo=' + element);
    var h = new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'})
    return this.http.get('/stock-pwfe/presentacionProducto?ejemplo=' + element, {headers: this.hhtpHeaders});
  }

  putProducto(element): Observable<any> {
    return this.http.put('/stock-pwfe/producto', element, {headers: this.hhtpHeaders});
  }

  postProducto(element): Observable<any> {
    return this.http.post('/stock-pwfe/producto', element, {headers: this.hhtpHeaders});
  }*/

  /*
  getSubcategorias(): Observable<any> {
    return this.http.get('/stock-pwfe/tipoProducto', {headers: this.hhtpHeaders});
  } */
}
