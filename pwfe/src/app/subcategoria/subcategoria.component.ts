import { Component,AfterViewInit, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
declare var $: any;
import { typeWithParameters } from '@angular/compiler/src/render3/util';
@Component({
  selector: 'app-subcategoria',
  templateUrl: './subcategoria.component.html',
  styleUrls: ['./subcategoria.component.css']
})
export class SubcategoriaComponent implements OnInit {
  descripcion: string = '';
  data = [];
  data3 = [];
  tableHeaders = ['Descripcion', 'Categoria', 'Acciones'];
  data1 = [
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
  constructor(private api: ApiService) {}

  ngOnInit() {
    this.getSubCategorias();
    this.getCategorias();
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

  getCategorias() {
    var that = this;
    this.api.getCategorias().subscribe(
      data3 => {
        that.data3 = data3.lista;
        console.log(data3);
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

  ngAfterViewInit(){
    $('.modal').modal();
  }
}
