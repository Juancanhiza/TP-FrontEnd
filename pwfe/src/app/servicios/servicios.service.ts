import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams  } from '@angular/common/http';
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
    // let param = new HttpParams().set('ejemplo', JSON.stringify(element));
    // let param2 = new HttpParams().set('like', 'S');

    var params = new HttpParams();
    params = params.append('ejemplo', JSON.stringify(element));
    params = params.append('like', 'S');
    
    // params.append('ejemplo', JSON.stringify(element));
    // params.append('like',"S");
    console.log(params);
    return this.http.get('/stock-pwfe/presentacionProducto', { params: params});
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
