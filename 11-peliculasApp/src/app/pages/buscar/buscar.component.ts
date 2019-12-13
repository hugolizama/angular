import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PeliculasService } from '../../services/peliculas.service';


@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styles: []
})
export class BuscarComponent {
  texto: string;
  peliculas: any[] = [];

  constructor(public _ps: PeliculasService,
              private route: ActivatedRoute) {


    this.route.params
      .subscribe((resp) => {
        this.texto = resp.texto;
        this.buscar();
      });
  }

  buscar() {
    this._ps.buscar(this.texto)
      .subscribe((resp: any) => {
        // console.log(resp);
        this.peliculas = resp;
      });

  }
}
