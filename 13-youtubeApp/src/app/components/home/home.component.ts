import { Component, OnInit } from '@angular/core';
import { YoutubeService } from '../../services/youtube.service';

declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {

  videos: any[] = [];
  videoSel: any;

  constructor(public _yts: YoutubeService) {
    this._yts.getVideos()
      .subscribe((resp: any) => {
        // console.log(resp);
        this.videos = resp;
      });
  }

  ngOnInit() {
  }

  verVideo(video: any) {
    // console.log(video);
    this.videoSel = video;
    $('#videoModal').modal();
  }

  cerrarModal() {
    this.videoSel = null;
    $('#videoModal').modal('hide');
  }

  cargarVideos() {
    this._yts.getVideos()
      .subscribe((resp: any) => {
        // console.log(resp);
        this.videos.push.apply(this.videos, resp);
      });
  }
}
