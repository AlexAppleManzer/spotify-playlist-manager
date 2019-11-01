import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-playlists-navigator',
  templateUrl: './playlists-navigator.component.html',
  styleUrls: ['./playlists-navigator.component.css']
})
export class PlaylistsNavigatorComponent implements OnInit {
  playlists: any;
  constructor(private spotifyService: SpotifyService) { }
  @Output() clickedPlaylist = new EventEmitter<any>();

  ngOnInit() {
    this.spotifyService.listCurrentUserPlaylists().subscribe(
      result => this.playlists = result,
      err => console.error(err),
      () => console.log(this.playlists),
    )
  }

  playlistClicked(id, name) {
    //console.log("clicked " + id + name)
    this.clickedPlaylist.emit({id, name})
  }

}
