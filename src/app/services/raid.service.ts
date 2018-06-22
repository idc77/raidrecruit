import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
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
    return this.http.post<Raid>(environment.apiroot + '/raids/', m);
  }

  update(id: string, m: Raid) {
    return this.http.put<Raid>(environment.apiroot + '/raids/' + id, m);
  }

  remove(id: string) {
    return this.http.delete(environment.apiroot + '/raids/' + id);
  }
}

export class Raid {
  id: string;
  title: string;
  keycloak_id: string;
  world: string;
  date_meet?: Date;
  date_start: Date;
  date_end: Date;
  description: string;
  setup: RaidSetup;
}

export class RaidSetup {
  mt: RaidGroup;
  ot: RaidGroup;
  dps_1: RaidGroup;
  dps_2: RaidGroup;
  sitting?: RaidSlot[];
  sitsize: 4;
}

export interface RaidGroup {
  slot_1: string;
  slot_2: string;
  slot_3: string;
  slot_4: string;
  slot_5: string;
  slot_6: string;
  rules: RaidGroupRules;
}

export interface RaidGroupRules {
  slot_1: string;
  slot_2: string;
  slot_3: string;
  slot_4: string;
  slot_5: string;
  slot_6: string;
}

export interface RaidSlot {
  name: string;
}
