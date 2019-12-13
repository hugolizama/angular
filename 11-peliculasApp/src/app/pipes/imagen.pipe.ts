import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  urlBase = 'http://image.tmdb.org/t/p';

  transform(imagen: string, tamanio: number = 500): any {
    if (imagen === null) {
      return 'assets/img/no-image.png';
    }

    return `${this.urlBase}/w${ tamanio }${ imagen }`;
  }

}
