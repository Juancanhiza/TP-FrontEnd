import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriasService } from '../categorias.service';

declare var M: any;

@Component({
  selector: 'app-categoria-add',
  templateUrl: './categoria-add.component.html',
  styleUrls: ['./categoria-add.component.css']
})
export class CategoriaAddComponent implements OnInit {



  categoria = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: CategoriasService
  ) { }

  ngOnInit() {
  }

  post = () => {

    if ( this.categoria !== '') {

      const objeto = {
        descripcion : this.categoria
      };

      this.service.postCategoria(JSON.stringify(objeto)).subscribe(
        () => {
          M.toast({ html: 'Categoria agregada con exito' });
          this.router.navigate(['/categorias']);
        }
      );

    } else {
      M.toast({ html: 'Complete los campos' });
    }

  }

}
