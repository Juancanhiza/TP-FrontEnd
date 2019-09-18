import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-servicios-create',
  templateUrl: './servicios-create.component.html',
  styleUrls: ['./servicios-create.component.css']
})
export class ServiciosCreateComponent implements OnInit {

  tableHeaders = [
    'idFicha', 'Fecha',
    'Categoria', 'Subcategoria',
    'Acciones'
  ];

  constructor() { }

  ngOnInit() {
  }

}
