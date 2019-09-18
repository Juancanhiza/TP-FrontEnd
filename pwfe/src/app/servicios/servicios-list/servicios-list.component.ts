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
  filter = {
    nombre: '',
    subcategoria: ''
  }
  constructor(private api: ServiciosService) { }
  tableHeaders = ['Nombre', 'Subcategoría', 'Acciones'];
  ngOnInit() {
    this.getSubcategorias();
    this.getServicios();

    var that = this;
    $('#subCatSelect').change(function() {
      that.filter.subcategoria = $(this).val(); 
//      that.getBySubcategoria($(this).val());
    });
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
        setTimeout (()=>{
          $('select').formSelect();
        },2000)
      },
      error => {
        console.log(error);
      }
    )
  }

  getBySubcategoria = () => {
    //{"idProducto":{"idTipoProducto":{"idTipoProducto":2}}
   
    if(this.filter.nombre == '' && this.filter.subcategoria == ''){
      M.toast({html: 'Filtros vacíos'});
    }else {
      var e = {
        nombre: this.filter.nombre,
        idProducto: {
          idTipoProducto: {
            idTipoProducto: this.filter.subcategoria
          }
        }
      }
      
      this.api.getBySubcategoria(e).subscribe(
        data => {
          console.log(data);
          this.data = data.lista;
        },
        error => {
          console.log(error);
        }
      ) 
    }
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

  clearFilter()
  {
    this.filter.nombre = '';
    this.filter.subcategoria = '';
    $("select").val(-1);
    this.getServicios();
  }
}
