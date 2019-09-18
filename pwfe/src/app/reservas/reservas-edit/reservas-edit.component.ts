import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { ReservasService } from '../reservas.service';
declare var $: any;
declare var M: any;
@Component({
  selector: 'app-reservas-edit',
  templateUrl: './reservas-edit.component.html',
  styleUrls: ['./reservas-edit.component.css']
})
export class ReservasEditComponent implements OnInit, AfterViewInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api: ReservasService
  ) { }

  medicos = [];
  medicosMap = {};
  clientes = [];
  clientesMap = {};
  data = [];
  reservas = [];
  table = false;
  filtros = {
    medico: 0,
    fecha: 0,
    sololibres: true
  }

  saveData = {
    fechaCadena: '',
    horaInicioCadena: '',
    horaFinCadena: '',
    idEmpleado: -1,
    idCliente: -1,
    idReserva: -1
  }
  reservaId;
  reserva;
  r = {
    horaInicio: '',
    horaFin: '',
    cliente: ''
  }
  pos = -1;
  ngOnInit() {
    this.getMedicos();
  }

  ngAfterViewInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.reservaId = Number(params.get('id'));
      this.getReserva();
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
  }

  getMedicos() {
    this.api.getMedicos().subscribe(
      data => {
        this.medicos = data.lista;
        var med = {};
        for (var i = 0; i < this.medicos.length; i++) {
          this.medicosMap[this.medicos[i].nombre + " " + this.medicos[i].apellido] = this.medicos[i].idPersona;
          med[this.medicos[i].nombre + " " + this.medicos[i].apellido] = null;
        }
        $('#autocomplete-input-medicos').autocomplete({
          data: med,
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
        for (var i = 0; i < this.clientes.length; i++) {
          this.clientesMap[this.clientes[i].nombre + " " + this.clientes[i].apellido] = this.clientes[i].idPersona;
          cli[this.clientes[i].nombre + " " + this.clientes[i].apellido] = null;
        }
        $('#autocomplete-input-clientes').autocomplete({
          data: cli,
        });
      },
      error => {
        console.log(error);
      }
    )
  }

  filter = (fecha, medico) => {
    var m = null;
    if (medico in this.medicosMap && fecha != '') {
      m = Number(this.medicosMap[medico]);
      this.saveData.fechaCadena = fecha.replace('/', '').replace('/', '');
      this.saveData.idEmpleado = Number(this.medicosMap[medico]);
      this.api.filterAdd(m, fecha.replace('/', '').replace('/', ''), true).subscribe(
        data => {
          this.table = true;
          this.data = data;
          console.log(this.data);
          this.getClientes();
          for (var i = 0; i < this.data.length; i++) {

            this.data[i].horaInicioCadena = this.data[i].horaInicioCadena.slice(0, 2) + ":" + this.data[i].horaInicioCadena.slice(2, 4);
            this.data[i].horaFinCadena = this.data[i].horaFinCadena.slice(0, 2) + ":" + this.data[i].horaFinCadena.slice(2, 4);
            if (this.data[i].idCliente == null) {
              this.data[i].idCliente = 'Libre';
              this.data[i].fechaDesdeCadena = true;
            } else {
              this.data[i].fechaDesdeCadena = false;
              this.data[i].idCliente = this.data[i].idCliente.nombre + " " + this.data[i].idCliente.apellido;
            }
            this.data[i].idLocal = i;
          }
        },
        error => {
          console.log(error);
        }
      )
    } else {
      M.toast({ html: 'Complete los campos' })
    }


  }

  radio = (evt, horaI, horaF) => {
    var target = evt.target;
    if (target.checked) {
      this.saveData.horaInicioCadena = horaI;
      this.saveData.horaFinCadena = horaF;
    }
  }

  put = () => {

    // {
    //   "fechaCadena": "20190903",
    //   "horaInicioCadena":"1000",
    //   "horaFinCadena":"1015",
    //   "idEmpleado":{
    //   "idPersona":3
    //   },
    //   "idCliente":{
    //   "idPersona":7
    //   }
    //   }

    var cliente = this.reserva.idCliente.idPersona;
    var e = {
      idReserva: this.reservaId,
      fechaCadena: this.saveData.fechaCadena,
      horaInicioCadena: this.saveData.horaInicioCadena.replace(':', ''),
      horaFinCadena: this.saveData.horaFinCadena.replace(':', ''),
      idEmpleado: {
        idPersona: this.saveData.idEmpleado
      },
      idCliente: { idPersona: cliente },
      observacion: $('#observacion').val()
    }
    console.log(e);
    this.api.putReserva(e).subscribe(
      data => {
        M.toast({ html: 'Reserva agregada correctamente' });
        this.router.navigate(['/reservas']);
      },
      error => {
        console.log(error);
      }
    )

  }
  //"javax.persistence.PersistenceException: org.hibernate.PersistentObjectException: detached entity passed to persist: py.com.bregus.modelo.Reserva"
  getReserva() {
    this.api.getReserva(this.reservaId).subscribe(
      data => {
        this.reserva = data;
        this.r.horaInicio = this.reserva.horaInicio;
        this.r.horaFin = this.reserva.horaFin;
        this.r.cliente = this.reserva.idCliente.nombre + " " + this.reserva.idCliente.apellido;
        this.setData();
        setTimeout(() => {
          this.filter(this.fecha, this.medico);
        }, 2000);
        console.log(this.reserva);
      },
      error => {
        console.log(error);
      }
    )
  }
  fecha;
  medico;
  setData() {
    this.fecha = this.reserva.fecha.replace('-', '/').replace('-', '/');
    this.medico = this.reserva.idEmpleado.nombre + " " + this.reserva.idEmpleado.apellido;
    $('#fecha').val(this.fecha);
    $('#autocomplete-input-medicos').val(this.medico);
    console.log(this.reserva.observacion);
    $('textarea#observacion').val(this.reserva.observacion);
  }
}
