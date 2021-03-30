import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { YoutubeResponse } from '../models/youtube-models';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  private youtubeUrl = 'https://www.googleapis.com/youtube/v3';
  private apiKey = 'YOUR_API_KEY_HERE';
  private playList = 'PLP-Bu4qV8Z71H2yyCE5p7jx-kOXpv3ZQJ';
  private nextPageToken = '';

  constructor(private http: HttpClient) {}
   
  getVideos() {

     const url = `${this.youtubeUrl}/playlistItems`;
     const params = new HttpParams()
     .set('part', 'snippet')
     .set('maxResults', '12')
     .set('playlistId', this.playList)
     .set('key', this.apiKey)
     .set('pageToken', this.nextPageToken);

     return this.http.get<YoutubeResponse>( url , { params } )
     .pipe(
      map(resp => {
        this.nextPageToken = resp.nextPageToken;
        return resp.items;
      }),
      map(items =>{
        return items.map( video => video.snippet );
      })
     );
   }
}
