import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Raid} from './raid.service';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RaiderService {

  constructor(private http: HttpClient) { }

  list(keycloak_id: string) {
    let params = new HttpParams();
    params = params.append('keycloak_id', keycloak_id);
    return this.http.get<Raider[]>(environment.apiroot + '/raiders/', {params: params});
  }

  find(id: string) {
    return this.http.get<Raider>(environment.apiroot + '/raiders/' + id);
  }

  create(m: Raider) {
    return this.http.post<Raider>(environment.apiroot + '/raiders/', m);
  }

  update(id: string, m: Raider) {
    return this.http.put(environment.apiroot + '/raiders/' + id, m);
  }

  remove(id: string) {
    return this.http.delete(environment.apiroot + '/raiders/' + id);
  }
}

export class Raider {
  id: string;
  keycloak_id?: string;
  active: boolean;
  character: Character;
}

export class Character {
  stats:              Stats;
  dbid:               number;
  ts:                 number;
  last_update:        number;
  version:            number;
  resists:            Resists;
  type:               Type;
  deityabilitysystem: Deityabilitysystem;
  displayname:        string;
  locationdata:       Locationdata;
  name:               Name;
  account:            Account;
  guild:              Guild;
  id:                 number;
}

export interface Account {
  age: number;
}

export interface Deityabilitysystem {
  availablepoints: number;
}

export interface Guild {
  status:  number;
  name:    string;
  level:   number;
  joined:  number;
  rank:    number;
  guildid: number;
  id:      number;
}

export interface Locationdata {
  homefaction: number;
  world:       string;
}

export interface Name {
  prefix:      string;
  first_lower: string;
  last:        string;
  suffix:      string;
  first:       string;
}

export interface Resists {
  noxious:   Stat;
  arcane:    Stat;
  elemental: Stat;
  physical:  Stat;
}

export interface Stat {
  base:      number;
  effective: number;
}

export interface Stats {
  sta:                    Stat;
  power:                  Health;
  weapon:                 Weapon;
  wis:                    Stat;
  runspeed:               number;
  int:                    Stat;
  defense:                Defense;
  health:                 Health;
  str:                    Stat;
  agi:                    Stat;
  combat:                 { [key: string]: number };
  personal_status_points: number;
  ability:                Ability;
}

export interface Ability {
  spelltimereusepct:       number;
  spelltimerecoverypct:    number;
  spelltimereusespellonly: number;
  spelltimecastpct:        number;
}

export interface Defense {
  armor:     number;
  avoidance: number;
  block:     number;
  parry:     number;
}

export interface Health {
  max:   number;
  regen: number;
}

export interface Weapon {
  primarydelay:       number;
  primarymindamage:   number;
  primarymaxdamage:   number;
  rangeddelay:        number;
  rangedmindamage:    number;
  rangedmaxdamage:    number;
  secondarydelay:     number;
  secondarymindamage: number;
  secondarymaxdamage: number;
}

export interface Type {
  classid:       number;
  aa_level:      number;
  ts_level:      number;
  raceid:        number;
  level:         number;
  gender:        string;
  ts_class:      string;
  birthdate_utc: Date;
  race:          string;
  deity:         string;
  class:         string;
  alignment:     number;
}
