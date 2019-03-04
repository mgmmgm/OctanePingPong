import {Pipe, PipeTransform} from '@angular/core';
import { Game } from '../models/Game';

@Pipe({
    name: 'filterGames',
    pure: false
})
export class filterGamesPipe implements PipeTransform {
    transform(items :Game[], filter: any) {
        if (!items || !filter) {
            return items;
        }
        return items.filter(item => {
            if (filter.groupName) {
                return item.groupName === filter.groupName;
            } else if (filter.email) {
                return item.playerA === filter.email || item.playerB === filter.email;
            }
            return item;
        });
    }
}