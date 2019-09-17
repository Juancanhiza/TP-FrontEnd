import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiciosService } from '../servicios.service';
declare var $: any;
declare var M: any;
@Component({
  selector: 'app-servicios-add',
  templateUrl: './servicios-add.component.html',
  styleUrls: ['./servicios-add.component.css']
})
export class ServiciosAddComponent implements OnInit {

  serv: string = '';
  costo: number = 0;
  subcategorias;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: ServiciosService
  ) { }

  ngOnInit() {
    this.getSubCategorias();
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
  postServicio(element){
    this.service.postServicio(element).subscribe(
      data => {
        M.toast({ html: 'Servicio agregado correctamente' });
        this.router.navigate(['/servicios']);
      },
      error => {
        console.log(error);
      }
    )
  }

  post = () => {
    var idSubCategoria = $('#subCatSelect').val();
    
    if (this.serv != '' && idSubCategoria != null) {
    
      var e = {
        idTipoProducto: Number(idSubCategoria)
      }

      this.service.postProducto(JSON.stringify(e)).subscribe(
        data => {
          var e = {
            nombre: this.serv,
            flagServicio:"S",
            idProducto: { idProducto: data.idProducto},
            codigo: Math.floor(Math.random() * 5000) + 1 + "",
            existenciaProducto: {
              precioVenta: this.costo
            }
          }
          this.postServicio(JSON.stringify(e));
        },
        error => {
          console.log(error);
        }
      )
    } else {
      M.toast({ html: 'Complete los campos' });
    }


  }

}
