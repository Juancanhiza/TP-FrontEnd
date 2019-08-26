import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.css']
})
export class PacientesComponent implements OnInit {
  descripcion: string = '';
  tableHeaders = ['ID', 'Nombre', 'Apellido', 'CI','Email','Telefono'];
  data = [
    {
      idPersona: 1,
      nombre: 'jose',
      apellido: 'benitez',
      telefono: '222233',
      email: 'joseb@gmail',
      ruc: '231123',
      cedula: '2321',
      tipoPersona: 'hombre',
      fechaDeNacimiento: '22-07-98'
    },
    {
      idPersona: 2,
      nombre: 'text',
      apellido: 'text',
      telefono: 'text',
      email: 'text',
      ruc: 'text',
      cedula: 'text',
      tipoPersona: 'text',
      fechaDeNacimiento: 'text'
    },
    {
      idPersona: 3,
      nombre: 'text',
      apellido: 'text',
      telefono: 'text',
      email: 'text',
      ruc: 'text',
      cedula: 'text',
      tipoPersona: 'text',
      fechaDeNacimiento: 'text'
    }
  ]
  constructor() { }

  ngOnInit() {
  }

}
