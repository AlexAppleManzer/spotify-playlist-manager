import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  baseUrl = "https://api.spotify.com/v1"

  constructor(private httpClient: HttpClient) { }


  public listCurrentUserPlaylists() {
    return this.httpClient.get(this.baseUrl + "/me/playlists")
  }

  public getSongsInPlaylist(id:string, offset: number = 0) {
    return this.httpClient.get(this.baseUrl + `/playlists/${id}/tracks`, {params: new HttpParams().append('limit', '50').append('offset', offset.toString())})
  }

  public getCurrentUserLibrary(offset: number = 0) {
    return this.httpClient.get(`${this.baseUrl}/me/tracks`, {params: new HttpParams().append('limit', '50').append('offset', offset.toString())})
  }

  public getCurrentUserProfile() {
    return this.httpClient.get(`${this.baseUrl}/me`);
  }

  public insertTrackIntoPlaylist(trackURI: string, position: number, destinationPlaylistId: string) {
    return this.httpClient.post(`${this.baseUrl}/playlists/${destinationPlaylistId}/tracks`,
      {uris: [trackURI], position});
  }

  public removeTrackFromPlaylist(trackURI: string, playlistId: string) {
    // removes all instances of the track from the playlist
    return this.httpClient.request('delete', `${this.baseUrl}/playlists/${playlistId}/tracks`, {body: {tracks: [{uri: trackURI}]}});
  }

  public addSongToCurrentUserLibrary(trackId: string) {
    return this.httpClient.put(`${this.baseUrl}/me/tracks`, {}, {params: new HttpParams().append("ids", trackId)});
  }

  public removeSongFromCurrentUserLibrary(trackId: string) {
    return this.httpClient.delete(`${this.baseUrl}/me/tracks`, {params: new HttpParams().append("ids", trackId)});
  }

  public searchSongsByKeyword(search: string, offset: Number = 0) {
    return this.httpClient.request('get', `${this.baseUrl}/search`, {params: new HttpParams().append("q", search).append("type", "track").append("offset", offset.toString())})
  }
  
  public createPlaylist(name: string, publicPlaylist: boolean = true, description: string = "") {
    return this.httpClient.post(`${this.baseUrl}/me/playlists`, {name, public: publicPlaylist, description});
  }
}
