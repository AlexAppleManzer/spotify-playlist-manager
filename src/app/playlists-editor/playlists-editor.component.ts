import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-playlists-editor',
  templateUrl: './playlists-editor.component.html',
  styleUrls: ['./playlists-editor.component.css']
})
export class PlaylistsEditorComponent implements OnInit {
  activePlaylists: any[] = [];
  constructor() { }

  ngOnInit() {
  }

  loadPlaylist(item){
    // check if playlist is already shown or not enough room to show another playlist
    if (this.activePlaylists.find((value) => item.id === value.id)) {
      // playlist already on screen
      // possible should delete/reorder
      console.log("playlist already on screen")
    } else if (( window.screen.width - 300 ) / 400 < this.activePlaylists.length) {
      // show toast prompt saying can't add more
      // maybe replace oldest one?
      console.log("max playlists reached")
    } else {
      this.activePlaylists.push(item);
    }
  }

  closePlaylist(id){
    this.activePlaylists = this.activePlaylists.filter((value) => value.id != id)
  }

}
