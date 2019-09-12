import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CategoriasService } from '../categorias.service';
import { Router, ActivatedRoute } from '@angular/router';

declare var $: any;
declare var M: any;

@Component({
  selector: 'app-categoria-edit',
  templateUrl: './categoria-edit.component.html',
  styleUrls: ['./categoria-edit.component.css']
})

export class CategoriaEditComponent implements OnInit {

  id: number;
  categoria = '';
  data;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: CategoriasService
  ) { }

  ngOnInit() {
    this.inicializar();
  }

  inicializar = () => {


    const context = this;
    this.route.params.subscribe(params => {
      if (params.id) {
        context.id = params.id;
        context.getCategoria(params.id);
      } else {
        M.toast({ html:'Error no puede editar este id' });
      }
    });

  }

  // tslint:disable-next-line: ban-types
  getCategoria = ( id: Number ) => {

    const context = this;
    this.service.getCategoria(id).subscribe(
      data => {
        console.log(data)
        context.data = data;
        context.setValues();
      },
      error => {

        M.toast({ html: 'Error cargando la informacion desde el servidor' });

        console.log(error);

      }
    );

  }

  setValues = () => {
    this.categoria = this.data.descripcion;
  }


  put = () => {
    if (this.categoria !== '') {

      const objecto = {
        idCategoria: Number(this.id) ,
        descripcion: this.categoria,
        flagVisible : "S",
        posicion : 1
      };
      console.log(objecto);
      this.service.putCategoria(objecto).subscribe(
        () => {
          M.toast({ html: 'Categoria actulizada con exito' });
          this.router.navigate(['/categorias']);
        },
        error => {
          console.log(error);
        }
      );

    } else {
      M.toast({ html: 'Nombre no puede quedar vacío' });
    }
  }


}
