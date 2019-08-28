import { Component, OnInit } from '@angular/core';
import { ServiciosService } from '../servicios.service'
declare var $: any;
@Component({
  selector: 'app-servicios-list',
  templateUrl: './servicios-list.component.html',
  styleUrls: ['./servicios-list.component.css']
})
export class ServiciosListComponent implements OnInit {

  icon = 'add';
  data = [];
  searchText: string = '';
  constructor(private api: ServiciosService) { }
  tableHeaders = ['Nombre', 'Subcategoria', 'Categoria', 'Acciones'];
  ngOnInit() {
    this.getServicios();
  }

  getServicios = () => {
    var that = this;
    this.api.getServicios().subscribe(
      data => {
        console.log(data);
        that.data = data.lista;
      },
      error => {
        console.log(error);
      }
      
    )
  }
  
  check(id) {
    $('a.agregar').addClass('red');
    this.icon = 'delete';
  }

}
