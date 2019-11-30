import { Component, OnInit } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { Router } from '@angular/router';

@Component({
  selector: 'app-playlists-editor',
  templateUrl: './playlists-editor.component.html',
  styleUrls: ['./playlists-editor.component.css']
})
export class PlaylistsEditorComponent implements OnInit {
  activePlaylists: any[] = [];
  constructor(private oauthService: OAuthService, private route: Router) { }
  searchShow = false;
  loggedIn = true;

  ngOnInit() {
    this.loggedIn = !!this.oauthService.getAccessToken();
    if(!this.loggedIn) {
      this.route.navigateByUrl('/home')
    }
  }

  loadPlaylist(item){
    // check if playlist is already shown or not enough room to show another playlist
    if (this.activePlaylists.find((value) => item.id === value.id)) {
      // playlist already on screen
      // possible should delete/reorder
      console.log("playlist already on screen")
    } else if (( window.innerWidth - 300 ) / 500 < this.activePlaylists.length) {
    
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

  closeSearch() {
    this.searchShow = false;
  }

  openSearch() {
    this.searchShow = true;
  }

}
