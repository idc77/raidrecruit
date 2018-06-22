import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RaidNoteService {

  constructor(private http: HttpClient) {
  }

  list(id: string) {
    let params = new HttpParams();
    params = params.append('raid_id', id);
    return this.http.get<RaidNote[]>(environment.apiroot + '/raidnotes/', {params: params});
  }

  find(id: string) {
    return this.http.get<RaidNote>(environment.apiroot + '/raidnotes/' + id);
  }

  create(m: RaidNote) {
    return this.http.post<RaidNote>(environment.apiroot + '/raidnotes/', m);
  }

  update(id: string, m: RaidNote) {
    return this.http.put<RaidNote>(environment.apiroot + '/raidnotes/' + id, m);
  }

  remove(id: string) {
    return this.http.delete(environment.apiroot + '/raidnotes/' + id);
  }
}

export class RaidNote {
  id: string;
  keycloak_id: string;
  username: string;
  raid_id: string;
  date: Date;
  note: string;
}
