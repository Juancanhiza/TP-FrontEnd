import { Component, OnInit, Input } from '@angular/core';
import { ArchivosService } from '../archivos.service';
import { HttpClient } from '@angular/common/http';
declare var M: any;
@Component({
  selector: 'app-archivos-add',
  templateUrl: './archivos-add.component.html',
  styleUrls: ['./archivos-add.component.css']
})
export class ArchivosAddComponent implements OnInit {
  selectedFile: File;
  
  @Input() nroFicha: number;
  
  constructor(private api: ArchivosService, private http: HttpClient) { }
  
  ngOnInit() {
  }

  onFileChanged(event) {
    this.selectedFile = event.target.files[0]
  }

  onUpload() {
    var e = {
      file: this.selectedFile,
      nombre: this.selectedFile.name,
      idFichaClinica: 35
    }
    console.log(e);
    this.api.postArchivo(e).subscribe(
      () => {
        M.toast({ html: 'Archivo agregado con exito' });
        }
      );
  }

  onUpload2() {
    const uploadData = new FormData();
    uploadData.append('file', this.selectedFile);
    uploadData.append('nombre', this.selectedFile.name);
    uploadData.append('idFichaClinica', '35');

    this.api.postArchivo(uploadData).subscribe(
      () => {
        M.toast({ html: 'Archivo agregado con exito' });
        }
      );
    /*
    this.http.post('/stock-pwfe/fichaArchivo/archivo', uploadData, {
      reportProgress: true,
      observe: 'events'
    })
      .subscribe(event => {
        console.log(event); // handle event here
      });
      */
  }



}

