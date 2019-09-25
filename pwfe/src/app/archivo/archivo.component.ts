import { Component, OnInit, Input } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-archivo',
  templateUrl: './archivo.component.html',
  styleUrls: ['./archivo.component.css']
})
export class ArchivoComponent implements OnInit {

  fileData: File = null;
  previewUrl: any = null;
  fileUploadProgress: string = null;
  uploadedFilePath: string = null;

  @Input() nroFicha: Number;
  constructor(private http: HttpClient) { }

  ngOnInit(){}
  fileProgress(fileInput: any) {
    this.fileData = <File>fileInput.target.files[0];
    this.preview();
  }

  preview() {
    // Show preview 
    var mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(this.fileData);
    reader.onload = (_event) => {
      this.previewUrl = reader.result;
    }
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('file', this.fileData);
    formData.append('nombre', 'hola.pdf');
    formData.append('idFichaClinica', '21');
    console.log(formData);
    this.http.post('stock-pwfe/fichaArchivo/archivo', formData)
      .subscribe(res => {
        console.log(res);
        alert('SUCCESS !!');
      })
  }

}
