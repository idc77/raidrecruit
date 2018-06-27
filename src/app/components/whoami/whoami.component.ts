import {Component, OnInit} from '@angular/core';
import {OAuthService} from 'angular-oauth2-oidc';
import {Raider, RaiderService} from '../../services/raider.service';
import {Claims} from '../../claims';
import {CensusService} from '../../services/census.service';

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
    private censusService: CensusService
  ) {
  }

  ngOnInit() {
    const claims = <Claims>this.oauthService.getIdentityClaims();
    this.claims = claims;
    this.raiderService.list(claims.sub).subscribe(data => {
      this.raiders = data;
    });
  }

  update(raider: Raider) {
    this.censusService.update(raider.character.id).subscribe(data => {
      raider.character = data.character_list[0];
      this.raiderService.update(raider.id, raider).subscribe(() => {
        this.raiderService.list(this.claims.sub).subscribe(rd => {
          this.raiders = rd;
        });
      });
    });
  }

  remove(id: string) {
    this.raiderService.remove(id).subscribe(() => {
      this.raiderService.list(this.claims.sub).subscribe(rd => {
        this.raiders = rd;
      });
    });
  }
}
