import { Component,AfterViewInit,ElementRef, OnInit } from '@angular/core';
import * as jspdf from 'jspdf';  
import html2canvas from 'html2canvas'; 
import { ApiService } from '../api.service';
declare var $: any;
declare var M: any;
@Component({
  selector: 'app-subcategoria',
  templateUrl: './subcategoria.component.html',
  styleUrls: ['./subcategoria.component.css']
})

export class SubcategoriaComponent implements OnInit {
  descripcion: string = '';
  add = true;
  data = [];
  p: number = 1;
  categorias = [];
  editId = -1;
  tableHeaders = ['Descripcion', 'Categoria', 'Acciones'];
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
  public captureScreen()  
  {  
    var data = document.getElementById('contentToConvert');  
    html2canvas(data).then(canvas => {  
      // Few necessary setting options  
      var imgWidth = 208;   
      var pageHeight = 295;    
      var imgHeight = canvas.height * imgWidth / canvas.width;  
      var heightLeft = imgHeight;  
  
      const contentDataURL = canvas.toDataURL('image/png')  
      let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF  
      var position = 0;  
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)  
      pdf.save('MYPdf.pdf'); // Generated PDF   
    });  
  }  

  submmit () {
    alert(this.descripcion);
  }

  deleteItem = {
    id: -1
  }

  guardarPos(id){
    this.deleteItem.id = id
  }

  getSubCategorias() {
    var that = this;
    this.api.getSubCategorias().subscribe(
      data => {
        that.data = data.lista;
        console.log(this.data);
      },
      error => {
        console.log(error);
      }
    )
  }

  getCategorias() {
    var that = this;
    this.api.getCategorias().subscribe(
      data => {
        that.categorias = data.lista;
        setTimeout(()=>{
          $('select').formSelect();
        },2000);
        console.log(this.categorias);
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
      }
    )
  }
  updateSubCategoria(element) { 
    this.api.updateSubCategoria(element).subscribe(
      data => {
        this.getSubCategorias();
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

  
  editRecord() {
    var idCategoria = Number($("#selectCategoriasEdit").val());
    var descripcion = $('#descripcion-edit').val();
    console.log(idCategoria, descripcion, $('#descripcion-edit').val());
    // if (idCategoria == 'Seleccione' || descripcion == '' ) {
    //   M.toast({ html: 'Complete todos los campos para guardar' });
    // } else {    
      var recordUpdate = {
        idTipoProducto: this.editId,
        idCategoria:{idCategoria:idCategoria},
        descripcion:descripcion,
        flagVisible : "S",
        posicion:1
      }
      this.updateSubCategoria(recordUpdate);
     $('#modal-edit').modal('close');
    // }
  }
  showModalEdit(element) {

    this.editId = element.idTipoProducto;
    $('#selectCategoriasEdit').val(element.idCategoria.idCategoria);
    $('#idCategoria-edit').val(element.idCategoria);
    $('#descripcion-edit').val(element.descripcion);
    $('#modal-edit').modal('open');
  }

  delete() {
    this.api.deleteSubCategoriaProcesos(this.deleteItem.id).subscribe(
      data => {
        M.toast({ html: 'SubCategoria Eliminada' });
        this.getSubCategorias();
      },
      error => {
        M.toast({ html: 'La SubCategoria está en uso y no puede eliminarse' });
      }
    )
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
