import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'contrasena'
})
export class ContrasenaPipe implements PipeTransform {

  transform(value: string, visualizar: boolean = false): any {

    let resultado = value;
    let texto: any;

    if (!visualizar) {
      texto = value.split('');

      for (let i in texto) {
        texto[i] = '*';
      }

      resultado = texto.join('');
    }

    return resultado;
  }

}
