import { Component, OnInit,AfterViewInit  } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ServiciosPrincipalService } from '../servicios-principal.service';

declare var $:any;

@Component({
  selector: 'app-servicios-create',
  templateUrl: './servicios-create.component.html',
  styleUrls: ['./servicios-create.component.css']
})
export class ServiciosCreateComponent implements OnInit,AfterViewInit  {

  idCliente;
  idEmpleado;
  idCategoria;
  idSubcategoria;
  idPresentacionProductoServicio;
  idFicha;

  fichas;
  categorias;
  subcategorias;
  tipoServicio;
  datos;
  arrayDetalle = [];
  total = 0;
  idServicio;

  precioVenta:number = 100;
  cantidad:number;

  tableHeaders = [
    'idFicha', 'Fecha',
    'Categoria', 'Subcategoria',
    'Acciones'
  ];


  tableHeadersDetalle = [
    'idDetalle', 'Presentacion',
    'Precio Unitario', 'cantidad',
    'Total',
    'Acciones'
  ];


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api: ServiciosPrincipalService
  ) { }

  ngOnInit() {

    this.inicializar();
  }

  ngAfterViewInit() {
    $('#selectCategorias').not('.disabled').formSelect();
    $('#selectSubCategorias').not('.disabled').formSelect();
    $('#selectTipoServicio').not('.disabled').formSelect();
    this.getCategorias();
  }

  inicializar = () => {
    const context = this;
    this.route.params.subscribe(params => {
      if (params.idCliente && params.idEmpleado) {
        context.idCliente = params.idCliente;
        context.idEmpleado = params.idEmpleado;
        context.getFicha(context.idCliente, context.idEmpleado);
      } else {
        //M.toast({ html:'Error no puede editar este id' });
      }
    });

  }

  getFicha = (idCliente,idEmpleado) =>{
    const context = this;
    this.api.getFicha(idCliente,idEmpleado).subscribe(
      (data) => {
        context.fichas = data.lista;
        console.log(data.lista);
        context.idFicha = data.lista[0].idFichaClinica;
        let fecha;
        try {
          fecha = data.lista[0].fechaHora;
        } catch (error) {
          console.log(error);
          fecha = new Date();
        }
        $('.datepicker').datepicker({
          format: "yyyy/mm/dd",
          i18n: {
            cancel: 'Cancelar',
            clear: 'Limpiar',
            done: 'Aceptar',
            months: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
            monthsShort: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Set", "Oct", "Nov", "Dic"],
            weekdays: ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
            weekdaysShort: ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"],
            weekdaysAbbrev: ["D", "L", "M", "M", "J", "V", "S"]
          },
          // minDate: new Date(1940,1,1),
          // maxDate: new Date(),
          //yearRange:[(new Date).getFullYear(),2080],
          container: 'body',
          defaultDate: new Date(),
          setDefaultDate: true
        });


        let cliente = data.lista[0].idCliente.nombre + " " + data.lista[0].idCliente.apellido ;
        let empleado = data.lista[0].idEmpleado.nombre + " " + data.lista[0].idEmpleado.apellido ;
        $('#autocomplete-input-clientes').val( cliente );
        $('#autocomplete-input-medicos').val( empleado );
      });
  }

  obtenerIdCategoria(idCategoria) {
    this.getSubcategorias(idCategoria);
    this.idCategoria = idCategoria;
  }

  obtenerIdSubcategoria(idSubcategoria) {
    this.getPresentacionProducto(idSubcategoria);
    this.idSubcategoria = idSubcategoria;
  }

  obtenerIdTipoServicio(idTipo) {
    this.getPrecio(idTipo);
    this.obtenerIdTipoServicio = idTipo;
    console.log(idTipo)
  }


  getCategorias() {
    const context = this;

    this.api.getCategorias().subscribe(
      (data) => {
        context.categorias = data.lista;

        console.debug(data.lista);
        setTimeout( () => {
          $('#selectCategorias').not('.disabled').formSelect();
        }, 2000 );

      }
    );
  }



  getSubcategorias(idCat) {
    const context = this;
    this.api.getSubCategorias(idCat).subscribe((data)=>{
      context.subcategorias = data.lista;
      setTimeout( () => {
        $('#selectSubCategorias').not('.disabled').formSelect();
      }, 2000 );
      console.log(data);
    });
  }

  getPresentacionProducto(idSubcat) {
    const context = this;
    this.api.getTipoServicio(idSubcat).subscribe((data)=>{
      context.tipoServicio = data.lista;
      setTimeout( () => {
        $('#selectTipoServicio').not('.disabled').formSelect();
      }, 2000 );
      console.log(data);
    });
  }

  getPrecio(idProductServ) {
    const context = this;
    this.api.getPrecioVenta(idProductServ).subscribe((data)=>{
      context.precioVenta = data.lista[0].precioVenta;
      /*setTimeout( () => {
        $('#selectTipoServicio').not('.disabled').formSelect();
      }, 2000 );*/
      console.log(data);
    });
  }

  agregarDetalle() {
    console.log(this.cantidad);
    let context = this;
    const datosAenviar = {
      cantidad: this.cantidad,
      idPresentacionProducto: {
        idPresentacionProducto: this.obtenerIdTipoServicio
      },
      idServicio: {
        idServicio: this.idServicio
      }
    };
    this.api.getPresentacion(this.obtenerIdTipoServicio).subscribe(
      (data) => {
        console.log(data);
        context.arrayDetalle.push(data);
        context.total = context.cantidad *  context.precioVenta;
        this.api.postDetalle(this.idServicio,datosAenviar).subscribe((data)=>{
          console.log(data);
        });
      }
    );
  }

  eliminarDetalle(){
    this.arrayDetalle.pop();
  }

  post() {
    const obsVal = $('#obs').val();
    const datos = {
      idFichaClinica : this.idFicha,
      obs : obsVal
    };
    const context = this;
    this.api.guardarServicio(datos).subscribe((datos) => {
      console.log(datos);
      context.idServicio = datos;
    });

  }

}
