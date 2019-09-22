import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ServiciosService } from '../servicios.service'
import {ExcelService} from './service/excel.service';
import * as jspdf from 'jspdf';  
import html2canvas from 'html2canvas'; 
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


  /* Paginacion */
  loading = false;
  total = 0;
  page = 1;
  limit = 20;

  constructor(private api: ServiciosService) { }
  constructor(private api: ServiciosService,private excelService:ExcelService) { }
  tableHeaders = ['Nombre', 'Subcategoría', 'Acciones'];
  ngOnInit() {
    this.getSubcategorias();
    this.getServiciosRango();

    var that = this;
    $('#subCatSelect').change(function() {
      that.filter.subcategoria = $(this).val(); 
//      that.getBySubcategoria($(this).val());
    });
  }
  exportAsXLSX():void {
    var dataExcel = [];
    for(var i=0; i< this.data.length; i++){
      var x = {
        id: this.data[i].idPresentacionProducto, 
        nombre: this.data[i].descripcionGeneral,
        subcategoria:this.data[i].idProducto.idTipoProducto.descripcion
      }
      dataExcel.push(x);
    }
    this.excelService.exportAsExcelFile(dataExcel, 'Servicios');
 }

  ngAfterViewInit() {
    $('.modal').modal({
      dismissible:false
    });
    $('.collapsible').collapsible();
    $('.fixed-action-btn').floatingActionButton();
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
      pdf.save('Servicios.pdf'); // Generated PDF   
    });  
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

  /* Metodos para la paginacion */

  getServiciosRango = () => {
    this.loading=true;
    var e = 
    { 
      inicio: this.page, 
      cantidad: this.limit
    }
    var that = this;
    this.api.getServiciosRango(e).subscribe(
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
    this.getServiciosRango();
  }

  onNext(): void {
    this.page++;
    this.getServiciosRango();
  }

  onPrev(): void {
    this.page--;
    this.getServiciosRango();
  }

}
