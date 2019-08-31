import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ServiciosService {

  hhtpHeaders = new HttpHeaders({'Content-Type':'application/json'});
  constructor(private http: HttpClient) {}

  getServicios(): Observable<any> {
    return this.http.get('/stock-pwfe/presentacionProducto', {headers: this.hhtpHeaders});
  }
  getServicio(id): Observable<any> {
    return this.http.get('/stock-pwfe/presentacionProducto/' + id, {headers: this.hhtpHeaders});
  }

  getBySubcategoria(element): Observable<any> {
    console.log('/stock-pwfe/presentacionProducto?ejemplo=' + element);
    var h = new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'})
    return this.http.get('/stock-pwfe/presentacionProducto?ejemplo=' + element, {headers: this.hhtpHeaders});
  }

  postServicio(element): Observable<any> {
    return this.http.post('/stock-pwfe/presentacionProducto', element, {headers: this.hhtpHeaders});
  }

  putServicio(element): Observable<any> {
    return this.http.put('/stock-pwfe/presentacionProducto', element, {headers: this.hhtpHeaders});
  }

  putProducto(element): Observable<any> {
    return this.http.put('/stock-pwfe/producto', element, {headers: this.hhtpHeaders});
  }

  postProducto(element): Observable<any> {
    return this.http.post('/stock-pwfe/producto', element, {headers: this.hhtpHeaders});
  }
  deleteSevicio(id): Observable<any> {
    return this.http.delete('/stock-pwfe/presentacionProducto/' + id, {headers: this.hhtpHeaders});
  }

  getSubcategorias(): Observable<any> {
    return this.http.get('/stock-pwfe/tipoProducto', {headers: this.hhtpHeaders});
  }
}
