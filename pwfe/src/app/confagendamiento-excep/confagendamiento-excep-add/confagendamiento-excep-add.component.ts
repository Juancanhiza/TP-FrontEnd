import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfagendamientoExcepService } from '../confagendamiento-excep.service';
declare var $: any;
declare var M: any;
@Component({
  selector: 'app-confagendamiento-excep-add',
  templateUrl: './confagendamiento-excep-add.component.html',
  styleUrls: ['./confagendamiento-excep-add.component.css']
})
export class ConfagendamientoExcepAddComponent implements OnInit, AfterViewInit {

  confAgendamientoExcep = {
    dia: '',
    horaAperturaCadena: '',
    horaCierreCadena: '',
    intervaloMinutos: '',
    idEmpleado: {idPersona: ''}

  }
  medicos;
  atendera = [
    {id:'0', nombre:"Si"},
    {id:'1', nombre:"No"}
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
    $('#selectAtendera').change(function() {
      if(Number($(this).val()) == 1){
        that.showTime = false;
      }else {
        that.showTime = true;
      }
    });
  }

  ngAfterViewInit() {
    $('select').formSelect();
    $('.timepicker').timepicker({
      twelveHour:false,
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
        weekdays: ["Domingo","Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
        weekdaysShort: ["Dom","Lun", "Mar", "Mie", "Jue", "Vie", "Sab"],
        weekdaysAbbrev: ["D","L", "M", "M", "J", "V", "S"]
      },
      minDate: new Date(),
      yearRange:[(new Date).getFullYear(),2080],
      container: 'body' 
    });
  }

  getMedicos(){
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

  guardarHorarioExcepcion(){
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
    if(this.showTime){
      if($('#horaI').val() != '' && $('#horaF').val() != '' && $('#fecha').val() != '' &&  Number.isInteger(Number($('#tiempoConsulta').val()))){
        var e = {
          fechaCadena: $('#fecha').val().replace('/','').replace('/',''),
          horaAperturaCadena: $('#horaI').val().replace(':',''),
          horaCierreCadena: $('#horaF').val().replace(':',''),
          flagEsHabilitar: 'S',
          intervaloMinutos: Number($('#tiempoConsulta').val()),
          idEmpleado: { idPersona: Number($('#selectMedicos').val()) }
        }
        this.service.postAgendamientoConf(e).subscribe(
          data => {
            M.toast({html: 'Horario de atencion agregada correctamente'});
            this.router.navigate(['/horario-atencion-excep-conf']);
          },
          error => {
            console.log(error);
          }
        )
      }else {
        M.toast({html: 'Complete o corrija el/los campo(s)'});
      }
    }else {
      if($('#fecha').val() != '')
      {
        var el = {
          fechaCadena: $('#fecha').val().replace('/','').replace('/',''),
          flagEsHabilitar: 'N',        
          idEmpleado: { idPersona: Number($('#selectMedicos').val()) }
        }
        this.service.postAgendamientoConf(el).subscribe(
          data => {
            M.toast({html: 'Horario de atencion agregada correctamente'});
            this.router.navigate(['/horario-atencion-excep-conf']);
          },
          error => {
            console.log(error);
          }
        )
      }else {
        M.toast({html: 'Complete o corrija el/los campo(s)'});
      }
    }
  }

}
