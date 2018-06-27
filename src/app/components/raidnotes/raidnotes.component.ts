import {Component, Input, OnInit} from '@angular/core';
import {RaidNote, RaidNoteService} from '../../services/raidnote.service';
import {Claims} from '../../claims';
import {Raider} from '../../services/raider.service';

@Component({
  selector: 'icod-raidnotes',
  templateUrl: './raidnotes.component.html',
  styleUrls: ['./raidnotes.component.scss']
})
export class RaidnotesComponent implements OnInit {

  notes: RaidNote[];
  model: RaidNote = new RaidNote();
  alerts: Alert[] = [];

  private _raider: Raider = null;

  constructor(
    private raidNoteService: RaidNoteService
  ) {
  }

  ngOnInit() {
  }

  @Input()
  set raid_id(value: string) {
    if (value !== undefined) {
      this.model.raid_id = value;
      this.raidNoteService.list(value).subscribe(data => this.notes = data);
    }
  }

  @Input()
  set raider(value: Raider) {
    if ((value !== undefined) && (value !== null)) {
      this._raider = value;
      this.model.username = value.character.displayname;
    }
  }

  addNote() {
    if (this._raider === null) {
      this.alerts.push({
        type: 'danger',
        message: 'You did not select a raider to add a note with. Scroll up and select one, best if it\'s the one you\'ve signed up on this raid with.'
      });
      return false;
    }
    this.model.date = new Date();
    this.raidNoteService.create(this.model).subscribe(() => {
      this.alerts = [];
      this.model.note = '';
      this.raidNoteService.list(this.model.raid_id).subscribe(data => this.notes = data);
    });
  }

  update() {
    this.raidNoteService.list(this.model.raid_id).subscribe(data => this.notes = data);
  }

}

interface Alert {
  type: string;
  message: string;
}

