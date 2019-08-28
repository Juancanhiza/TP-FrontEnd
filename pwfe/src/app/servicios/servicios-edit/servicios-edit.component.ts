import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ServiciosService } from '../servicios.service';
declare var $: any;
@Component({
  selector: 'app-servicios-edit',
  templateUrl: './servicios-edit.component.html',
  styleUrls: ['./servicios-edit.component.css']
})
export class ServiciosEditComponent implements OnInit, AfterViewInit {
  serv: string = '';
  servicio;
  subcategorias;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: ServiciosService
  ) { }

  ngOnInit() {
    this.getSubCategorias();
    this.getId();
  }

  ngAfterViewInit() {
    $('select').formSelect();
  }

  getSubCategorias = () => {
    var that = this;
    this.service.getSubcategorias().subscribe(
      data => {
        that.subcategorias = data.lista;
      },
      error => {
        console.log(error);
      }
    )
  }

  getServicio = (id) => {
    var that = this;
    this.service.getServicio(id).subscribe(
      data => {
        that.servicio = data;
        that.setValues();
      },
      error => {
        console.log(error);
      }
    )
  }
  setValues = () => {
    this.serv = this.servicio.nombre;
    var idSubcategoria = this.servicio.idProducto.idTipoProducto.idTipoProducto;
    $('#subCatSelect').val(idSubcategoria);
  }

  getId() {
    var that = this;
    this.route.params.subscribe(params => {
      if (params['id']) {
        that.getServicio(params['id']);
      }
    });
    
  }

  put = () => {
    var idSubCategoria = $('#subCatSelect').val();
    var result = this.subcategorias.find(obj => {
      return obj.idTipoProducto == idSubCategoria;
    });
    this.servicio.nombre = this.serv;
    this.servicio.idProducto.idTipoProducto = result;

    this.service.putServicio(this.servicio).subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );
      
  }
}
