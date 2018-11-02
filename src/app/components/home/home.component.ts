import { Component, OnInit } from '@angular/core';
import {OAuthService} from 'angular-oauth2-oidc';
import {Router} from '@angular/router';

@Component({
  selector: 'icod-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private oauthService: OAuthService,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  login() {
    this.oauthService.initImplicitFlow()
  }

  isLoggedin() {
    const hasIdToken = this.oauthService.hasValidIdToken();
    const hasAccessToken = this.oauthService.hasValidAccessToken();
    return (hasIdToken && hasAccessToken);
  }

  gotoNewRaid() {
    this.router.navigate(['new']);
  }

}
