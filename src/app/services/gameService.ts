import {Injectable} from '@angular/core';
import { Player } from '../models/player';

@Injectable()
export class GameService {

    public divideUsersToGroups(numberOfGroups: number, users: Player[]) : any[] {
        let groups = [];
        for (let i=0; i < numberOfGroups; i++) {
            groups.push([]);
        }

        let groupSize = Math.floor(users.length / numberOfGroups);

        let copyOfUsers = [...users];
        for (let i=0; i < users.length; i++) {
            let index = this.getRandomInt(0, copyOfUsers.length - 1);
            groups[i % groups.length].push(copyOfUsers[index].email);
            copyOfUsers.splice(index, 1); 
        }
        return groups;
    }

    private getRandomInt(min , max): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    public calcNextWorkingDays(startDate: number, days: number): number {
        let nextDate = new Date(startDate);
        let count = 0;
        while (count < days) {
            nextDate.setDate(nextDate.getDate() + 1);
            if (nextDate.getDay() < 5) {
                count++;
            }
        }
        return nextDate.getTime();
    }


}