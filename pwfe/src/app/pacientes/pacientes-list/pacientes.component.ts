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
  del = {
    id: '',
    pos: ''
  }

  constructor(private api: PacientesService) { }
  tableHeaders = ['ID', 'Nombre', 'Apellido', 'CI','Email','Telefono', 'Acciones'];
  ngOnInit() {
    this.getPacientes();
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

}