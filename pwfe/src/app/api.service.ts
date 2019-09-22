import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  //context = 'http://localhost/nucleo/';
  //context = 'http://seguridad.personal.com.py/rLite/';
  hhtpHeaders = new HttpHeaders({'Content-Type':'application/json'});
  constructor(private http: HttpClient) { }

  getCategorias(): Observable<any> {
    return this.http.get('/stock-pwfe/categoria', {headers: this.hhtpHeaders});
  }
  getSubCategorias(): Observable<any> {
    return this.http.get('/stock-pwfe/tipoProducto', {headers: this.hhtpHeaders});
  }
  getSubCategoriasRango(element): Observable<any> {
    var params = new HttpParams();
    params = params.append('inicio', JSON.stringify(element.inicio));
    params = params.append('cantidad', JSON.stringify(element.cantidad));
    params = params.append('orderBy', 'descripcion');
    params = params.append('orderDir', 'asc');
    return this.http.get('/stock-pwfe/tipoProducto/', { params: params});
  }
  getServicios(): Observable<any> {
    return this.http.get('/stock-pwfe/presentacionProducto', {headers: this.hhtpHeaders});
  }
  createSubcategoriaProcesos(element): Observable<any> {
    return this.http.post('/stock-pwfe/tipoProducto', element, {headers: this.hhtpHeaders});
  }
  updateSubCategoria(element): Observable<any> {
    return this.http.put('/stock-pwfe/tipoProducto', element, {headers: this.hhtpHeaders});
  }
  deleteSubCategoriaProcesos(id): Observable<any> {
    return this.http.delete('/stock-pwfe/tipoProducto/' + id, {headers: this.hhtpHeaders});
  }
}

