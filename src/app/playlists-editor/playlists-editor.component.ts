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
    this.activePlaylists.push(item);
  }

  closePlaylist(id){
    this.activePlaylists = this.activePlaylists.filter((value) => value.id != id)
  }

}
