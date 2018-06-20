import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RaidClassService {

  constructor(private http: HttpClient) { }

  list() {
    return this.http.get<RaidClass[]>(environment.apiroot + '/defaults/classes');
  }
}

export class RaidClass {
  name: string;
  roles: string[];
}
