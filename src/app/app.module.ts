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
import { LoginComponent } from './navbar/login/login.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { OAuthModule } from 'angular-oauth2-oidc';
import { SpotifyInterceptor } from './helpers/spotify.interceptor';
import { NgDragDropModule } from 'ng-drag-drop';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    HomeComponent,
    PlaylistsEditorComponent,
    PlaylistsDetailComponent,
    PlaylistsNavigatorComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    OAuthModule.forRoot(),
    NgDragDropModule.forRoot(),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: SpotifyInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
