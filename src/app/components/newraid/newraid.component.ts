import {Component, OnInit} from '@angular/core';
import {RaidSetup, Raid, RaidService} from '../../services/raid.service';
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
    title: '',
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
      mt: {
        tank: '',
        templar_or_healer: '',
        defiler_or_warder: '',
        coercer_or_enchanter: '',
        dirge_or_bard: '',
        swash_or_hatetransfer: '',
        rules: {
          tank: 'tank',
          templar_or_healer: 'templar',
          defiler_or_warder: 'defiler',
          coercer_or_enchanter: 'coercer',
          dirge_or_bard: 'dirge',
          swash_or_hatetransfer: 'hatetransfer'
        }
      },
      ot: {
        tank: '',
        cleric_or_healer: '',
        shaman_or_healer: '',
        coercer_or_enchanter: '',
        dirge_or_bard: '',
        dps_or_hatetransfer: '',
        rules: {
          tank: 'tank',
          cleric_or_healer: 'healer',
          shaman_or_healer: 'shaman',
          coercer_or_enchanter: 'coercer',
          dirge_or_bard: 'dirge',
          dps_or_hatetransfer: 'dps'
        }
      },
      dps_1: {
        bard: '',
        enchanter: '',
        healer_or_dps: '',
        healer: '',
        dps: '',
        dps_or_tank: '',
        rules: {
          bard: 'troubador',
          enchanter: 'illusionist',
          healer_or_dps: 'dps,healer',
          healer: 'healer',
          dps: 'mage',
          dps_or_tank: 'dps,tank'
        }
      },
      dps_2: {
        bard: '',
        enchanter: '',
        healer_or_dps: '',
        healer: '',
        dps: '',
        dps_or_tank: '',
        rules: {
          bard: 'bard',
          enchanter: 'enchanter',
          healer_or_dps: 'dps,healer',
          healer: 'healer',
          dps: 'dps',
          dps_or_tank: 'dps,tank'
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
    return n;
  }

  createRaid() {
    const m = this.modelToHTTPModel(this.model);
    this.raidService.create(m).subscribe(data => {
      this.router.navigate(['/raids', data.id]);
    });

  }

}

