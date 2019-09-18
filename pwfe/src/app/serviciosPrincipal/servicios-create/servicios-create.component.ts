import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-servicios-create',
  templateUrl: './servicios-create.component.html',
  styleUrls: ['./servicios-create.component.css']
})
export class ServiciosCreateComponent implements OnInit {

  idFicha;

  tableHeaders = [
    'idFicha', 'Fecha',
    'Categoria', 'Subcategoria',
    'Acciones'
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
  }

  inicializar = () => {


    const context = this;
    this.route.params.subscribe(params => {
      if (params.idFicha) {
        context.idFicha = params.idFicha;
      } else {
        //M.toast({ html:'Error no puede editar este id' });
      }
    });

  }

}
