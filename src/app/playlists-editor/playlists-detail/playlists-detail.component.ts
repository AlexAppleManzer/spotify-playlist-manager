import { Component, OnInit, Input, Output, EventEmitter, ɵCompiler_compileModuleSync__POST_R3__ } from '@angular/core';
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
  playlistIncomplete = false;

  
  constructor(private spotifyService: SpotifyService) { }

  ngOnInit() {
    if (this.playlistId === 'myLibrary') {
      //load user library instead of a playlsit
      this.spotifyService.getCurrentUserLibrary().subscribe(
        result => {
          this.playlistData = result;
          this.playlistDataItems = this.playlistData.items;
          this.playlistIncomplete = this.playlistData.total > this.playlistDataItems.length
        },
        err => console.error(err),
        //() => console.log(this.playlistData),
      );

      this.isUserLibrary = true;
    } else {
      this.spotifyService.getSongsInPlaylist(this.playlistId).subscribe(
        res => {
          this.playlistData = res;
          this.playlistDataItems = this.playlistData.items;
          this.playlistIncomplete = this.playlistData.total > this.playlistDataItems.length
        },
        err => console.error(err),
        //() => console.log(this.playlistData)
      )
    }
  }

  loadMoreSongs() {
    if (this.playlistId === 'myLibrary') {
      //load user library instead of a playlsit
      this.spotifyService.getCurrentUserLibrary(this.playlistDataItems.length).subscribe(
        result => {
          this.playlistData = result;
          this.playlistDataItems = this.playlistDataItems.concat(this.playlistData.items);
          this.playlistIncomplete = this.playlistData.total > this.playlistDataItems.length;
        },
        err => console.error(err),
        //() => console.log(this.myLibrary),
      );

      this.isUserLibrary = true;
    } else {
      this.spotifyService.getSongsInPlaylist(this.playlistId, this.playlistDataItems.length).subscribe(
        res => {
          this.playlistData = res;
          this.playlistDataItems = this.playlistDataItems.concat(this.playlistData.items);
          this.playlistIncomplete = this.playlistData.total > this.playlistDataItems.length;
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
    let self = this;
    let callback = function() {
      self.playlistDataItems = self.playlistDataItems.filter((item) => item.track.id !== self.playlistDataItems[i].track.id)
    }

    if (this.isUserLibrary) {
      this.spotifyService.removeSongFromCurrentUserLibrary(this.playlistDataItems[i].track.id).subscribe(
        res => {},
        err => console.error(err),
        () => callback(),
      )
      return;
    }
    this.spotifyService.removeTrackFromPlaylist(this.playlistDataItems[i].track.uri, this.playlistId).subscribe(
      res => {},
      err => console.error(err),
      () => callback(),
    )
    
  }
  
  onItemDrop(event: DropEvent) {
    let draggedSong = event.dragData;
    let draggedSongName = "";
    let draggedSongId = "";
    let draggedSongUri = "";
    let draggedSongArtists = "";

    if (draggedSong.track) {
      draggedSongName = event.dragData.track.name;
      draggedSongId = event.dragData.track.id;
      draggedSongUri = event.dragData.track.uri;
      draggedSongArtists = event.dragData.track.artists;
    } else {
      draggedSongName = event.dragData.name;
      draggedSongId = event.dragData.id;
      draggedSongUri = event.dragData.uri;
      draggedSongArtists = event.dragData.artists;
    }
    

    if(this.playlistDataItems.find((song) => song.track.name === draggedSongName)){
      console.log('song already exists in playlist');
      return;
    }

    let droppedSongName = event.nativeEvent.srcElement.id || "not found";
    let self = this;
    let callbackFunction = function () {self.playlistDataItems.splice(droppedLocation, 0, {track: {name: draggedSongName, artists: draggedSongArtists, id: draggedSongId, uri: draggedSongUri}})};
    let droppedLocation = 0;
    if (this.isUserLibrary) {
      this.spotifyService.addSongToCurrentUserLibrary(draggedSongId).subscribe(
        res => {},
        err => console.error(err),
        () => callbackFunction(),
      )
    } else {
      droppedLocation = this.playlistDataItems.findIndex((song) => song.track.name === droppedSongName);
      if (droppedLocation === -1) {
        droppedLocation = this.playlistDataItems.length
      }
      

      this.spotifyService.insertTrackIntoPlaylist(draggedSongUri, droppedLocation, this.playlistId).subscribe(
        res => {},
        err => console.error(err),
        () => callbackFunction(),
      )
    }
  }
}
