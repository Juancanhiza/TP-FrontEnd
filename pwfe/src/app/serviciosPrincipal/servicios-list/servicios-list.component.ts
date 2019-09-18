import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ServiciosPrincipalService } from '../servicios-principal.service';

declare var $: any


@Component({
  selector: 'app-servicios-list',
  templateUrl: './servicios-list.component.html',
  styleUrls: ['./servicios-list.component.css']
})


export class ServiciosListComponent implements OnInit, AfterViewInit {


  tableHeaders = ['Fecha', 'Id ficha', 'Profesional', 'Cliente', 'Categoria', 'Subcategoria', 'Acciones'];

  datos = [];
  subcategorias = [];
  medicos = [];
  medicosMap = {};
  clientesMap = {};
  clientes = [];


  constructor(private api: ServiciosPrincipalService) { }

  ngOnInit() {
    this.getServicios();
    this.getSubcategorias();
    this.getClientes();
    this.getMedicos();
  }


  ngAfterViewInit(): void {
    $('.datepicker').datepicker({
      format: 'yyyy/mm/dd',
      i18n: {
        cancel: 'Cancelar',
        clear: 'Limpiar',
        done: 'Aceptar',
        months: ['Enero', 'Febrero', 'Marzo', "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
        monthsShort: ['Ene', 'Feb', 'Mar', "Abr", "May", "Jun", "Jul", "Ago", "Set", "Oct", "Nov", "Dic"],
        weekdays: ['Domingo', 'Lunes', "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
        weekdaysShort: ['Dom', 'Lun', "Mar", "Mie", "Jue", "Vie", "Sab"],
        weekdaysAbbrev: ['D', 'L', 'M', "M", "J", "V", "S"]
      },
      container: 'body'
    });
    $('.modal').modal({
      dismissible: false
    });
  }


  getServicios = () => {
    const context = this;
    this.api.getServicios().subscribe(
      (data) => {
        context.datos = data.lista;
        console.log(context.datos);
      }, error => {
        console.log(error);
      }
    );
  }

  getSubcategorias = () => {
    const context = this;
    this.api.getSubCategorias().subscribe(
      (data) => {
        context.subcategorias = data.lista;
        setTimeout( () => {
          $('#selectSubcategorias').formSelect();
        }, 2000 );
      }, error => {
        console.log(error);
      }
    );

  }

  getMedicos() {
    this.api.getMedicos().subscribe(
      data => {
        this.medicos = data.lista;
        var med = {};
        // tslint:disable-next-line: prefer-for-of
        for(var i=0; i< this.medicos.length; i++){
          this.medicosMap[this.medicos[i].nombre+ " "+this.medicos[i].apellido] = this.medicos[i].idPersona;
          med[this.medicos[i].nombre+ " "+this.medicos[i].apellido] = null;
        }
        $('#autocomplete-input-medicos').autocomplete({
          data:med,
        });
      },
      error => {
        console.log(error);
      }
    );
  }

  getClientes() {
    this.api.getPacientes().subscribe(
      data => {
        this.clientes = data.lista;
        var cli = {};
        for(var i=0; i< this.clientes.length; i++){
          this.clientesMap[this.clientes[i].nombre+ " "+this.clientes[i].apellido] = this.clientes[i].idPersona;
          cli[this.clientes[i].nombre+ " "+this.clientes[i].apellido] = null;
        }
        $('#autocomplete-input-clientes').autocomplete({
          data:cli,
        });
        // var obj: {[k: string]: any} = {};
        // obj.nombre = null;
        // obj.apellido = null;
      },
      error => {
        console.log(error);
      }
    );
  }

  clearFilter() {
    $('#fechaDesde').val('');
    $('#fechaHasta').val('');
    $('#autocomplete-input-clientes').val('');
    $('#autocomplete-input-medicos').val('');
    this.getServicios();
  }

  filter () {
    console.log($('#selectSubcategorias').val());
    // /reserva?ejemplo={"idEmpleado":{"idPersona":3},"fechaDesdeCadena":"20190903","fechaHastaCadena":"20
    // 190920"}
    var c = null;
    var m = null;
    if( $('#autocomplete-input-medicos').val() in this.medicosMap) {
      m = Number(this.medicosMap[$('#autocomplete-input-medicos').val()]);
    }
    if( $('#autocomplete-input-clientes').val() in this.clientesMap) {
      c = Number(this.clientesMap[$('#autocomplete-input-clientes').val()]);
    }
    const fil = {
      idEmpleado: {idPersona: m},
      idFichaClinica: {
        idCliente: {
          idPersona: c
        },
        idTipoProducto: { idTipoProducto: $('#selectSubcategorias').val() == null? null: Number($('#selectSubcategorias').val())}
      },
      fechaDesdeCadena: $('#fechaDesde').val().replace('/','').replace('/',''),
      fechaHastaCadena: $('#fechaHasta').val().replace('/','').replace('/','')
    };
    console.log(fil);
    this.api.filter(fil).subscribe(
      data => {
        this.datos = data.lista;
        console.log(this.datos);
      },
      error => {
        console.log("en filter de servicios"+error);
      }
    )

  }


}
