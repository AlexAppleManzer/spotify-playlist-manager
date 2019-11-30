import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OAuthService } from 'angular-oauth2-oidc';
import { Router } from '@angular/router';
import {tap} from 'rxjs/operators';

@Injectable()
export class SpotifyInterceptor implements HttpInterceptor {
  constructor(private oauthService: OAuthService, private route: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    let token = this.oauthService.getAccessToken();
    if (token && request.url.startsWith("https://api.spotify.com/v1")) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(request).pipe( tap(() => {},
    (err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status !== 401) {
          return;
        }
        this.oauthService.logOut();
      }
    }));
  }
}