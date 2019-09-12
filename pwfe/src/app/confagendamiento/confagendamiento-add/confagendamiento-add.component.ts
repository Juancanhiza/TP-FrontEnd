import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfagendamientoService } from '../confagendamiento.service';
declare var $: any;
declare var M: any;
@Component({
  selector: 'app-confagendamiento-add',
  templateUrl: './confagendamiento-add.component.html',
  styleUrls: ['./confagendamiento-add.component.css']
})
export class ConfagendamientoAddComponent implements OnInit {

  confAgendamiento = {
    dia: '',
    horaAperturaCadena: '',
    horaCierreCadena: '',
    intervaloMinutos: '',
    idEmpleado: {idPersona: ''}

  }
  medicos;
  dias = [
    {id:'0', nombre:"Domingo"},
    {id:'1', nombre:"Lunes"},
    {id:'2', nombre:"Martes"},
    {id:'3', nombre:"Miércoles"},
    {id:'4', nombre:"Jueves"},
    {id:'5', nombre:"Viernes"},
    {id:'6', nombre:"Sábado"}
  ];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: ConfagendamientoService
  ) { }

  ngOnInit() {
    this.getMedicos();
    // this.getSubCategorias();
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

  guardarAgendamiento(){
    //mystring = mystring.replace('/r','/');
    if($('#selectDias').val() != '' && $('#horaI').val() != '' && $('#horaF').val() != '' && Number.isInteger(Number($('#tiempoConsulta').val())) 
    && Number($('#selectMedicos').val()) != -1){
      var e = {
        dia: $('#selectDias').val(),
        horaAperturaCadena: $('#horaI').val().replace(':',''),
        horaCierreCadena: $('#horaF').val().replace(':',''),
        intervaloMinutos: Number($('#tiempoConsulta').val()),
        idEmpleado: { idPersona: Number($('#selectMedicos').val()) }
      }
      this.service.postAgendamientoConf(e).subscribe(
        data => {
          M.toast({html: 'Horario de atencion agregada correctamente'});
          this.router.navigate(['/horario-atencion-conf']);
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