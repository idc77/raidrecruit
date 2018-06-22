import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Params, Router} from '@angular/router';
import {OAuthService} from 'angular-oauth2-oidc';
import {RaidGroup, RaidGroupRules, Raid, RaidService, RaidSetup} from '../../services/raid.service';
import {Claims} from '../../claims';
import {Raider, RaiderService} from '../../services/raider.service';
import {RaidClass, RaidClassService} from '../../services/raidclass.service';

@Component({
  selector: 'icod-raiddetail',
  templateUrl: './raiddetail.component.html',
  styleUrls: ['./raiddetail.component.scss']
})
export class RaiddetailComponent implements OnInit {

  raid: Raid = null;
  raiders: Raider[] = null;
  selected_raider: Raider = null;
  _user_id: string;
  classes: RaidClass[] = null;

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
    this.raid.setup.dps_2.rules = <RaidGroupRules>{
      slot_1: '',
      slot_2: '',
      slot_3: '',
      slot_4: '',
      slot_5: '',
      slot_6: '',
    };
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
    switch (spot) {
      case 'mt.tank':
        this.raid.setup.mt.slot_1 = this.selected_raider.character.displayname;
        break;
      case 'mt.dirge_or_bard':
        this.raid.setup.mt.slot_2 = this.selected_raider.character.displayname;
        break;
      case 'mt.coercer_or_enchanter':
        this.raid.setup.mt.slot_3 = this.selected_raider.character.displayname;
        break;
      case 'mt.templar_or_healer':
        this.raid.setup.mt.slot_4 = this.selected_raider.character.displayname;
        break;
      case 'mt.defiler_or_warder':
        this.raid.setup.mt.slot_5 = this.selected_raider.character.displayname;
        break;
      case 'mt.swash_or_hatetransfer':
        this.raid.setup.mt.slot_6 = this.selected_raider.character.displayname;
        break;
      case 'ot.tank':
        this.raid.setup.ot.slot_1 = this.selected_raider.character.displayname;
        break;
      case 'ot.dirge_or_bard':
        this.raid.setup.ot.slot_2 = this.selected_raider.character.displayname;
        break;
      case 'ot.coercer_or_enchanter':
        this.raid.setup.ot.slot_3 = this.selected_raider.character.displayname;
        break;
      case 'ot.shaman_or_healer':
        this.raid.setup.ot.slot_4 = this.selected_raider.character.displayname;
        break;
      case 'ot.cleric_or_healer':
        this.raid.setup.ot.slot_5 = this.selected_raider.character.displayname;
        break;
      case 'ot.dps_or_hatetransfer':
        this.raid.setup.ot.slot_6 = this.selected_raider.character.displayname;
        break;
      case 'dps_1.dps_or_tank':
        this.raid.setup.dps_1.slot_1 = this.selected_raider.character.displayname;
        break;
      case 'dps_1.dps':
        this.raid.setup.dps_1.slot_2 = this.selected_raider.character.displayname;
        break;
      case 'dps_1.bard':
        this.raid.setup.dps_1.slot_3 = this.selected_raider.character.displayname;
        break;
      case 'dps_1.enchanter':
        this.raid.setup.dps_1.slot_4 = this.selected_raider.character.displayname;
        break;
      case 'dps_1.healer_or_dps':
        this.raid.setup.dps_1.slot_5 = this.selected_raider.character.displayname;
        break;
      case 'dps_1.healer':
        this.raid.setup.dps_1.slot_6 = this.selected_raider.character.displayname;
        break;
      case 'dps_2.dps_or_tank':
        this.raid.setup.dps_2.slot_1 = this.selected_raider.character.displayname;
        break;
      case 'dps_2.dps':
        this.raid.setup.dps_2.slot_2 = this.selected_raider.character.displayname;
        break;
      case 'dps_2.bard':
        this.raid.setup.dps_2.slot_3 = this.selected_raider.character.displayname;
        break;
      case 'dps_2.enchanter':
        this.raid.setup.dps_2.slot_4 = this.selected_raider.character.displayname;
        break;
      case 'dps_2.healer_or_dps':
        this.raid.setup.dps_2.slot_5 = this.selected_raider.character.displayname;
        break;
      case 'dps_2.healer':
        this.raid.setup.dps_2.slot_6 = this.selected_raider.character.displayname;
        break;
    }
    this.raidService.update(this.raid.id, this.raid).subscribe(data => {
      this.raid = data;
    });
  }

  leaveRaid(spot: string) {
    switch (spot) {
      case 'mt.tank':
        this.raid.setup.mt.slot_1 = '';
        break;
      case 'mt.dirge_or_bard':
        this.raid.setup.mt.slot_2 = '';
        break;
      case 'mt.coercer_or_enchanter':
        this.raid.setup.mt.slot_3 = '';
        break;
      case 'mt.templar_or_healer':
        this.raid.setup.mt.slot_4 = '';
        break;
      case 'mt.defiler_or_warder':
        this.raid.setup.mt.slot_5 = '';
        break;
      case 'mt.swash_or_hatetransfer':
        this.raid.setup.mt.slot_6 = '';
        break;
      case 'ot.tank':
        this.raid.setup.ot.slot_1 = '';
        break;
      case 'ot.dirge_or_bard':
        this.raid.setup.ot.slot_2 = '';
        break;
      case 'ot.coercer_or_enchanter':
        this.raid.setup.ot.slot_3 = '';
        break;
      case 'ot.shaman_or_healer':
        this.raid.setup.ot.slot_4 = '';
        break;
      case 'ot.cleric_or_healer':
        this.raid.setup.ot.slot_5 = '';
        break;
      case 'ot.dps_or_hatetransfer':
        this.raid.setup.ot.slot_6 = '';
        break;
      case 'dps_1.dps_or_tank':
        this.raid.setup.dps_1.slot_1 = '';
        break;
      case 'dps_1.dps':
        this.raid.setup.dps_1.slot_2 = '';
        break;
      case 'dps_1.bard':
        this.raid.setup.dps_1.slot_3 = '';
        break;
      case 'dps_1.enchanter':
        this.raid.setup.dps_1.slot_4 = '';
        break;
      case 'dps_1.healer_or_dps':
        this.raid.setup.dps_1.slot_5 = '';
        break;
      case 'dps_1.healer':
        this.raid.setup.dps_1.slot_6 = '';
        break;
      case 'dps_2.dps_or_tank':
        this.raid.setup.dps_2.slot_1 = '';
        break;
      case 'dps_2.dps':
        this.raid.setup.dps_2.slot_2 = '';
        break;
      case 'dps_2.bard':
        this.raid.setup.dps_2.slot_3 = '';
        break;
      case 'dps_2.enchanter':
        this.raid.setup.dps_2.slot_4 = '';
        break;
      case 'dps_2.healer_or_dps':
        this.raid.setup.dps_2.slot_5 = '';
        break;
      case 'dps_2.healer':
        this.raid.setup.dps_2.slot_6 = '';
        break;
    }
    this.raidService.update(this.raid.id, this.raid).subscribe(data => {
      this.raid = data;
    });
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

}

