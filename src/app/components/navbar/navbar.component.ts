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
