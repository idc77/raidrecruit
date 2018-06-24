import {Component, Input, OnInit} from '@angular/core';
import {Raid, RaidService} from '../../services/raid.service';
import {Observable} from 'rxjs';
import {OAuthService} from 'angular-oauth2-oidc';
import {Claims} from '../../claims';

@Component({
  selector: 'icod-raidlist',
  templateUrl: './raidlist.component.html',
  styleUrls: ['./raidlist.component.scss']
})
export class RaidlistComponent implements OnInit {

  private _user_id: string = null;

  raids: Raid[];
  userId: string = null;
  worlds = ['', 'Antonia Bayle', 'Fallen Gate', 'Halls of Fate', 'Isle of Refuge', 'Maj\'Dul', 'Skyfire', 'Stormhold', 'Thurgadin'];
  @Input() selected_world: string = null;


  constructor(
    private oauthService: OAuthService,
    private raidService: RaidService
  ) {
  }

  ngOnInit() {
    this.raidService.list().subscribe(value => this.raids = value);
    this.userId = this.getUserId();
  }

  public isLoggedin(): boolean {
    const hasIdToken = this.oauthService.hasValidIdToken();
    const hasAccessToken = this.oauthService.hasValidAccessToken();
    return (hasIdToken && hasAccessToken);
  }

  private getUserId() {
    let claims: Claims;
    claims = <Claims>this.oauthService.getIdentityClaims();
    return claims.sub;
  }

  set user_id(value: string) {
    this._user_id = value;
  }

  get user_id() {
    return this._user_id;
  }
}
