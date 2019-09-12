import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { ConfagendamientoService } from '../confagendamiento.service';
declare var $:any;
declare var M:any;
@Component({
  selector: 'app-confagendamiento-edit',
  templateUrl: './confagendamiento-edit.component.html',
  styleUrls: ['./confagendamiento-edit.component.css']
})
export class ConfagendamientoEditComponent implements OnInit {

  confAgendamiento = {
    id: 0,
    dia: '',
    horaAperturaCadena: '',
    horaCierreCadena: '',
    intervaloMinutos: '',
    idEmpleado: { idPersona: '' }

  }
  medicos;
  dias = [
    { id: '0', nombre: "Domingo" },
    { id: '1', nombre: "Lunes" },
    { id: '2', nombre: "Martes" },
    { id: '3', nombre: "Miércoles" },
    { id: '4', nombre: "Jueves" },
    { id: '5', nombre: "Viernes" },
    { id: '6', nombre: "Sábado" }
  ];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: ConfagendamientoService
  ) { }

  ngOnInit() {
    this.getMedicos();
    this.route.paramMap.subscribe((params: ParamMap) =>  {
      this.confAgendamiento.id = Number(params.get('id'));
      this.getConfig();
    });
  }

  ngAfterViewInit() {
    $('select').formSelect();
    $('.timepicker').timepicker({
      twelveHour: false,
      i18n: {
        cancel: 'Cancelar',
        done: 'Aceptar'
      }

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

  actualizarAgendamiento() {
    if ($('#selectDias').val() != '' && $('#horaI').val() != '' && $('#horaF').val() != '' && Number.isInteger(Number($('#tiempoConsulta').val()))
      && Number($('#selectMedicos').val()) != -1) {
      var e = {
        idPersonaHorarioAgenda: this.confAgendamiento.id,
        dia: $('#selectDias').val(),
        horaAperturaCadena: $('#horaI').val().replace(':', ''),
        horaCierreCadena: $('#horaF').val().replace(':', ''),
        intervaloMinutos: Number($('#tiempoConsulta').val()),
        idEmpleado: { idPersona: Number($('#selectMedicos').val()) }
      }
      this.service.putAgendamientoConf(e).subscribe(
        data => {
          M.toast({ html: 'Horario de atención modificado correctamente' });
          this.router.navigate(['/horario-atencion-conf']);
        },
        error => {
          console.log(error);
        }
      )
    } else {
      M.toast({ html: 'Complete o corrija el/los campo(s)' });
    }
  }

  getConfig(){
    this.service.getAgendamientoConf(this.confAgendamiento.id).subscribe(
      data => {
        this.confAgendamiento.dia = data.dia;
        this.confAgendamiento.horaAperturaCadena = data.horaApertura;
        this.confAgendamiento.horaCierreCadena = data.horaCierre;
        this.confAgendamiento.intervaloMinutos = data.intervaloMinutos;
        this.confAgendamiento.idEmpleado.idPersona = data.idEmpleado.idPersona;
        this.setData();
      },
      error => {
        console.log(error);
      }
    )
  }
  setData(){
    $('#selectDias').val(this.confAgendamiento.dia);
    $('#selectMedicos').val(this.confAgendamiento.idEmpleado.idPersona);
    $('#horaI').val(this.confAgendamiento.horaAperturaCadena);
    $('#horaF').val(this.confAgendamiento.horaCierreCadena);
    $('#tiempoConsulta').val(this.confAgendamiento.intervaloMinutos);
  }
}
