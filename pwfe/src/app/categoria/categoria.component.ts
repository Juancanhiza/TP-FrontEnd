import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {
  descripcion: string = '';
  categorias = [];
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

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.getCategorias();
  }

  submmit () {
    alert(this.descripcion);
  }

  getCategorias() {
    var that = this;
    this.api.getCategorias().subscribe(
      data => {
        console.log(data);
        // data.forEach(function (value) {
        //   that.categorias.push(value);
        // });
        // console.log(that.categorias);
      },
      error => {
        console.log(error);
      }
    )
  }
}
