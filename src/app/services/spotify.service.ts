import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  baseUrl = "https://api.spotify.com/v1"

  constructor(private httpClient: HttpClient) { }


  public listCurrentUserPlaylists() {
    return this.httpClient.get(this.baseUrl + "/me/playlists")
  }

  public getSongsInPlaylist(id:string) {
    return this.httpClient.get(this.baseUrl + `/playlists/${id}/tracks`)
  }
}
