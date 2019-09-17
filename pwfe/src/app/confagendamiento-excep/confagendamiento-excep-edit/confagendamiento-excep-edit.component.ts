import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { ConfagendamientoExcepService } from '../confagendamiento-excep.service';
declare var $: any;
declare var M: any;
@Component({
  selector: 'app-confagendamiento-excep-edit',
  templateUrl: './confagendamiento-excep-edit.component.html',
  styleUrls: ['./confagendamiento-excep-edit.component.css']
})
export class ConfagendamientoExcepEditComponent implements OnInit, AfterViewInit {
//{
    //   "fechaCadena": "20190910",
    //   "horaAperturaCadena":"2000",
    //   "horaCierreCadena":"2230",
    //   "flagEsHabilitar":"S",
    //   "idEmpleado":{
    //   "idPersona":4
    //   } ,
    //   "intervaloMinutos":10
    //}
  confAgendamientoExcep = {
    idHorarioExcepcion:0,
    fechaCadena: '',
    horaAperturaCadena: '',
    horaCierreCadena: '',
    intervaloMinutos: '',
    idEmpleado: { idPersona: '' },
    flagEsHabilitar:''
  }
  medicos;
  atendera = [
    { id: '0', nombre: "Si" },
    { id: '1', nombre: "No" }
  ]
  showTime = true;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: ConfagendamientoExcepService
  ) { }

  ngOnInit() {
    this.getMedicos();
    var that = this;
    $('#selectAtendera').change(function () {
      if (Number($(this).val()) == 1) {
        that.showTime = false;
      } else {
        that.showTime = true;
      }
    });
  }

  ngAfterViewInit() {
    this.route.paramMap.subscribe((params: ParamMap) =>  {
      this.confAgendamientoExcep.idHorarioExcepcion = Number(params.get('id'));
      this.getConfig();
    });
    $('select').formSelect();
    $('.timepicker').timepicker({
      twelveHour: false,
      i18n: {
        cancel: 'Cancelar',
        done: 'Aceptar'
      }
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
      minDate: new Date(),
      yearRange: [(new Date).getFullYear(), 2080],
      container: 'body'
    });
  }

  getMedicos() {
    this.service.getMedicos().subscribe(
      data => {
        this.medicos = data.lista;
        console.log(data);
      },
      error => {
        console.log(error);
      }
    )
  }

  guardarHorarioExcepcion() {
  //   {

  //     "idHorarioExcepcion": 2,
  //     "fechaCadena": "20190930",
  //     "flagEsHabilitar": "S",
  //     "idEmpleado": {
  //         "idPersona": 4
  //     },
  //     "intervaloMinutos": 20,
  //     "horaAperturaCadena": "2000",
  //     "horaCierreCadena": "2230"
  // }
    if (this.showTime) {
      if ($('#horaI').val() != '' && $('#horaF').val() != '' && $('#fecha').val() != '' && Number.isInteger(Number($('#tiempoConsulta').val()))) {
        var e = {
          idHorarioExcepcion: this.confAgendamientoExcep.idHorarioExcepcion,
          fechaCadena: $('#fecha').val().replace('/', '').replace('/', ''),
          horaAperturaCadena: $('#horaI').val().replace(':', ''),
          horaCierreCadena: $('#horaF').val().replace(':', ''),
          flagEsHabilitar: 'S',
          intervaloMinutos: Number($('#tiempoConsulta').val()),
          idEmpleado: { idPersona: Number($('#selectMedicos').val()) }
        }
        this.service.putAgendamientoConf(e).subscribe(
          data => {
            M.toast({ html: 'Horario de atención modificado correctamente' });
            this.router.navigate(['/horario-atencion-excep-conf']);
          },
          error => {
            M.toast({ html: '' + error.error });
            console.log(error);
          }
        )
      } else {
        M.toast({ html: 'Complete o corrija el/los campo(s)' });
      }
    } else {
      if ($('#fecha').val() != '') {
        var el = {
          idHorarioExcepcion: this.confAgendamientoExcep.idHorarioExcepcion,
          fechaCadena: $('#fecha').val().replace('/', '').replace('/', ''),
          flagEsHabilitar: 'N',
          idEmpleado: { idPersona: Number($('#selectMedicos').val()) }
        }
        this.service.putAgendamientoConf(el).subscribe(
          data => {
            M.toast({ html: 'Horario de atención modificado correctamente' });
            this.router.navigate(['/horario-atencion-excep-conf']);
          },
          error => {
            M.toast({ html: '' + error.error });
            console.log(error);
          }
        )
      } else {
        M.toast({ html: 'Complete o corrija el/los campo(s)' });
      }
    }
  }

  getConfig(){
    this.service.getAgendamientoConf(this.confAgendamientoExcep.idHorarioExcepcion).subscribe(
      data => {
        $('#selectMedicos').val(data.idEmpleado.idPersona);
        $('#fecha').val(data.fecha.replace('-','/').replace('-','/'));
        if(data.flagEsHabilitar != 'S'){this.showTime = false}
        $('#selectAtendera').val(data.flagEsHabilitar == 'S'? 0 : 1)
        $('#horaI').val(data.horaApertura);
        $('#horaF').val(data.horaCierre);
        $('#tiempoConsulta').val(data.intervaloMinutos);
        console.log(data);
      },
      error => {
        console.log(error);
      }
    )
  }
}
