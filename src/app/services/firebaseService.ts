import {Injectable} from '@angular/core';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import {Observable} from 'rxjs';
import {Player} from '../models/player';
import {Game} from '../models/game'
import { Score } from '../models/score';

const LEAGUE_URL: string = 'league/';
const PLAYERS_URL: string = 'players';
const GROUPS_URL: string = LEAGUE_URL + 'groups';
const GAMES_URL: string = LEAGUE_URL + 'games';
const SCORE_URL: string = LEAGUE_URL + 'score';

@Injectable()
export class FirebaseService {

    usersRef: AngularFireList<Player>; 
    gamesRef: AngularFireList<Game>;
    scoresRef: AngularFireList<Score>;

    constructor(private db: AngularFireDatabase) {
        this.usersRef = db.list(PLAYERS_URL);
        this.gamesRef = db.list(GAMES_URL);
        this.scoresRef = db.list(SCORE_URL);
    }

    getAllPlayers(): Observable<Player[]> {
        return this.usersRef.valueChanges();
    }

    getAllGames(): Observable<Game[]> {
        return this.gamesRef.valueChanges();
    }

    getAllScores(): Observable<Score[]> {
        return this.scoresRef.valueChanges();
    }

    async addGroup(groupName: string, players: Player[]) {
        const path = `${GROUPS_URL}/${groupName}`;
        const data = {'groupName': groupName, 'players': players};
        try {
            await this.db.object(path).update(data);
        } catch (error) {
            console.log('failed to add group. ' + error);
        }
    }

    async addGame(groupName: string, id: number, startDate: Date, endDate: number, playerA: Player, playerB: Player, round: number) {
        const path = GAMES_URL + '/' + id;
		const data = {id, groupName, startDate, endDate, playerA, playerB, round};
        try {
            await this.db.object(path).update(data);
        } catch (error) {
            console.log('failed to add game. ' + error);
        }
    }

    async initScore(username: string, groupName: string) {
        const path = SCORE_URL + '/' + username.replace(/[.#$]/g, '_');
        const data = {username, groupName, 'wins': 0, 'losses': 0};
        try {
            await this.db.object(path).update(data);
        } catch (error) {
            console.log('failed to init score. ' + error);
        }
    }


}
