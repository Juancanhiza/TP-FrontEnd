import { Component, OnInit, AfterViewInit } from '@angular/core';
import { PacientesService } from '../pacientes.service';
declare var M: any;
declare var $: any;
@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.css']
})
export class PacientesComponent implements OnInit, AfterViewInit {
  icon = 'add';
  data = [];
  detail = {
    correo: '',
    telefono: '',
    cedula: '',
    nombre: '',
    apellido: ''
  };
  del = {
    id: '',
    pos: ''
  }

  /* Paginacion */
  loading = false;
  total = 0;
  page = 1;
  limit = 20;

  constructor(private api: PacientesService) { }
 
  ngOnInit() {
    this.getPacientesRango();
  }
  ngAfterViewInit() {
    $('.modal').modal();
  }
  getPacientes = () => {
    var that = this;
    this.api.getPacientes().subscribe(
      data => {
        console.log(data.lista);
        that.data = data.lista;
      },
      error => {
        console.log(error);
      }
    )
  }

  saveDeleteRecord(id,pos){
    this.del.id= id;
    this.del.pos= pos;
    console.log(this.del);
  }

  deleteRecord(){
    this.api.deletePaciente(this.del.id).subscribe(
      data => {
        this.data.splice(Number(this.del.pos), 1);
        M.toast({html: 'Paciente eliminado correctamente'})
      },
      error => {
        console.log(error);
      }
    )
  }
  
  /* Metodos para la paginacion */

  getPacientesRango = () => {
    this.loading=true;
    var e = 
    { 
      inicio: this.page, 
      cantidad: this.limit
    }
    var that = this;
    this.api.getPacienteRango(e).subscribe(
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
    this.getPacientesRango();
  }

  onNext(): void {
    this.page++;
    this.getPacientesRango();
  }

  onPrev(): void {
    this.page--;
    this.getPacientesRango();
  }

  saveDetail(el){
    this.detail.nombre = el.nombre;
    this.detail.apellido = el.apellido;
    this.detail.correo = el.email;
    this.detail.telefono = el.telefono;
    this.detail.cedula = el.cedula;
  }
}
