import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) {
  }

  list() {
    return this.http.get<Profile[]>(environment.apiroot + '/profile/');
  }

  find(id: string) {
    return this.http.get<Profile>(environment.apiroot + '/profile/' + id);
  }

  update(id: string, m: Profile) {
    return this.http.put(environment.apiroot + '/profile/' + id, m);
  }

  remove(id: string) {
    return this.http.delete(environment.apiroot + '/profile/' + id);
  }
}

export class Profile {
  id: string;
  keycloak_id: string;
}
