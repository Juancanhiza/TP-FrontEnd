import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FichasService } from '../fichas.service';
declare var $: any;
declare var M: any;
@Component({
  selector: 'app-fichas-add',
  templateUrl: './fichas-add.component.html',
  styleUrls: ['./fichas-add.component.css']
})
export class FichasAddComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api: FichasService
  ) { }

  medicos = [];
  medicosMap = {};
  clientes = [];
  clientesMap = {};
  data = [];
  reservas = [];
  table = false;
  subcategorias = [];
  filtros = {
    medico: 0,
    fecha: 0,
    sololibres: true
  }
  saveData = {
    fechaCadena: '',
    horaInicioCadena: '',
    horaFinCadena: '',
    idEmpleado: -1,
    idCliente: -1,
  }
  pos = -1;
  ngOnInit() {
    this.getMedicos();
    this.getClientes();
    this.getSubcategorias();
  }

  ngAfterViewInit() {
    $('.datepicker').datepicker({
      format: "yyyy/mm/dd",
      i18n: {
        cancel: 'Cancelar',
        clear: 'Limpiar',
        done: 'Aceptar',
        months: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
        monthsShort: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Set", "Oct", "Nov", "Dic"],
        weekdays: ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
        weekdaysShort: ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"],
        weekdaysAbbrev: ["D", "L", "M", "M", "J", "V", "S"]
      },
      // minDate: new Date(1940,1,1),
      // maxDate: new Date(),
      //yearRange:[(new Date).getFullYear(),2080],
      container: 'body'
    });
  }

  getMedicos() {
    this.api.getMedicos().subscribe(
      data => {
        this.medicos = data.lista;
        var med = {};
        for (var i = 0; i < this.medicos.length; i++) {
          this.medicosMap[this.medicos[i].nombre + " " + this.medicos[i].apellido] = this.medicos[i].idPersona;
          med[this.medicos[i].nombre + " " + this.medicos[i].apellido] = null;
        }
        $('#autocomplete-input-medicos').autocomplete({
          data: med,
        });
      },
      error => {
        console.log(error);
      }
    )
  }

  getClientes() {
    this.api.getPacientes().subscribe(
      data => {
        this.clientes = data.lista;
        var cli = {};
        for (var i = 0; i < this.clientes.length; i++) {
          this.clientesMap[this.clientes[i].nombre + " " + this.clientes[i].apellido] = this.clientes[i].idPersona;
          cli[this.clientes[i].nombre + " " + this.clientes[i].apellido] = null;
        }
        $('#autocomplete-input-clientes').autocomplete({
          data: cli,
        });
      },
      error => {
        console.log(error);
      }
    )
  }

  getSubcategorias() {
    this.api.getSubCategorias().subscribe(
      data => {
        this.subcategorias = data.lista;
        console.log(this.subcategorias);
        setTimeout(() => {
          $('#selectSubcategorias').formSelect();
        }, 2000)
        console.log(this.subcategorias);
      }, error => {
        console.log(error);
      }
    )
  }

  radio = (evt, horaI, horaF) => {
    var target = evt.target;
    if (target.checked) {
      this.saveData.horaInicioCadena = horaI;
      this.saveData.horaFinCadena = horaF;
    }
  }

  post = () => {
    // {
    //   "motivoConsulta": "dolor en la rodilla",
    //   "diagnostico":"lesion leve, fisioterapia 10 sesiones",
    //   "observacion":"nada grave",
    //   "idEmpleado":{
    //   "idPersona":4
    //   },
    //   "idCliente":{
    //   "idPersona":6
    //   },
    //   "idTipoProducto": {
    //      "idTipoProducto":3
    //    }
    // }
    var cliente = Number(this.clientesMap[$('#autocomplete-input-clientes').val()]);
    var medico = Number(this.clientesMap[$('#autocomplete-input-medicos').val()]);
    var subcategoria = Number($('#selectSubcategorias').val());
    if (Number.isInteger(cliente) && Number.isInteger(medico) && Number(subcategoria) != 0
      && $('#motivo').val() != '' && $('#diagnostico').val() != '' && $('#obs').val() != '') {
      var e = {
        motivoConsulta: $('#motivo').val(),
        diagnostico: $('#diagnostico').val(),
        observacion: $('#obs').val(),
        idEmpleado: {
          idPersona: medico
        },
        idCliente: {
          idPersona: cliente
        },
        idTipoProducto: {
          idTipoProducto: subcategoria
        }
      }
      this.api.postFicha(e).subscribe(
        data => {
          M.toast({ html: 'Ficha agregada correctamente' });
          this.router.navigate(['/fichas']);
        },
        error => {
          console.log(error);
        }
      )

    } else {
      M.toast({ html: 'Complete los campos' });
    }
  }

}
