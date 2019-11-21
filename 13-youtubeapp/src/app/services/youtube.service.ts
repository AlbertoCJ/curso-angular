import { Injectable } from '@angular/core';
import { HttpClient, HttpParams  } from '@angular/common/http';
import { map } from 'rxjs/operators';




@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  private youtubeUrl ='https://www.googleapis.com/youtube/v3';
  private apikey = 'AIzaSyD5_XNm_qKYw3wzVxhScDgrAFbcLSRE3uI';
  private playlist = 'PLCKuOXG0bPi2WNLzimZB7GRSTgqj0J132';

  private nextPageToken = '';

  constructor( public http: HttpClient ) { }

  getVideos() {
    const url = `${ this.youtubeUrl }/playlists`;
    // const myparams = new HttpParams();
    // myparams.append('part', 'snippet');
    // myparams.append('maxResults', '10');
    // myparams.append('playlistId', this.playlist);
    // myparams.append('key', this.apikey);

    return this.http.get(url, { params: { part: 'snippet', maxResults: '10', id: this.playlist, key: this.apikey } }).pipe(
            map((res: any) => {
              // this.nextPageToken = res.json().nex
              const videos: any[] = [];
              for (const video of res.items) {
                // const snippet = video.snippet;
                videos.push(video);
              }
              return videos;
            })
    )
  }
}
