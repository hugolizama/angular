import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor(private http: HttpClient) { }

  getQuery(query: string) {
    const url = `https://api.spotify.com/v1/${query}`;

    const headers = new HttpHeaders({
      'Authorization': 'Bearer QBTOWr_PBmJGPWCIILiVrD5Bn8GT5MBSos9LGcknXZWdTwzh-U8Wgek5h-_pmej5lDuHwDAaHQtYfyxyz0'
    });

    return this.http.get(url, {headers});
  }

  getNewReleases() {
    return this.getQuery('browse/new-releases')
      .pipe(map((data: any) => {
          return data.albums.items;
        }));
  }


  getArtistas(termino: string) {
    return this.getQuery(`search?q=${termino}&type=artist&limit=15`)
      .pipe(map((data: any) => {
          return data.artists.items;
        }));
  }


  getArtista(id: string) {
    return this.getQuery(`artists/${id}`);
  }


  getTopTracks(id: string) {
    return this.getQuery(`artists/${id}/top-tracks?country=us`)
      .pipe(map((data: any) => {
        return data.tracks;
      }));
  }
}
