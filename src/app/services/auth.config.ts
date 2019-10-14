import { AuthConfig } from 'angular-oauth2-oidc';

export const authConfig: AuthConfig = {
  loginUrl: 'https://accounts.spotify.com/authorize',

  // URL of the SPA to redirect the user to after login
  redirectUri: "http://localhost:4200",

  // The SPA's id. The SPA is registered with this id at the auth-server 
  // clientId: '94c2a221b5cd4ceca2a8ff9bd087a0f0',
  clientId: 'a1ef330463754d7da461a40aa3166e39',
  


  skipIssuerCheck: true,
  
  // set the scope for the permissions the client should request
  // The first three are defined by OIDC. The 4th is a usecase-specific one
  scope: 'user-read-private user-read-email',
  

  oidc: false,
  responseType:"token",

  requireHttps: false,
}