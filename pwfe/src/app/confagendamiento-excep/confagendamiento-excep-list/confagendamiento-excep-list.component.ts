import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ConfagendamientoExcepService } from '../confagendamiento-excep.service';
declare var $: any;
declare var M: any;
@Component({
  selector: 'app-confagendamiento-excep-list',
  templateUrl: './confagendamiento-excep-list.component.html',
  styleUrls: ['./confagendamiento-excep-list.component.css']
})
export class ConfagendamientoExcepListComponent implements OnInit, AfterViewInit {

  dias = [
    {id:'0', nombre:"Domingo"},
    {id:'1', nombre:"Lunes"},
    {id:'2', nombre:"Martes"},
    {id:'3', nombre:"Miércoles"},
    {id:'4', nombre:"Jueves"},
    {id:'5', nombre:"Viernes"},
    {id:'6', nombre:"Sábado"}
  ];
  icon = 'add';
  data = [];
  searchText: string = '';
  medicos = [];
  del = {
    id: '',
    pos: ''
  }

  filtros = {
    doc: '',
    fecha: ''
  }
  constructor(private api: ConfagendamientoExcepService) { }
  tableHeaders = ['Médico', 'Desde', 'Hasta', 'Fecha', 'Atenderá', 'Acciones'];
  ngOnInit() {
    this.getAgendamientosConf();
    this.getMedicos();
    var that = this;
    $('#selectMedicos').change(function() {
      that.filtros.doc = $(this).val(); 
    });
  }

  ngAfterViewInit() {
    $('.modal').modal({
      dismissible: false
    });
    $('.collapsible').collapsible();
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
      // minDate: new Date(1940,1,1),
      // maxDate: new Date(),
      //yearRange:[(new Date).getFullYear(),2080],
      container: 'body' 
    });
  }
  getAgendamientosConf = () => {
    var that = this;
    this.api.getAgendamientosConf().subscribe(
      data => { 
        that.data = data.lista;
        for(var i=0; i< that.data.length; i++)
        {
          if(that.data[i].flagEsHabilitar == 'S'){
            that.data[i].flagEsHabilitar= 'Sí';
          }else {
            that.data[i].flagEsHabilitar= 'No';
          }
        }
        console.log(that.data);
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
    this.api.deleteAgendamientoConf(this.del.id).subscribe(
      data => {
        this.data.splice(Number(this.del.pos), 1);
        M.toast({ html: 'Agendamiento eliminado correctamente' })
      },
      error => {
        console.log(error);
      }
    )
  }

  filter () {
    var e = {
      idEmpleado: {
        idPersona: this.filtros.doc
      },
      fechaCadena: $('#fecha').val().replace('/','').replace('/','')
    }
    console.log(e);
    var that = this;
    this.api.filter(e).subscribe(
      data => {
        this.data = data.lista;
        for(var i=0; i< that.data.length; i++)
        {
          if(that.data[i].flagEsHabilitar == 'S'){
            that.data[i].flagEsHabilitar= 'Sí';
          }else {
            that.data[i].flagEsHabilitar= 'No';
          }
        }
      },
      error => {
        console.log(error)
      }
    )
  }

  clearFilter()
  {
    this.filtros.doc = '';
    this.filtros.fecha = '';
    $("select").val(-1);
    this.getAgendamientosConf();
  }

  getMedicos(){
    this.api.getMedicos().subscribe(
      data => {
        this.medicos = data.lista;
      },
      error => {
        console.log(error);
      }
    )
  }

}