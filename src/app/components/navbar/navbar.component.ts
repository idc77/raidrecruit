import {Component, OnInit} from '@angular/core';
import {JwksValidationHandler, OAuthService} from 'angular-oauth2-oidc';
import {authConfig} from '../../authconfig';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'icod-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public isCollapsed = true;

  constructor(private oauthService: OAuthService) {
    this.oauthService.configure(authConfig);
    this.oauthService.tokenValidationHandler = new JwksValidationHandler();
    this.oauthService.silentRefreshRedirectUri = window.location.origin + '/silent-refresh.html';
    this.oauthService.setupAutomaticSilentRefresh();
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }

  ngOnInit() {
  }

  public login() {
    this.oauthService.initImplicitFlow();
  }

  public logoff() {
    this.oauthService.logOut();
  }

  public isLoggedin() {
    const hasIdToken = this.oauthService.hasValidIdToken();
    const hasAccessToken = this.oauthService.hasValidAccessToken();
    return (hasIdToken && hasAccessToken);
  }

}
