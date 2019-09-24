import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ComisionesService } from '../comisiones.service';
declare var $: any;
declare var M: any;
@Component({
  selector: 'app-comisiones-edit',
  templateUrl: './comisiones-edit.component.html',
  styleUrls: ['./comisiones-edit.component.css']
})
export class ComisionesEditComponent implements OnInit {

  constructor(private route: ActivatedRoute, private api: ComisionesService, private router: Router) { }
  comision;
  comisionId;
  servicios = [];
  medicos = [];
  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) =>  {
      this.comisionId = Number(params.get('id'));
      this.getComision();
    });
  }

  getComision(){
    this.api.getComision(this.comisionId).subscribe(
      data => {
        this.comision = data;
        $('#comision').val(this.comision.porcentajeComision);
        this.getMedicos();
        console.log(data);
      },
      error => {
        console.log(error);
      }
    )
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
      this.comision.idPresentacionProducto.idPresentacionProducto = ser;
      this.comision.idEmpleado.idPersona = med;
      this.comision.porcentajeComision = com;
/*       var el = {
        idPresentacionProducto:{idPresentacionProducto:ser},
        idEmpleado: {idPersona:med},
        porcentajeComision: com
      } */
      console.log(this.comision);
      this.api.putComisiones(this.comision).subscribe(
        data => {
          if(data.hasOwnProperty('error'))
          {
            M.toast({html:'Error al actualizar comisión'});
          }else {
            M.toast({html:'Exito al actualizar comisión'});
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
