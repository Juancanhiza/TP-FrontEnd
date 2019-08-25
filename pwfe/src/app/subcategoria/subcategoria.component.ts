import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-subcategoria',
  templateUrl: './subcategoria.component.html',
  styleUrls: ['./subcategoria.component.css']
})
export class SubcategoriaComponent implements OnInit {
  descripcion: string = '';
  constructor() { }

  ngOnInit() {
  }

  submmit () {
    alert(this.descripcion);
  }
}
