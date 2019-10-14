import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-playlists-detail',
  templateUrl: './playlists-detail.component.html',
  styleUrls: ['./playlists-detail.component.css']
})
export class PlaylistsDetailComponent implements OnInit {
  @Input() playlistId: string;
  @Input() name: string;
  @Output() close = new EventEmitter<string>();
  playlistData: any;
  constructor(private spotifyService: SpotifyService) { }

  ngOnInit() {
    this.spotifyService.getSongsInPlaylist(this.playlistId).subscribe(
      res => this.playlistData = res,
      err => console.error(err),
      () => console.log(this.playlistData)
    )
  }

  closeThis() {
    this.close.emit(this.playlistId);
  }

}
