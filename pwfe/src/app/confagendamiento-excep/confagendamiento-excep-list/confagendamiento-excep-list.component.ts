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

  /* Paginacion */
  loading = false;
  total = 0;
  page = 1;
  limit = 10;

  detail = {
    dia: '',
    medico: '',
    desde: '',
    hasta: '',
    tiempo: ''
  }

  constructor(private api: ConfagendamientoExcepService) { }
  ngOnInit() {
    this.getAgendamientosConfRango();
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
        setTimeout(()=>{
          $('#selectMedicos').formSelect();
        },2000)
        $('select').formSelect();
      },
      error => {
        console.log(error);
      }
    )
  }

  /* Metodos para la paginacion */

  getAgendamientosConfRango = () => {
    this.loading=true;
    var e = 
    { 
      inicio: this.page, 
      cantidad: this.limit
    }
    var that = this;
    this.api.getAgendamientosConfRango(e).subscribe(
      data => {
        console.log(data.lista);
        that.data = data.lista;
        this.total = data.totalDatos;
        this.loading=false;
      },
      error => {
        console.log(error);
      }
    )
  }

  goToPage(n: number): void {
    this.page = n;
    this.getAgendamientosConfRango();
  }

  onNext(): void {
    this.page++;
    this.getAgendamientosConfRango();
  }

  onPrev(): void {
    this.page--;
    this.getAgendamientosConfRango();

  saveDetail(el){
    this.detail.medico = el.idEmpleado.nombre + " " + el.idEmpleado.apellido;
    this.detail.desde = el.horaApertura;
    this.detail.hasta = el.horaCierre;
    this.detail.tiempo = el.fecha;
    this.detail.dia = el.fecha;
  }

}
