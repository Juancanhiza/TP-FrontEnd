import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-subcategoria',
  templateUrl: './subcategoria.component.html',
  styleUrls: ['./subcategoria.component.css']
})
export class SubcategoriaComponent implements OnInit {
  descripcion: string = '';
  tableHeaders = ['Descripcion', 'Categoria', 'Acciones'];
  data = [
    {
      id:"0",
      subcategoria: "Rodilla",
      categoria: "Pierna"
    },
    {
      id:"1",
      subcategoria: "Tobillo",
      categoria: "Pie"
    },
    {
      id:"2",
      subcategoria: "Codo",
      categoria: "Brazo"
    },
    {
      id:"3",
      subcategoria: "Muñeca",
      categoria: "Mano"
    },
    {
      id:"4",
      subcategoria: "Muslo",
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
