import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';
import { DropEvent } from 'ng-drag-drop';

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
  playlistDataItems: any[];
  isUserLibrary: boolean = false;
  @Input() editable: boolean = true;
  constructor(private spotifyService: SpotifyService) { }

  ngOnInit() {
    if (this.playlistId === 'myLibrary') {
      //load user library instead of a playlsit
      this.spotifyService.getCurrentUserLibrary().subscribe(
        result => {
          this.playlistData = result;
          this.playlistDataItems = this.playlistData.items;
        },
        err => console.error(err),
        //() => console.log(this.myLibrary),
      );

      this.isUserLibrary = true;
    } else {
      this.spotifyService.getSongsInPlaylist(this.playlistId).subscribe(
        res => {
          this.playlistData = res;
          this.playlistDataItems = this.playlistData.items;
        },
        err => console.error(err),
        //() => console.log(this.playlistDataItems)
      )
      

    }
  }

  closeThis() {
    this.close.emit(this.playlistId);
  }

  deleteSong(i: number){
    this.playlistDataItems.splice(i, 1);
  }
  
  onItemDrop(event: DropEvent) {
    let draggedSong = event.dragData;
    let draggedSongName = event.dragData.track.name;

    if(this.playlistDataItems.find((song) => song.track.name === draggedSongName)){
      console.log('song already exists in playlist');
      return;
    }

    let droppedSongName = event.nativeEvent.srcElement.innerText;
    
    let droppedLocation = 0;
    if (!this.isUserLibrary){
      droppedLocation = this.playlistDataItems.findIndex((song) => song.track.name === droppedSongName);
    }
    this.playlistDataItems.splice(droppedLocation, 0, draggedSong);
  }

}
