import { Component, OnInit } from '@angular/core';
import { ComisionesService } from '../comisiones.service';
import { Router } from '@angular/router';
declare var $: any;
declare var M:any;
@Component({
  selector: 'app-comisiones-add',
  templateUrl: './comisiones-add.component.html',
  styleUrls: ['./comisiones-add.component.css']
})
export class ComisionesAddComponent implements OnInit {

  constructor(private api: ComisionesService, private router: Router) { }

  medicos = [];
  servicios = [];
  ngOnInit() {
    this.getMedicos();

  }

  getMedicos(){
    this.api.getMedicos().subscribe(
      data => {
        this.medicos = data.lista;
        this.getServicios();
        setTimeout(()=>{
          $('#medicos').formSelect();
        },2000);
      },
      error => {
        console.log(error);
      }
    )
  }

  getServicios(){
    this.api.getServicios().subscribe(
      data => {
        this.servicios = data.lista;
        setTimeout(()=>{
          $('#servicios').formSelect();
        },2000);
      },
      error => {
        console.log(error);
      }
    )
  }

  post(){
    var med = $('#medicos').val() == '' ? null : $('#medicos').val();
    var ser = $('#servicios').val();
    var com = $('#comision').val();

    if(ser != '' && com != '' )
    {
      var el = {
        idPresentacionProducto:{idPresentacionProducto:ser},
        idEmpleado: {idPersona:med},
        porcentajeComision: com
      }
      this.api.postComisiones(el).subscribe(
        data => {
          if(data.hasOwnProperty('error'))
          {
            M.toast({html:'Error al guardar comision'});
          }else {
            M.toast({html:'Exito al guardar comision'});
            this.router.navigate(['/comisiones']);
          }
          
        },
        error => {
          console.log(error);
        }
      )
    }else {
      M.toast({html:'Complete los campos'});
    }
  }
}
