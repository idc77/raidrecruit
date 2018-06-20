import {Component, OnInit} from '@angular/core';
import {Character, Raider, RaiderService} from '../../services/raider.service';
import {OAuthService} from 'angular-oauth2-oidc';
import {CensusResult, CensusService} from '../../services/census.service';
import {Router} from '@angular/router';

@Component({
  selector: 'icod-addraider',
  templateUrl: './addraider.component.html',
  styleUrls: ['./addraider.component.scss']
})
export class AddraiderComponent implements OnInit {
  worlds = ['Antonia Bayle', 'Fallen Gate', 'Halls of Fate', 'Isle of Refuge', 'Maj\'Dul', 'Skyfire', 'Stormhold', 'Thurgadin'];
  search_query = new SearchQuery();
  characters: CensusResult = new CensusResult();
  selectedCharacter = null;
  constructor(
    private censusService: CensusService,
    private raiderService: RaiderService,
    private oauthService: OAuthService,
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.search_query.search_type = 'exact';
    this.search_query.world = 'Fallen Gate';
  }

  search() {
    this.selectedCharacter = null;
    this.censusService.search(this.search_query).subscribe(data => this.characters = data);
  }

  selectCharacter(c: Character) {
    this.selectedCharacter = c;
  }

  addCharacter() {
    let r = new Raider();
    r.active = true;
    r.character = this.selectedCharacter;
    this.raiderService.create(r).subscribe( _ => {
      this.router.navigate(['raiders']);
    });
  }

}

class SearchQuery {
  name?: string;
  world?: string;
  url?: string;
  search_type: string;
}
