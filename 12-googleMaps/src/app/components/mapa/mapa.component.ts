import { Component, OnInit } from '@angular/core';
import { Marcador } from '../../classes/marcador.class';
import { MatSnackBar } from '@angular/material';
import { MatDialog, MatDialogRef } from '@angular/material';
import { MapaEditarComponent } from './mapa-editar.component';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styles: [`
  agm-map{
    height: 500px;
  }
  `]
})
export class MapaComponent implements OnInit {

  duracion = 4; // segundos
  marcadores: Marcador[] = [];

  lat = 51.674818;
  lng = 7.809007;

  constructor(private snackBar: MatSnackBar, public dialog: MatDialog) {
    if (localStorage.getItem('marcadores')) {
      this.marcadores = JSON.parse(localStorage.getItem('marcadores'));
    }
  }

  ngOnInit() {
  }

  agregarMarcador(evento) {
    const nuevoMarcador = new Marcador(evento.coords.lat, evento.coords.lng);

    this.marcadores.push(nuevoMarcador);

    this.guardarStorage();

    this.snackBar.open('Marcador agregado', 'Cerrar', {
      duration: this.duracion * 1000
    });
  }


  borrarMarcador(index: number) {
    this.marcadores.splice(index, 1);
    this.guardarStorage();
    this.snackBar.open('Marcador eliminado', 'Cerrar', {
      duration: this.duracion * 1000
    });
  }


  editarMarcador(marcador: Marcador) {
    const dialogRef = this.dialog.open( MapaEditarComponent, {
      width: '250px',
      data: { titulo: marcador.titulo, descripcion: marcador.descripcion }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);

      if (!result) {
        return;
      }

      marcador.titulo = result.titulo;
      marcador.descripcion = result.descripcion;

      this.guardarStorage();

      this.snackBar.open('Marcador actualizado', 'Cerrar', {
        duration: this.duracion * 1000
      });
    });
  }

  guardarStorage() {
    localStorage.setItem('marcadores', JSON.stringify(this.marcadores));
  }


}
