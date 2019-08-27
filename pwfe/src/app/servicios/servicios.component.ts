import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
declare var $:any;
@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.css']
})
export class ServiciosComponent implements OnInit {
  icon='add';
  data = [];
  searchText: string= '';
  constructor(private api: ApiService) {}
  tableHeaders = ['Nombre', 'Subcategoria', 'Categoria', 'Acciones'];
  ngOnInit() {
    this.getServicios();
  }

  getServicios() {
    var that = this;
    this.api.getServicios().subscribe(
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

  check(id){
    $('a.agregar').addClass('red');
    this.icon = 'delete';
  }
}
