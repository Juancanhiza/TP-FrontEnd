import { Component, OnInit } from '@angular/core';
import { ComisionesService } from '../comisiones.service';

@Component({
  selector: 'app-comisiones-list',
  templateUrl: './comisiones-list.component.html',
  styleUrls: ['./comisiones-list.component.css']
})
export class ComisionesListComponent implements OnInit {

  constructor(private api: ComisionesService) { }

  ngOnInit() {
    this.getComisiones();
  }
  data = [];
  getComisiones(){
    this.api.getComisiones().subscribe(
      data => {
        this.data = data.lista;
        console.log(this.data);
      },
      error => {
        console.log(error);
      }
    )
  }

}
