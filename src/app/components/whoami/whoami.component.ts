import {Component, OnInit} from '@angular/core';
import {Profile, ProfileService} from '../../services/profile.service';
import {Observable} from 'rxjs';
import {OAuthService} from 'angular-oauth2-oidc';

@Component({
  selector: 'icod-profile',
  templateUrl: './whoami.component.html',
  styleUrls: ['./whoami.component.scss']
})
export class WhoamiComponent implements OnInit {
  claims: any = {};
  constructor(private oauthService: OAuthService) {
  }

  ngOnInit() {
    this.claims = this.oauthService.getIdentityClaims();
  }
}
