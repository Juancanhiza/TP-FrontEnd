import { Component, OnInit } from '@angular/core';
import { ConfagendamientoService } from '../confagendamiento.service';
declare var $: any;
declare var M: any;
@Component({
  selector: 'app-confagendamiento-list',
  templateUrl: './confagendamiento-list.component.html',
  styleUrls: ['./confagendamiento-list.component.css']
})
export class ConfagendamientoListComponent implements OnInit {
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
  detail = {
    dia: '',
    medico: '',
    desde: '',
    hasta: '',
    tiempo: ''
  }
  filtros = {
    doc: '',
    dia: ''
  }

  /* Paginacion */
  loading = false;
  total = 0;
  page = 1;
  limit = 10;

  constructor(private api: ConfagendamientoService) { }

  ngOnInit() {
    this.getAgendamientosConfRango();
    this.getMedicos();
    var that = this;
    $('#selectDias').change(function() {
      that.filtros.dia = $(this).val(); 
    });
    $('#selectMedicos').change(function() {
      that.filtros.doc = $(this).val(); 
    });
  }

  ngAfterViewInit() {
    $('.modal').modal({
      dismissible: false
    });
    $('.collapsible').collapsible();
    $('#selectDias').formSelect();
  }
  getAgendamientosConf = () => {
    var that = this;
    this.api.getAgendamientosConf().subscribe(
      data => { 
        that.data = data.lista;
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
      dia: this.filtros.dia
    }
    this.api.filter(e).subscribe(
      data => {
        this.data = data.lista;
      },
      error => {
        console.log(error)
      }
    )
  }

  clearFilter()
  {
    this.filtros.doc = '';
    this.filtros.dia = '';
    $("select").val(-1);
    this.getAgendamientosConf();
  }

  getMedicos(){
    this.api.getMedicos().subscribe(
      data => {
        this.medicos = data.lista;
        setTimeout(()=>{
          $('#selectMedicos').formSelect();
        },2000);
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
  }
  saveDetail(el){
    this.detail.medico = el.idEmpleado.nombre + " " + el.idEmpleado.apellido;
    this.detail.desde = el.horaApertura;
    this.detail.hasta = el.horaCierre;
    this.detail.tiempo = el.intervaloMinutos;
    this.detail.dia = el.diaCadena;
  }
}
