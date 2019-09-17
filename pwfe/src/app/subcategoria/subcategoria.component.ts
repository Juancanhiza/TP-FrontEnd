import { Component,AfterViewInit, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
declare var $: any;
declare var M: any;
import { typeWithParameters } from '@angular/compiler/src/render3/util';
@Component({
  selector: 'app-subcategoria',
  templateUrl: './subcategoria.component.html',
  styleUrls: ['./subcategoria.component.css']
})
export class SubcategoriaComponent implements OnInit {
  descripcion: string = '';
  add = true;
  data = [];
  data3 = [];
  editId = -1;
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
  constructor(private api: ApiService
    ) {}

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
    var that = this
    $('.modal').modal();
    $('select').formSelect();
    $('.fixed-action-btn').floatingActionButton();
  }

  createSubcategoriaProcesos(element) {
    this.api.createSubcategoriaProcesos(element).subscribe(
      data => {
        this.getSubCategorias();
      },
      error => {
        console.log(error);
      }
    )
  }



  addRecord() {
    var idCategoria = $("#idCategoria option:selected").val();
    var descripcion = $('#descripcion').val();

    if (idCategoria == 'Seleccione' || descripcion == '' ) {
      M.toast({ html: 'Complete todos los campos para guardar' });
    } else {    
      var recordPost = {
        idCategoria:{idCategoria: idCategoria},
         descripcion:descripcion
      }
      console.log(recordPost)
      this.createSubcategoriaProcesos(JSON.stringify(recordPost));

      $('#modal-add').modal('close');
    }
  }

  updateSubCategoriaProcesos(element) { 
    this.api.updateSubCategoriaProcesos(element).subscribe(
      data => {
        this.getSubCategorias();
      },
      error => {
        console.log(error);
      }
    )
  }
  
  editRecord() {
    var idCategoria = $("#idCategoria-edit option:selected").val();
    var descripcion = $('#descripcion-edit').val();
    console.log(this.editId);
    if (idCategoria == 'Seleccione' || descripcion == '' ) {
      M.toast({ html: 'Complete todos los campos para guardar' });
    } else {    
      var recordUpdate = {
        idTipoProducto: this.editId,
        idCategoria:{idCategoria:idCategoria},
         descripcion:descripcion,
         flagVisible : "S",
         posicion:1
      }
      console.log(recordUpdate);
      this.updateSubCategoriaProcesos(JSON.stringify(recordUpdate));


      $('#modal-edit').modal('close');
    }
  }
  showModalEdit(element) {

    this.editId = element.idTipoProducto;
    $('#idCategoria-edit').val(element.idCategoria);
    $('#descripcion-edit').val(element.descripcion);
    $('#modal-edit').modal('open');
  }


  deleteRecord(idTipoProducto) {
    console.log(idTipoProducto);
    this.api.deleteSubCategoriaProcesos(idTipoProducto).subscribe(
      data => {
        M.toast({ html: 'SubCategoria Eliminada' });
        this.getSubCategorias();
      },
      error => {
        M.toast({ html: 'La SubCategoria está en uso y no puede eliminarse' });
      }
    )
   }
  
}
