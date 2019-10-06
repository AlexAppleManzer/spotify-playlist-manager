import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  
  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  // Gets current user's playlists
  getUserPlaylists(): Observable<any>{
    return this.http.get(this.baseUrl + 'api/Playlists');
  }

}
