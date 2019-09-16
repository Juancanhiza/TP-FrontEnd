import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PacientesService } from '../pacientes.service';
declare var $: any;
declare var M: any;
@Component({
  selector: 'app-pacientes-add',
  templateUrl: './pacientes-add.component.html',
  styleUrls: ['./pacientes-add.component.css']
})
export class PacientesAddComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: PacientesService
  ) { }

  ngOnInit() {
  }

  postPaciente(element){
    this.service.postPaciente(element).subscribe(
      data => {
        M.toast({ html: 'Paciente agregado correctamente' });
        this.router.navigate(['/pacientes ']);
      },
      error => {
        console.log(error);
      }
    )
  }

  post = () => {

    var e = {
      nombre: $('#paciente_nombre').val(),
      apellido: $('#paciente_apellido').val(),
      email: $('#paciente_email').val(),
      telefono: $('#paciente_telefono').val(),
      ruc: $('#paciente_telefono').val(),
      cedula: $('#paciente_cedula').val(),
      tipoPersona: "FISICA"
    }
    this.service.postPaciente(e).subscribe(
      data => {
        M.toast({html: 'Paciente agregada correctamente'});
        this.router.navigate(['/pacientes']);
      },
      error => {
        M.toast({html: error.error});
        console.log(error);

      }
    )
  }

}
