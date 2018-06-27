import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Character} from './raider.service';

@Injectable({
  providedIn: 'root'
})
export class CensusService {

  constructor(private http: HttpClient) {
  }

  search(q: SearchQuery) {
    return this.http.post<CensusResult>(environment.apiroot + '/census/search', q);
  }

  update(id: number) {
    return this.http.get<CensusResult>(environment.apiroot + '/census/update/' + id.toString());
  }
}

export class CensusResult {
  character_list: Character[];
}

class SearchQuery {
  name?: string;
  world?: string;
  url?: string;
  search_type: string;
}
