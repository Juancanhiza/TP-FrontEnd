import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'serviciosFilter'
})
export class ServiciosFilterPipe implements PipeTransform {

  transform(items: any[], searchText: string): any[] {
    if(!items) return [];
    if(!searchText) return items;
    searchText = searchText.toLowerCase();
    return items.filter( it => {
      return it.nombre.toLowerCase().includes(searchText) ||
      it.idProducto.idTipoProducto.descripcion.toLowerCase().includes(searchText) ||
      it.idProducto.idTipoProducto.idCategoria.descripcion.toLowerCase().includes(searchText);
    });
   }

}
