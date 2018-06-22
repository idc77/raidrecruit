import {Component, OnInit} from '@angular/core';
import {Raid, RaidGroup, RaidService} from '../../services/raid.service';
import {Router} from '@angular/router';

@Component({
  selector: 'icod-newraid',
  templateUrl: './newraid.component.html',
  styleUrls: ['./newraid.component.scss']
})
export class NewraidComponent implements OnInit {
  worlds = ['Antonia Bayle', 'Fallen Gate', 'Halls of Fate', 'Isle of Refuge', 'Maj\'Dul', 'Skyfire', 'Stormhold', 'Thurgadin'];
  date: { year: number, month: number };
  model: any = {
    world: 'Fallen Gate',
    title: 'Pick Up Raid ' + new Date().toString(),
    date: {},
    time_start: {hour: 19, minute: 0},
    time_end: {hour: 22, minute: 0},
    description: 'goals: <your goals here>' + '\n'
    + '- have at least 50 cure potions of every kind' + '\n'
    + '- scouts who use poison should have at least 100 of any kind of poison with them, damage, deaggro and debuff, also manaleech.' + '\n'
    + '- your equipment should be in 100% condition, fully repaired' + '\n'
    + '- your equipment should have at least last tier legendary adorns and they should be appropriate for your class.'
    + '(e.g. no hate-gain for dps, or casting skills for scouts)' + '\n\n'
    + 'loot rules:' + '\n'
    + '1 item per archetype until every member of that archetype looted "eligible loot"' + '\n'
    + 'eligible loot is any armor, weapon or jewelry piece' + '\n'
    + 'masters or gems do not count toward this "eligible loot" counter, they are considered "sundries"' + '\n'
    + 'sundries are on their own counter. In the case of masters you can only roll for the class you have designated you would like to loot for' + '\n'
    + 'by default that is the class you have joined the raid with. If you would like to roll for a different class you have to let the raid lead know' + '\n'
    + 'and the raid lead needs to confirm that choice.' + '\n\n'
    + 'alternate rules: delete either if not applicable' + '\n\n'
    + 'platinum bid rules' + '\n'
    + 'All loot that drops is being bid for with platinum.' + '\n'
    + 'The master looter collects any and all plat gained by the raid.' + '\n'
    + 'When a chest drops the master looter loots all items in the chest' + '\n'
    + 'and bidding starts by linking an item in the raid channel' + '\n'
    + 'if there are no bids the item will be transmuted and mana sold at the end of the raid.' + '\n'
    + 'Only those eligible to wear or use a certain item may bid on a certain item.' + '\n'
    + 'minimum bids for any item is 1p with minimum increments of 1p' + '\n'
    + 'at the end of the raid all platinum from those bids are split among the remaining members of the raid via the /split command',
    setup: {
      mt: <RaidGroup>{
        slot_1: '',
        slot_2: '',
        slot_3: '',
        slot_4: '',
        slot_5: '',
        slot_6: '',
        rules: {
          slot_1: 'tank',
          slot_2: 'templar',
          slot_3: 'defiler',
          slot_4: 'coercer',
          slot_5: 'dirge',
          slot_6: 'hatetransfer'
        }
      },
      ot: <RaidGroup>{
        slot_1: '',
        slot_2: '',
        slot_3: '',
        slot_4: '',
        slot_5: '',
        slot_6: '',
        rules: {
          slot_1: 'tank',
          slot_2: 'healer',
          slot_3: 'shaman',
          slot_4: 'coercer',
          slot_5: 'dirge',
          slot_6: 'dps'
        }
      },
      dps_1: <RaidGroup>{
        slot_1: '',
        slot_2: '',
        slot_3: '',
        slot_4: '',
        slot_5: '',
        slot_6: '',
        rules: {
          slot_1: 'troubador',
          slot_2: 'illusionist',
          slot_3: 'dps,healer',
          slot_4: 'healer',
          slot_5: 'mage',
          slot_6: 'dps,tank'
        }
      },
      dps_2: <RaidGroup>{
        slot_1: '',
        slot_2: '',
        slot_3: '',
        slot_4: '',
        slot_5: '',
        slot_6: '',
        rules: {
          slot_1: 'bard',
          slot_2: 'enchanter',
          slot_3: 'dps,healer',
          slot_4: 'healer',
          slot_5: 'dps',
          slot_6: 'dps,tank'
        }
      },
      sitsize: 4
    },
  };

  constructor(
    private raidService: RaidService,
    private router: Router,
    ) {
  }

  ngOnInit() {
    const now = new Date();
    this.model.date = {
      year: now.getFullYear(),
      month: now.getMonth() + 1,
      day: now.getDate() + 1
    };
  }

  modelToHTTPModel(m: any) {
    const n = new Raid();
    n.date_start = new Date(m.date.year, m.date.month - 1, m.date.day, m.time_start.hour, m.time_start.minute);
    n.date_end = new Date(m.date.year, m.date.month - 1, m.date.day, m.time_end.hour, m.time_end.minute);
    n.description = m.description;
    n.setup = m.setup;
    n.title = m.title;
    n.world = m.world;
    return n;
  }

  createRaid() {
    const m = this.modelToHTTPModel(this.model);
    this.raidService.create(m).subscribe(data => {
      this.router.navigate(['/raids', data.id]);
    });

  }

}

