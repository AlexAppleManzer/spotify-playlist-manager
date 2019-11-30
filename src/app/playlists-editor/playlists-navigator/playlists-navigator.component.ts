import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-playlists-navigator',
  templateUrl: './playlists-navigator.component.html',
  styleUrls: ['./playlists-navigator.component.css']
})
export class PlaylistsNavigatorComponent implements OnInit {
  playlists: any;
  currentUser: any;
  constructor(private spotifyService: SpotifyService) { }
  @Output() clickedPlaylist = new EventEmitter<any>();
  @Output() openSearch = new EventEmitter<any>();

  ngOnInit() {
    this.spotifyService.listCurrentUserPlaylists().subscribe(
      result => this.playlists = result,
      err => console.error(err),
      //() => console.log(this.playlists),
    )

    this.spotifyService.getCurrentUserProfile().subscribe(
      res => {
        this.currentUser = res;
      },
      err => console.log(err),
      () => {}
    );
  }

  playlistClicked(item) {
    //console.log("clicked " + id + name)
    if(item.id == "myLibrary") {
      this.clickedPlaylist.emit({id: item.id, name: item.name, editable: true});
      return;
    }
    let editable = this.currentUser.id === item.owner.id
    //console.log(editable)
    this.clickedPlaylist.emit({id: item.id, name: item.name, editable})
  }

  searchClicked(){
    this.openSearch.emit();
  }

}
