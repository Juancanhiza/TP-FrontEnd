import { Component, OnInit, AfterViewInit } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'pwfe';
  opMobile = ['SERVICIOS','PACIENTES', 'CATEGORÍAS', 'SUBCATEGORÍAS'];
  ngAfterViewInit() {
    $('.sidenav').sidenav();
    $("#menu").click(function () {
      $('.sidenav').sidenav('open');
      $('.collapsible').collapsible();
    });
  }
  ngOnInit() {

  }
}
