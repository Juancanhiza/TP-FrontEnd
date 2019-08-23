import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {
  descripcion: string = '';
  constructor() { }

  ngOnInit() {
  }

  submmit () {
    alert(this.descripcion);
  }
}
