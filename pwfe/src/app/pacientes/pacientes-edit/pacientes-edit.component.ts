import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PacientesService } from '../pacientes.service';
declare var $: any;
declare var M: any;
@Component({
  selector: 'app-pacientes-edit',
  templateUrl: './pacientes-edit.component.html',
  styleUrls: ['./pacientes-edit.component.css']
})
export class PacientesEditComponent implements OnInit {
  nombre: string = '';
  apellido: string = ''; 
  cedula: string = '';
  ruc: string = '';
  email: string = '';
  telefono: string = '';
  paciente;
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: PacientesService
  ) { }

  ngOnInit() {
    this.getId();
  }

  getPaciente = (id) => {
    var that = this;
    this.service.getPaciente(id).subscribe(
      data => {
        that.paciente = data;
        that.setValues();
      },
      error => {
        console.log(error);
      }
    )
  }

  setValues = () => {
    this.nombre = this.paciente.nombre;
    this.apellido = this.paciente.apellido;
    this.cedula = this.paciente.telefono;
    this.ruc = this.paciente.ruc;
    this.email = this.paciente.email;
    this.telefono = this.paciente.telefono;
  }

  getId() {
    var that = this;
    this.route.params.subscribe(params => {
      if (params['id']) {
        that.getPaciente(params['id']);
      }
    });
  }

  validacion() {
    if (this.nombre == '' || this.apellido=='' || this.cedula=='') {
      return false;
    }else{
      return true;
    }
  }

  put = () => {
  
    if (this.validacion()) {
      this.paciente.nombre = this.nombre;
      this.paciente.apellido = this.apellido;
      this.paciente.cedula = this.cedula;
      this.paciente.email = this.email;
      this.paciente.ruc = this.ruc;
      this.paciente.telefono = this.telefono;
      console.log('es valido');
      // Se guarda en el backend
      this.service.putPaciente(this.paciente).subscribe(
        data => {
          M.toast({ html: 'Paciente modificado correctamente' });
          this.router.navigate(['/pacientes']);
          //console.log(data);
        },
        error => {
          console.log(error);
        }
      );
    }else{
      M.toast({ html: 'Los campos obligatorios no pueden quedar vacíos' });
    }
  }

}