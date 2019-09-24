import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class ServiciosPrincipalService {

  httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json'});

  constructor(private http: HttpClient) { }

  getServicios() {
    return this.http.get('/stock-pwfe/servicio', { headers: this.httpHeaders });
  }

  getSubCategorias1(): Observable<any> {
    return this.http.get('/stock-pwfe/tipoProducto/', {headers: this.httpHeaders});
  }

  getCategorias(): Observable<any> {
    return this.http.get('/stock-pwfe/categoria/', {headers: this.httpHeaders});
  }

  getMedicos(): Observable<any> {
    const e = {
      soloUsuariosDelSistema: true
    };
    let params = new HttpParams();
    params = params.append('ejemplo', JSON.stringify(e));
    return this.http.get('/stock-pwfe/persona/', { params });
  }

  getPacientes(): Observable<any> {
    const e = {
      soloUsuariosDelSistema: false
    };
    let params = new HttpParams();
    params = params.append('ejemplo', JSON.stringify(e));
    return this.http.get('/stock-pwfe/persona/', { params });
  }

  filter(element): Observable<any>{
    var params = new HttpParams();
    params = params.append('ejemplo', JSON.stringify(element));
    return this.http.get('/stock-pwfe/servicio/', { params: params});
  }

  getFicha(idCliente,idEmpleado): Observable<any> {
    const parametros = {
        idEmpleado: {
          idPersona: Number.parseInt(idEmpleado)
        },
        idCliente: {
          idPersona: Number.parseInt(idCliente)
        }
    };

    let params = new HttpParams();
    params = params.append('ejemplo', JSON.stringify(parametros));

    return this.http.get('/stock-pwfe/fichaClinica/', {params});
  }

  getSubCategorias(idCat): Observable<any> {

    const parametros = {
        idCategoria: {
          idCategoria: Number.parseInt(idCat, 10)
        }
    };

    let params = new HttpParams();
    params = params.append('ejemplo', JSON.stringify(parametros));

    return this.http.get('/stock-pwfe/tipoProducto/', {params:params});
  }

  getTipoServicio(idSub): Observable<any> {


    const parametros = {
        idProducto: {
          idTipoProducto: {
            idTipoProducto:
              Number.parseInt(idSub, 10)
          }
        }
    };

    let params = new HttpParams();
    params = params.append('ejemplo', JSON.stringify(parametros));

    return this.http.get('/stock-pwfe/presentacionProducto/', {params});
  }

  getPresentacion(idTipo): Observable<any> {

    return this.http.get('/stock-pwfe/presentacionProducto/'+idTipo, {headers: this.httpHeaders});
  }

  getPrecioVenta(idProductSer): Observable<any> {

    const parametros = {
      idPresentacionProductoTransient: Number.parseInt('4', 10)
    };

    console.log(idProductSer);

    let h = new HttpHeaders();
    h = h.append('Content-Type','application/json');
    h = h.append('usuario','gustavo');

    let params = new HttpParams();
    params = params.append('ejemplo', JSON.stringify(parametros));

    return this.http.get('/stock-pwfe/existenciaProducto/', {headers:h ,params:params});
  }

  agregarDetalle(datos){

    const parametros = {
      idPresentacionProductoTransient: Number.parseInt('4', 10)
    };

    //console.log(idProductSer);

    let h = new HttpHeaders();
    h = h.append('Content-Type','application/json');
    h = h.append('usuario','gustavo');

    let params = new HttpParams();
    params = params.append('ejemplo', JSON.stringify(parametros));

    return this.http.get('/stock-pwfe/existenciaProducto/', {headers:h ,params:params});


  }

  postDetalle(idServicio,datos){
    let h = new HttpHeaders();
    h = h.append('Content-Type','application/json');
    h = h.append('usuario','gustavo');
    return this.http.post('/stock-pwfe/servicio/'+idServicio+'/detalle', datos, {headers:h});
  }

  guardarServicio(datos) {

    const parametros = {
      idFichaClinica: {
        idFichaClinica: Number.parseInt(datos.idFichaClinica, 10)
      },
      observacion: datos.obs
    };
    var h = new HttpHeaders();
    h = h.append('Content-Type','application/json');
    h = h.append('usuario','ana');

    return this.http.post('/stock-pwfe/servicio', parametros,{headers: h });
  }

}
