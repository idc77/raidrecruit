import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RaidNoteService {

  constructor() { }
}


export class RaidNote {
  id: string;
  keycloak_id: string;
  raid_id: string;
  date: Date;
  note: string;
}
