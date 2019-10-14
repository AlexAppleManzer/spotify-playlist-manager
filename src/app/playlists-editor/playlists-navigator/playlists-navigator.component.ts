import { Component, OnInit } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-playlists-navigator',
  templateUrl: './playlists-navigator.component.html',
  styleUrls: ['./playlists-navigator.component.css']
})
export class PlaylistsNavigatorComponent implements OnInit {
  playlists: any;
  constructor(private spotifyService: SpotifyService) { }

  ngOnInit() {
    this.spotifyService.listCurrentUserPlaylists().subscribe(
      // result => this.playlists.items = result,
      result => this.playlists = result,
      err => console.error(err),
      () => console.log(this.playlists),
    )
  }

}
