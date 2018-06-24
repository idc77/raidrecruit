import {AuthConfig} from 'angular-oauth2-oidc';

export const authConfig: AuthConfig = {
  issuer: 'https://connect.icod.de/auth/realms/contested.de',
  redirectUri: window.location.origin,
  silentRefreshRedirectUri: window.location.origin + '/silent-refresh.html',
  clientId: 'web-client',
  scope: 'openid profile email',
};
