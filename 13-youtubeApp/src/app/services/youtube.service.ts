import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  private urlBase = 'https://www.googleapis.com/youtube/v3';
  private apiKey = 'AIzaSyATbCxoUiySyxxHScHDHkiPCBo0-RxZXjw';
  private playlist = 'UUG7AaCh_CiG6pq_rRDNw72A';
  private nextPageToken: string;

  constructor(public http: HttpClient) { }

  getVideos() {
    const url = `${this.urlBase}/playlistItems`;
    let params = new HttpParams();

    params = params.append('part', 'snippet');
    params = params.append('maxResults', '10');
    params = params.append('playlistId', this.playlist);
    params = params.append('key', this.apiKey);

    if (this.nextPageToken) {
      params = params.append('pageToken', this.nextPageToken);
    }

    return this.http.get(url, { params: params })
      .pipe(
        map((resp: any) => {
          // console.log(resp);
          this.nextPageToken = resp.nextPageToken;

          const videos: any[] = [];
          for (const video of resp.items) {
            const snippet = video.snippet;
            videos.push(snippet);
          }

          return videos;
        })
      );
  }
}
