import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Profile} from './profile.service';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RaidService {

  constructor(private http: HttpClient) {
  }


  list() {
    return this.http.get<Raid[]>(environment.apiroot + '/raids/');
  }

  find(id: string) {
    return this.http.get<Raid>(environment.apiroot + '/raids/' + id);
  }

  create(m: Raid) {
    return this.http.post(environment.apiroot + '/raids/', m);
  }

  update(id: string, m: Raid) {
    return this.http.put(environment.apiroot + '/raids/' + id, m);
  }

  remove(id: string) {
    return this.http.delete(environment.apiroot + '/raids/' + id);
  }
}

export class Raid {
  id: string;
  keycloak_id?: string;
  date_meet?: Date;
  date_start: Date;
  date_end: Date;
  description: string;
  setup: RaidSetup;
}

export class RaidSetup {
  mt: MTGroup;
  ot: OTGroup;
  dps_1: DPSGroup;
  dps_2: DPSGroup;
  sitsize: 4;
}

export class MTGroup {
  tank: string;
  templar_or_healer: string;
  defiler_or_warder: string;
  coercer_or_enchanter: string;
  dirge_or_bard: string;
  swash_or_hatetransfer: string;
  rules: {
    tank: string;
    templar_or_healer: string;
    defiler_or_warder: string;
    coercer_or_enchanter: string;
    dirge_or_bard: string;
    swash_or_hatetransfer: string;
  };

}

export class OTGroup {
  tank: string;
  cleric_or_healer: string;
  shaman_or_healer: string;
  coercer_or_enchanter: string;
  dirge_or_bard: string;
  dps_or_hatetransfer: string;
  rules: {
    tank: string;
    cleric_or_healer: string;
    shaman_or_healer: string;
    coercer_or_enchanter: string;
    dirge_or_bard: string;
    dps_or_hatetransfer: string;
  };
}

export class DPSGroup {
  bard: string;
  enchanter: string;
  healer_or_dps: string;
  healer: string;
  dps: string;
  dps_or_tank: string;
  rules: {
    bard: string;
    enchanter: string;
    healer_or_dps: string;
    healer: string;
    dps: string;
    dps_or_tank: string;
  };
}

export class RaidNote {
  id: string;
  keycloak_id: string;
  raid_id: string;
  date: Date;
  note: string;
}
