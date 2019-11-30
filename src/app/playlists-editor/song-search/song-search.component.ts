import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-song-search',
  templateUrl: './song-search.component.html',
  styleUrls: ['./song-search.component.css']
})
export class SongSearchComponent implements OnInit {
  playlistDataItems = [];
  playlistData: any;
  @Output() close = new EventEmitter<string>();
  constructor(private spotifyService: SpotifyService) { }

  ngOnInit() {
  }

  search(keyword : string) {

    this.spotifyService.searchSongsByKeyword(keyword).subscribe(
      (result) => {
        this.playlistData = result;
        this.playlistDataItems = this.playlistData.tracks.items;
      },
      (err) => console.error(err),
      () => {
        
      }
    )
  }

  closeThis() {
    this.close.emit();
  }

}
