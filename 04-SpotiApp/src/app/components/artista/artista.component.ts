import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-artista',
  templateUrl: './artista.component.html',
  styles: []
})
export class ArtistaComponent {
  id: string;
  artista: any = {};
  loading: boolean;
  topTracks: any[] = [];

  constructor(private router: ActivatedRoute, private spotify: SpotifyService) {
    this.loading = true;
    this.router.params.subscribe(params => {
      this.id = params['id'];

      this.getArtista(this.id);
      this.getTopTracks(this.id);
    });
  }


  getArtista(id: string) {
    this.spotify.getArtista(id)
      .subscribe((data: any) => {
        // console.log(data);
        this.artista = data;
      });
  }


  getTopTracks(id: string) {
    this.spotify.getTopTracks(id)
      .subscribe(topTracks => {
        console.log(topTracks);
        this.topTracks = topTracks;
        this.loading = false;
      });
  }
}
