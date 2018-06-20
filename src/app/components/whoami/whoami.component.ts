import {Component, OnInit} from '@angular/core';
import {Profile, ProfileService} from '../../services/profile.service';
import {Observable} from 'rxjs';
import {OAuthService} from 'angular-oauth2-oidc';
import {Raider, RaiderService} from '../../services/raider.service';
import {Claims} from '../../claims';

@Component({
  selector: 'icod-profile',
  templateUrl: './whoami.component.html',
  styleUrls: ['./whoami.component.scss']
})
export class WhoamiComponent implements OnInit {
  claims: Claims = null;
  raiders: Raider[] = [];
  constructor(
    private oauthService: OAuthService,
    private raiderService: RaiderService,
  ) {
  }

  ngOnInit() {
    const claims = <Claims>this.oauthService.getIdentityClaims();
    this.claims = claims;
    this.raiderService.list(claims.sub).subscribe(data => {
      this.raiders = data;
    });
  }
}
