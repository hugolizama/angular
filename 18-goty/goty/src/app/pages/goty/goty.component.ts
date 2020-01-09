import { Component, OnInit } from '@angular/core';
import { GameService } from '../../services/game.service';
import { Game } from '../../interfaces/interfaces';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-goty',
  templateUrl: './goty.component.html',
  styles: []
})
export class GotyComponent implements OnInit {

  juegos: Game[] = [];

  constructor(private gameService: GameService) { }

  ngOnInit() {
    this.gameService.getNominados()
      .subscribe((res) => {
        console.log(res);
        this.juegos = res;
      });
  }

  votarJuego(juego: Game) {
    this.gameService.votarJuego(juego.id)
      .subscribe((resp: any) => {
        console.log(resp);

        if (resp.of) { // por error le puse of, debio ser ok
          Swal.fire({
            title: 'Gracias',
            text: resp.mensaje,
            icon: 'success'
          });
        } else {
          Swal.fire({
            title: 'Error',
            text: resp.mensaje,
            icon: 'error'
          });
        }

      });
  }
}
