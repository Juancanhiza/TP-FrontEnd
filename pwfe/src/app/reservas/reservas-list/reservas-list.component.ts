import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ReservasService } from '../reservas.service';
declare var $: any;
declare var M: any;
@Component({
  selector: 'app-reservas-list',
  templateUrl: './reservas-list.component.html',
  styleUrls: ['./reservas-list.component.css']
})
export class ReservasListComponent implements OnInit, AfterViewInit {

  data = [];
  medicos = [];
  medicosMap = {};
  clientesMap = {};
  clientes = [];
  del = {
    id: '',
    pos: ''
  }
  filtros = {
    doc: '',
    fecha: ''
  }
  edit = {
    nombre: '',
    apellido: '',
    obs: '',
    id: -1
  };
  put = {
    idReserva: -1,
    observacion: '',
    flagAsistio: ''
  }
  constructor(private api: ReservasService) {
  }
  tableHeaders = ['Fecha', 'Hora inicio', 'Hora fin', 'Profesional', 'Cliente', 'Acciones'];
  ngOnInit() {
    this.getMedicos();
    this.getReservas();
    this.getClientes();
    var that = this;
    $('#selectMedicos').change(function () {
      that.filtros.doc = $(this).val();
    });
  }

  ngAfterViewInit() {
    $('.modal').modal({
      dismissible: false
    });
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
      container: 'body'
    });
    // $('input.autocomplete').autocomplete({
    //   data: {
    //     "Apple": null,
    //     "Microsoft": null,
    //     "Google": 'https://placehold.it/250x250'
    //   },
    // });
   
  }

  saveEdit(element){
    this.edit.nombre = element.idCliente.nombre;
    this.edit.apellido = element.idCliente.apellido;
    this.edit.obs = element.observacion;
    this.edit.id = element.idReserva;
    $('#obs').val(this.edit.obs);
    if(element.flagAsistio == null){
      $('#no').prop('checked', true)
    }else {
      $('#si').prop('checked', true)
    }
  }
  getReservas = () => {
    this.api.getReservas().subscribe(
      data => {
        this.data = data.lista;
      },
      error => {
        console.log(error);
      }

    )
  }

  saveDeleteRecord(id, pos) {
    this.del.id = id;
    this.del.pos = pos;
  }

  deleteRecord() {
    this.api.deleteReserva(this.del.id).subscribe(
      data => {
        this.data.splice(Number(this.del.pos), 1);
        M.toast({ html: 'Reserva eliminada correctamente' });
      },
      error => {
        console.log(error);
        M.toast({ html: 'La reserva no puede ser eliminada' });
      }
    )
  }


  getMedicos() {
    this.api.getMedicos().subscribe(
      data => {
        this.medicos = data.lista;
        var med = {};
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
    )
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
    )
  }

  filter () {
    // /reserva?ejemplo={"idEmpleado":{"idPersona":3},"fechaDesdeCadena":"20190903","fechaHastaCadena":"20
    // 190920"}
    var c = null;
    var m = null;
    if($('#autocomplete-input-medicos').val() in this.medicosMap){
      m = Number(this.medicosMap[$('#autocomplete-input-medicos').val()]);
    }
    if($('#autocomplete-input-clientes').val() in this.clientesMap){
      c = Number(this.clientesMap[$('#autocomplete-input-clientes').val()]);
    }
    var fil = {
      idEmpleado: {idPersona: m},
      idCliente: {idPersona: c},
      fechaDesdeCadena: $('#fechaDesde').val().replace('/','').replace('/',''),
      fechaHastaCadena: $('#fechaHasta').val().replace('/','').replace('/','')
    }
    this.api.filter(fil).subscribe(
      data => {
        this.data = data.lista;
      },
      error => {
        console.log(error);
      }
    )

  }

  clearFilter(){
    $('#fechaDesde').val('');
    $('#fechaHasta').val('');
    $('#autocomplete-input-clientes').val('');
    $('#autocomplete-input-medicos').val('');
    this.getReservas();
  }

  putService = () => {
    this.put.idReserva = this.edit.id;  
    this.put.observacion = $('#obs').val();
    
    // this.api.putReserva(this.put).subscribe(
    //   data => {
    //     console.log(data);
    //   },
    //   error => {
    //     console.log(error);
    //   }
    // )
  }

  asistio(flag){
    if(flag){
      this.put.flagAsistio = 'S';
    }else{this.put.flagAsistio = null}
  }
}
