import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HomeComponent } from './home/home.component';
import { PlaylistsEditorComponent } from './playlists-editor/playlists-editor.component';
import { PlaylistsDetailComponent } from './playlists-editor/playlists-detail/playlists-detail.component';
import { PlaylistsNavigatorComponent } from './playlists-editor/playlists-navigator/playlists-navigator.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    HomeComponent,
    PlaylistsEditorComponent,
    PlaylistsDetailComponent,
    PlaylistsNavigatorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
