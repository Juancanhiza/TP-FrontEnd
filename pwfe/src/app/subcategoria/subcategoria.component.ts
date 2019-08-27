import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
@Component({
  selector: 'app-subcategoria',
  templateUrl: './subcategoria.component.html',
  styleUrls: ['./subcategoria.component.css']
})
export class SubcategoriaComponent implements OnInit {
  descripcion: string = '';
  data = [];
  tableHeaders = ['Descripcion', 'Categoria', 'Acciones'];
  constructor(private api: ApiService) {}

  ngOnInit() {
    this.getSubCategorias();
  }

  submmit () {
    alert(this.descripcion);
  }

  getSubCategorias() {
    var that = this;
    this.api.getSubCategorias().subscribe(
      data => {
        that.data = data.lista;
        //console.log(data.totalDatos);
        //that.data = data;
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
