import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, ParamMap, Params, Router} from '@angular/router';
import {OAuthService} from 'angular-oauth2-oidc';
import {RaidGroup, RaidGroupRules, Raid, RaidService, RaidSetup} from '../../services/raid.service';
import {Claims} from '../../claims';
import {Raider, RaiderService} from '../../services/raider.service';
import {RaidClass, RaidClassService} from '../../services/raidclass.service';
import {RaidnotesComponent} from '../raidnotes/raidnotes.component';

@Component({
  selector: 'icod-raiddetail',
  templateUrl: './raiddetail.component.html',
  styleUrls: ['./raiddetail.component.scss']
})
export class RaiddetailComponent implements OnInit {

  @ViewChild(RaidnotesComponent)
    private raidnotesComponent: RaidnotesComponent;

  raid: Raid = null;
  raiders: Raider[] = null;
  classes: RaidClass[] = null;

  private _user_id: string;
  private _selected_raider: Raider = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private oauthService: OAuthService,
    private raidService: RaidService,
    private raiderService: RaiderService,
    private raidClassService: RaidClassService,
  ) {
    this.raid = new Raid();
    this.raid.setup = new RaidSetup();
    this.raid.setup.mt = <RaidGroup>{};
    this.raid.setup.ot = <RaidGroup>{};
    this.raid.setup.dps_1 = <RaidGroup>{};
    this.raid.setup.dps_2 = <RaidGroup>{};
    this.raid.setup.mt.rules = <RaidGroupRules>{
      slot_1: '',
      slot_2: '',
      slot_3: '',
      slot_4: '',
      slot_5: '',
      slot_6: '',
    };
    this.raid.setup.ot.rules = <RaidGroupRules>{
      slot_1: '',
      slot_2: '',
      slot_3: '',
      slot_4: '',
      slot_5: '',
      slot_6: '',
    };
    this.raid.setup.dps_1.rules = <RaidGroupRules>{
      slot_1: '',
      slot_2: '',
      slot_3: '',
      slot_4: '',
      slot_5: '',
      slot_6: '',
    };
    this.raid.setup.dps_2.rules = <RaidGroupRules>{};
    this.raidClassService.list().subscribe(data => this.classes = data);
  }

  ngOnInit() {

    this.route.paramMap.subscribe(value => {
      const id = value.get('id');
      this.raidService.find(id).subscribe(data => this.raid = data);
    });
    this.user_id = this.getUserId();
  }

  set user_id(value: string) {
    if (value !== null) {
      this._user_id = value;
      this.raiderService.list(this.user_id).subscribe(
        data => {
          this.raiders = data;
          if (data.length === 1) {
            this.selected_raider = data[0];
          } else {
            this.selected_raider = this.findSignedRaider();
          }
        }
      );
    }
  }

  get user_id(): string {
    return this._user_id;
  }

  private getUserId() {
    let claims: Claims;
    claims = <Claims>this.oauthService.getIdentityClaims();
    if ((claims != null) && (claims !== undefined)) {
      return claims.sub;
    } else {
      return null;
    }
  }

  selectRaider(r: Raider) {
    this.selected_raider = r;
  }

  classFromSelectedClass(): RaidClass {
    for (const c of this.classes) {
      if (c.name === this.selected_raider.character.type.class) {
        return c;
      }
    }
    return null;
  }

  isRole(ok_roles: string): boolean {
    const c = this.classFromSelectedClass();
    ok_roles = ok_roles.replace(/\s/g, '').trim();
    if (ok_roles.includes(',')) {
      const rar = ok_roles.split(',');
      for (const raider of rar) {
        for (const role of c.roles) {
          if (raider === role) {
            return true;
          }
        }
      }
    } else {
      for (const role of c.roles) {
        if (ok_roles === role) {
          return true;
        }
      }
    }
    return false;
  }

  joinRaid(spot: string) {
    this.raidService.join(this.raid.id, spot, this.selected_raider.character.displayname).subscribe((data) => {
      this.raid = data;
    });
    this.raidnotesComponent.update();
  }

  leaveRaid(spot: string) {
    this.raidService.leave(this.raid.id, spot).subscribe(data => {
      this.raid = data;
    });
    this.raidnotesComponent.update();
  }

  isSigned(): boolean {
    if (this.selected_raider === null) {
      return true;
    }

    for (const slot of Object.values(this.raid.setup.mt)) {
      for (const raider of this.raiders) {
        if (slot === raider.character.displayname) {
          return true;
        }
      }
    }
    for (const slot of Object.values(this.raid.setup.ot)) {
      for (const raider of this.raiders) {
        if (slot === raider.character.displayname) {
          return true;
        }
      }
    }
    for (const slot of Object.values(this.raid.setup.dps_1)) {
      for (const raider of this.raiders) {
        if (slot === raider.character.displayname) {
          return true;
        }
      }
    }
    for (const slot of Object.values(this.raid.setup.dps_2)) {
      for (const raider of this.raiders) {
        if (slot === raider.character.displayname) {
          return true;
        }
      }
    }
    return false;
  }

  findSignedRaider(): Raider {
    for (const slot of Object.values(this.raid.setup.mt)) {
      for (const raider of this.raiders) {
        if (slot === raider.character.displayname) {
          return raider;
        }
      }
    }
    for (const slot of Object.values(this.raid.setup.ot)) {
      for (const raider of this.raiders) {
        if (slot === raider.character.displayname) {
          return raider;
        }
      }
    }
    for (const slot of Object.values(this.raid.setup.dps_1)) {
      for (const raider of this.raiders) {
        if (slot === raider.character.displayname) {
          return raider;
        }
      }
    }
    for (const slot of Object.values(this.raid.setup.dps_2)) {
      for (const raider of this.raiders) {
        if (slot === raider.character.displayname) {
          return raider;
        }
      }
    }
    return null;
  }

  removeRaid() {
    if (this.raid.keycloak_id !== this.user_id) {
      return;
    }
    this.raidService.remove(this.raid.id).subscribe(() => {
      this.router.navigate(['']);
    });
  }

  set selected_raider(raider: Raider) {
    if (this.raid.world) {
      if (this.raid.world !== raider.character.locationdata.world) {
        return;
      }
    }
    this._selected_raider = raider;
  }

  get selected_raider(): Raider {
    return this._selected_raider;
  }

}

