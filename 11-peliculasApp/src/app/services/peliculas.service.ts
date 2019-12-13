import { Injectable } from '@angular/core';
import { HttpClient, HttpClientJsonpModule } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {

  private apiKey = '3385e2498ec69b33a8e4dd30c216f7d1';
  private urlMoviedb = 'https://api.themoviedb.org/3';

  peliculas: any[] =[];

  constructor(private http: HttpClient) { }

  getEnCartelera(ini: Date, hoy: Date) {
    const hoyTxt = `${hoy.getFullYear()}-${hoy.getMonth() + 1}-${hoy.getDate()}`; // fecha limite
    const iniTxt = `${ini.getFullYear()}-${ini.getMonth() + 1}-${ini.getDate()}`; // fecha de inicio

    const url = `${this.urlMoviedb}/discover/movie?sort_by=popularity.desc&primary_release_date.gte=${iniTxt}&primary_release_date.lte=${hoyTxt}&region=US&api_key=${this.apiKey}&language=es&callback=JSONP_CALLBACK`;

    return this.http.jsonp(url, 'JSONP_CALLBACK')
      .pipe(
        map((resp: any) => {
          if (resp.results.length === 0) {
            return;
          }

          const items = [];
          for (let index = 0; index < 6; index++) {
            items.push(resp.results[index]);
          }

          return items;
        })
      );
  }


  getPopulares(genero?: string) {

    if (genero) {
      genero = `&certification_country=US&certification.lte=${genero}`;
    } else {
      genero = '';
    }

    const url = `${this.urlMoviedb}/discover/movie?sort_by=popularity.desc&region=US${genero}&api_key=${this.apiKey}&language=es&callback=JSONP_CALLBACK`;

    // return this.http.get(url);

    return this.http.jsonp(url, 'JSONP_CALLBACK')
      .pipe(
        map((resp: any) => {
          if (resp.results.length === 0) {
            return;
          }

          const items = [];
          for (let index = 0; index < 6; index++) {
            items.push(resp.results[index]);
          }

          return items;
        })
      );
  }


  getPelicula(id: number) {
    const url = `${this.urlMoviedb}/movie/${id}?api_key=${this.apiKey}&language=es&callback=JSONP_CALLBACK`;

    return this.http.jsonp(url, 'JSONP_CALLBACK');
  }


  buscar(texto: string) {
    const url = `${this.urlMoviedb}/search/movie?query=${texto }&region=US&api_key=${this.apiKey}&language=es&callback=JSONP_CALLBACK`;

    return this.http.jsonp(url, 'JSONP_CALLBACK')
      .pipe(
        map((resp: any) => {
          this.peliculas = resp.results;
          return resp.results;
        })
      );
  }
}
