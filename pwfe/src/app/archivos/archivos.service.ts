import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArchivosService {

  hhtpHeaders = new HttpHeaders({'Content-Type' : 'application/json'});
  constructor(private http: HttpClient) {}

  postArchivo(element): Observable<any> {
    return this.http.post('/stock-pwfe/fichaArchivo/archivo', element, {headers: this.hhtpHeaders});
  }
  /*
  postArchivo2(element): Observable<any> {
    return this.http.post('/stock-pwfe/fichaArchivo/archivo', element, {headers: this.hhtpHeaders});
  }
  */
}
