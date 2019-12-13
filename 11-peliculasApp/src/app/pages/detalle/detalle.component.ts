import { Component, OnInit } from '@angular/core';
import { PeliculasService } from '../../services/peliculas.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: []
})
export class DetalleComponent implements OnInit {
  pelicula: any = [];
  cargando = true;
  pag: string;
  textoBusqueda: string;

  constructor(private _ps: PeliculasService, private route: ActivatedRoute) {
    const id = parseInt(this.route.snapshot.paramMap.get('id'), 10);
    this.pag = this.route.snapshot.paramMap.get('pag');
    this.textoBusqueda = this.route.snapshot.paramMap.get('texto');

    if (this.pag === null) {
      this.pag = 'home';
    }

    if (this.textoBusqueda === null) {
      this.textoBusqueda = '';
    }


    this._ps.getPelicula(id)
      .subscribe((resp: any) => {
        // console.log(resp);
        this.pelicula = resp;
        this.cargando = false;
      });
  }

  ngOnInit() {
  }

}
