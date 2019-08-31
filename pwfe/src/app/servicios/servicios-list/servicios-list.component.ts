import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ServiciosService } from '../servicios.service'
declare var $: any;
declare var M: any;
@Component({
  selector: 'app-servicios-list',
  templateUrl: './servicios-list.component.html',
  styleUrls: ['./servicios-list.component.css']
})
export class ServiciosListComponent implements OnInit, AfterViewInit {

  icon = 'add';
  data = [];
  subcategorias = [];
  searchText: string = '';
  del = {
    id: '',
    pos: ''
  }
  constructor(private api: ServiciosService) { }
  tableHeaders = ['Nombre', 'Subcategoría', 'Acciones'];
  ngOnInit() {
    this.getSubcategorias();
    this.getServicios();
  }

  ngAfterViewInit() {
    $('.modal').modal({
      dismissible:false
    });
    $('.collapsible').collapsible();
  }
  getServicios = () => {
    var that = this;
    this.api.getServicios().subscribe(
      data => {
        console.log(data.lista);
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

  getSubcategorias = () => {
    this.api.getSubcategorias().subscribe(
      data => {
        this.subcategorias = data.lista;
      },
      error => {
        console.log(error);
      }
    )
  }

  getBySubcategoria = (id) => {
    //{"idProducto":{"idTipoProducto":{"idTipoProducto":2}}}
    var e = {
      idProducto: {
        idTipoProducto: {
          idTipoProducto: id
        }
      }
    }
    this.api.getBySubcategoria(JSON.stringify(e)).subscribe(
      data => {
        this.data = data.lista;
      },
      error => {
        console.log(error);
      }

    )
  }

  saveDeleteRecord(id,pos){
    this.del.id= id;
    this.del.pos= pos;
    console.log(this.del);
  }

  deleteRecord(){
    this.api.deleteSevicio(this.del.id).subscribe(
      data => {
        this.data.splice(Number(this.del.pos), 1);
        M.toast({html: 'Servicio eliminado correctamente'})
      },
      error => {
        console.log(error);
      }
    )
  }
}
