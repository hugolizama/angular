import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Game } from '../interfaces/interfaces';
import { of, pipe } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  juegos: Game[] = [];

  constructor(private http: HttpClient) { }

  getNominados() {

    if (this.juegos.length === 0) {
      console.log('Desde internet!');
      return this.http.get<Game[]>(`${environment.url}/api/goty`)
        .pipe(
          tap(
            juegos => this.juegos = juegos
          )
        );
    }

    console.log('Desde cache!');
    return of(this.juegos);
  }


  votarJuego(id: string) {
    return this.http.post(`${environment.url}/api/goty/${id}`, {})
      .pipe(
        catchError(err => {
          // console.log('Error de la petición');
          return of(err.error);
        })
      );
  }
}
