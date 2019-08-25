import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {
  descripcion: string = '';
  tableHeaders = ['Descripcion', 'Acciones'];
  data = [
    {
      id:"0",
      categoria: "Pierna"
    },
    {
      id:"1",
      categoria: "Pie"
    },
    {
      id:"2",
      categoria: "Brazo"
    },
    {
      id:"3",
      categoria: "Mano"
    },
    {
      id:"4",
      categoria: "Pierna"
    }
  ]

  constructor() { }

  ngOnInit() {
  }

  submmit () {
    alert(this.descripcion);
  }
}
