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

  /* Paginacion */
  loading = false;
  total = 0;
  page = 1;
  limit = 20;

  constructor(private api: ApiService
    ) {}

  ngOnInit() {
    this.getSubCategoriasRango();
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

  /* Metodos para la paginacion */

  getSubCategoriasRango = () => {
    this.loading=true;
    var e = 
    { 
      inicio: this.page, 
      cantidad: this.limit
    }
    var that = this;
    this.api.getSubCategoriasRango(e).subscribe(
      data => {
        console.log(data.lista);
        that.data = data.lista;
        this.total = data.totalDatos;
        this.loading=false;
      },
      error => {
        console.log(error);
      }
    )
  }

  goToPage(n: number): void {
    this.page = n;
    this.getSubCategoriasRango();
  }

  onNext(): void {
    this.page++;
    this.getSubCategoriasRango();
  }

  onPrev(): void {
    this.page--;
    this.getSubCategoriasRango();
  }

}
