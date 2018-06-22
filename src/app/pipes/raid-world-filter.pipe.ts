import {Pipe, PipeTransform} from '@angular/core';
import {Raid} from '../services/raid.service';

@Pipe({
  name: 'raidworldfilter',
  pure: false,
})
export class RaidWorldFilterPipe implements PipeTransform {

  transform(items: Raid[], filter: string): Raid[] {
    if (!items || !filter) {
      return items;
    }

    return items.filter(raid => {
      return raid.world.includes(filter);
    });
  }


}
