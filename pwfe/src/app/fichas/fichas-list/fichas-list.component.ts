import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FichasService } from '../fichas.service';
declare var $: any;
declare var M: any;
@Component({
  selector: 'app-fichas-list',
  templateUrl: './fichas-list.component.html',
  styleUrls: ['./fichas-list.component.css']
})
export class FichasListComponent implements OnInit, AfterViewInit{

  data = [];
  medicos = [];
  medicosMap = {};
  clientesMap = {};
  clientes = [];
  subcategorias = [];
  detail = {
    hora: '',
    categoria: '',
    subcategoria: '',
    medico: '',
    paciente: ''
  }
  del = {
    id: '',
    pos: ''
  }
  filtros = {
    doc: '',
    fecha: ''
  }
  edit = {
    nombre: '',
    apellido: '',
    obs: '',
    id: -1
  };
  put = {
    idFichaClinica: -1,
    observacion: ''
  }
  constructor(private api: FichasService) {
  }
  ngOnInit() {
    this.getMedicos();
    this.getFichas();
    this.getClientes();
    this.getSubcategorias();
    var that = this;
    $('#selectMedicos').change(function () {
      that.filtros.doc = $(this).val();
    });
  }

  ngAfterViewInit() {
    $('.modal').modal({
      dismissible: false
    });
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
      container: 'body'
    });
    
  }

  saveEdit(element){
    this.edit.nombre = element.idCliente.nombre;
    this.edit.apellido = element.idCliente.apellido;
    this.edit.obs = element.observacion;
    this.edit.id = element.idFichaClinica;
    $('#obs').val(this.edit.obs);
  }
  getFichas = () => {
    this.api.getFichas().subscribe(
      data => {
        this.data = data.lista;
        console.log(this.data);
      },
      error => {
        console.log(error);
      }

    )
  }

  saveDeleteRecord(id, pos) {
    this.del.id = id;
    this.del.pos = pos;
  }

  deleteRecord() {
    this.api.deleteFicha(this.del.id).subscribe(
      data => {
        this.data.splice(Number(this.del.pos), 1);
        M.toast({ html: 'Ficha eliminada correctamente' });
      },
      error => {
        console.log(error);
        M.toast({ html: 'La ficha no puede ser eliminada' });
      }
    )
  }


  getMedicos() {
    this.api.getMedicos().subscribe(
      data => {
        this.medicos = data.lista;
        var med = {};
        for(var i=0; i< this.medicos.length; i++){
          this.medicosMap[this.medicos[i].nombre+ " "+this.medicos[i].apellido] = this.medicos[i].idPersona;
          med[this.medicos[i].nombre+ " "+this.medicos[i].apellido] = null;
        }
        $('#autocomplete-input-medicos').autocomplete({
          data:med,
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
        for(var i=0; i< this.clientes.length; i++){
          this.clientesMap[this.clientes[i].nombre+ " "+this.clientes[i].apellido] = this.clientes[i].idPersona;
          cli[this.clientes[i].nombre+ " "+this.clientes[i].apellido] = null;
        }
        $('#autocomplete-input-clientes').autocomplete({
          data:cli,
        });
        // var obj: {[k: string]: any} = {};
        // obj.nombre = null;
        // obj.apellido = null;
      },
      error => {
        console.log(error);
      }
    )
  }

  getSubcategorias(){
    this.api.getSubCategorias().subscribe(
      data => {
        this.subcategorias = data.lista;
        setTimeout( ()=>{
          $('#selectSubcategorias').formSelect();
        },2000)
      }, error => {
        console.log(error);
      }
    )
  }
  filter () {
    console.log($('#selectSubcategorias').val());
    // /reserva?ejemplo={"idEmpleado":{"idPersona":3},"fechaDesdeCadena":"20190903","fechaHastaCadena":"20
    // 190920"}
    var c = null;
    var m = null;
    if($('#autocomplete-input-medicos').val() in this.medicosMap){
      m = Number(this.medicosMap[$('#autocomplete-input-medicos').val()]);
    }
    if($('#autocomplete-input-clientes').val() in this.clientesMap){
      c = Number(this.clientesMap[$('#autocomplete-input-clientes').val()]);
    }
    var fil = {
      idEmpleado: {idPersona: m},
      idCliente: {idPersona: c},
      fechaDesdeCadena: $('#fechaDesde').val().replace('/','').replace('/',''),
      fechaHastaCadena: $('#fechaHasta').val().replace('/','').replace('/',''),
      idTipoProducto: { idTipoProducto: $('#selectSubcategorias').val() == null? null: Number($('#selectSubcategorias').val())}
    }
    console.log(fil);
    this.api.filter(fil).subscribe(
      data => {
        this.data = data.lista;
        console.log(this.data);
      },
      error => {
        console.log(error);
      }
    )

  }

  clearFilter(){
    $('#fechaDesde').val('');
    $('#fechaHasta').val('');
    $('#autocomplete-input-clientes').val('');
    $('#autocomplete-input-medicos').val('');
    this.getFichas();
  }

  putService = () => {
    this.put.idFichaClinica = this.edit.id;  
    this.put.observacion = $('#obs').val();
      this.api.putFicha(this.put).subscribe(
        data => {
          this.getFichas();
          console.log(data);
        },
        error => {
          console.log(error);
        }
      )
  }

  saveDetail(el){
    this.detail.hora = el.fechaHora;
    this.detail.medico = el.idEmpleado.nombre + " " + el.idEmpleado.apellido;
    this.detail.paciente = el.idCliente.nombre + " " + el.idCliente.apellido;
    this.detail.categoria = el.idTipoProducto.idCategoria.descripcion;
    this.detail.subcategoria = el.idTipoProducto.descripcion;
  }
//"java.lang.IllegalArgumentException: id to load is required for loading"
}
