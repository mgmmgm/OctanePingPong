import {Pipe, PipeTransform} from '@angular/core';
import { Score } from '../models/score';
import { analyzeAndValidateNgModules } from '@angular/compiler';

@Pipe({
    name: 'sortBy',
    pure: false
})
export class SortByPipe implements PipeTransform {
    transform(items: any, field: string, order: string): Score[] {
        if (!items || !field) {
            return items;
        }
        items.sort((a: any, b: any) => {
            if (a[field] > b[field]) {
                return order === 'descending' ? -1 : 1;
            } else if (a[field] < b[field]) {
                return order === 'descending' ? 1 : -1;
            }
            return 0;
        })
        return items;
    }
}