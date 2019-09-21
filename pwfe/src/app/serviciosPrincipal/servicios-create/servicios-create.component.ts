import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ServiciosPrincipalService } from '../servicios-principal.service';


@Component({
  selector: 'app-servicios-create',
  templateUrl: './servicios-create.component.html',
  styleUrls: ['./servicios-create.component.css']
})
export class ServiciosCreateComponent implements OnInit {

  idCliente;
  idEmpleado;

  fichas;

  tableHeaders = [
    'idFicha', 'Fecha',
    'Categoria', 'Subcategoria',
    'Acciones'
  ];

  

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api: ServiciosPrincipalService
  ) { }

  ngOnInit() {
    
    this.inicializar();
  }

  inicializar = () => {


    const context = this;
    this.route.params.subscribe(params => {
      if (params.idCliente && params.idEmpleado) {
        context.idCliente = params.idCliente;
        context.idEmpleado = params.idEmpleado;
        context.getFicha(context.idCliente, context.idEmpleado);
      } else {
        //M.toast({ html:'Error no puede editar este id' });
      }
    });

  }

  getFicha = (idCliente,idEmpleado) =>{
    const context = this;

    this.api.getFicha(idCliente,idEmpleado).subscribe( 
      (data) => {
        context.fichas = data.lista;
      }
      );
  }

}
