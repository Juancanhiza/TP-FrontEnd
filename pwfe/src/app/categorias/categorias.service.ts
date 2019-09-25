import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  hhtpHeaders = new HttpHeaders({'Content-Type' : 'application/json'});
  constructor(private http: HttpClient) {}

  getCategorias(): Observable<any> {
    return this.http.get('/stock-pwfe/categoria', {headers: this.hhtpHeaders});
  }
  getCategoria(id): Observable<any> {
    return this.http.get('/stock-pwfe/categoria/' + id, {headers: this.hhtpHeaders});
  }
  
  getCategoriaRango(element): Observable<any> {
    var params = new HttpParams();
    params = params.append('inicio', JSON.stringify(element.inicio));
    params = params.append('cantidad', JSON.stringify(element.cantidad));
    params = params.append('orderBy', 'idCategoria');
    params = params.append('orderDir', 'asc');
    return this.http.get('/stock-pwfe/categoria/', { params: params});
  }


  postCategoria(element): Observable<any> {
    return this.http.post('/stock-pwfe/categoria', element, {headers: this.hhtpHeaders});
  }

  putCategoria(element): Observable<any> {
    return this.http.put('/stock-pwfe/categoria', element, {headers: this.hhtpHeaders});
  }


  deleteCategoria(id): Observable<any> {
    return this.http.delete('/stock-pwfe/categoria/' + id, {headers: this.hhtpHeaders});
  }

  filter(ej): Observable<any> {
    var params = new HttpParams();
    params = params.append('ejemplo', JSON.stringify(ej));
    params = params.append('like', 'S');

    return this.http.get('/stock-pwfe/categoria', {params: params});
  }

}
