import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CategoriasService } from '../categorias.service';

declare var $: any;
declare var M: any;

@Component({
  selector: 'app-categoria-list',
  templateUrl: './categoria-list.component.html',
  styleUrls: ['./categoria-list.component.css']
})
export class CategoriaListComponent implements OnInit, AfterViewInit {

  icon = 'add';

  delete = {
    id: '',
    pos: ''
  };

  data = [];

  tableHeaders = ['ID', 'Categoría', 'Acciones'];

  /* Paginacion */
  loading = false;
  total = 0;
  page = 1;
  limit = 20;


  constructor(private api: CategoriasService) { }

  ngOnInit() {
    this.getCategoriaRango();
  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngAfterViewInit() {
    $('.modal').modal({
      dismissible:false
    });
  }

  getCategorias = () => {
    var that = this;
    this.api.getCategorias().subscribe(
      data => {
        console.log(data.lista);
        that.data = data.lista;
      },
      error => {
        console.log(error);
      }

    )
  }

  saveDeleteRecord(id,pos){
    this.delete.id= id;
    this.delete.pos= pos;
  }

  deleteRecord(){
    this.api.deleteCategoria(this.delete.id).subscribe(
      data => {
        this.data.splice(Number(this.delete.pos), 1);
        M.toast({html: 'Categoria eliminada correctamente'})
      },
      error => {
        console.log(error);
      }
    );
  }

  /* Metodos para la paginacion */

  getCategoriaRango = () => {
    this.loading=true;
    var e = 
    { 
      inicio: this.page, 
      cantidad: this.limit
    }
    var that = this;
    this.api.getCategoriaRango(e).subscribe(
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
    this.getCategoriaRango();
  }

  onNext(): void {
    this.page++;
    this.getCategoriaRango();
  }

  onPrev(): void {
    this.page--;
    this.getCategoriaRango();
  }

}
