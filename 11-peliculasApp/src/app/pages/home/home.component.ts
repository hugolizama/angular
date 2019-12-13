import { Component, OnInit } from '@angular/core';
import { PeliculasService } from '../../services/peliculas.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {

  cartelera: any[] = [];
  populares: any[] = [];
  popularesNinos: any[] = [];
  cargandoCartelera = true;
  cargandoPopulares = true;
  cargandoPopularesNinos = true;

  constructor(public _ps: PeliculasService) {

    /** Cargar peliculas de cartelera */
    const fechaHoy = new Date();
    const fechaIni = new Date();
    fechaIni.setMonth(fechaHoy.getMonth() - 1);

    this._ps.getEnCartelera(fechaIni, fechaHoy)
      .subscribe((resp: any) => {
        // console.log(resp);
        this.cartelera = resp;

        this.cargandoCartelera = false;
      });



    /** Cargar peliculas populares */
    this._ps.getPopulares()
      .subscribe((resp) => {
        // console.log(resp);
        this.populares = resp;

        this.cargandoPopulares = false;
      });


    /** Cargar peliculas populares para niños*/
    this._ps.getPopulares('G')
      .subscribe((resp) => {
        // console.log(resp);
        this.popularesNinos = resp;

        this.cargandoPopularesNinos = false;
      });
  }

  ngOnInit() {
  }

}
