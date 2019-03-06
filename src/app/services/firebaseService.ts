import {Injectable} from '@angular/core';
import {AngularFireDatabase, AngularFireList, AngularFireObject} from 'angularfire2/database';
import {Observable} from 'rxjs';
import {Player} from '../models/player';
import {Game} from '../models/game'
import { Score } from '../models/score';

const LEAGUE_URL: string = 'league/';
const PLAYERS_URL: string = 'players';
const GROUPS_URL: string = LEAGUE_URL + 'groups/';
const GAMES_URL: string = LEAGUE_URL + 'games/';
const SCORE_URL: string = LEAGUE_URL + 'score/';

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

    updateGameAndScore(id, winner) {
        return new Promise((resolve, reject) => {
            this.db.object(GAMES_URL + `/${id}`).query.once('value').then(snapshot => {
                let game = snapshot.val();
                let loser = winner === game.playerA ? game.playerB : game.playerA;
                
                // update the winner of the game
                this.db.object(GAMES_URL + `/${id}`).update({
                    winner
                }).catch(error => {
                    console.log(error);
                    reject('failed to update the winner of the game (and not update winners and losser scores).');
                });

                // update the counter of wins and losses for the players
                winner = winner.replace(/[.#$]/g, '_');
                loser = loser.replace(/[.#$]/g, '_');
                this.db.object(SCORE_URL + winner + '/wins').query.once('value').then(snapshotWins => {
                    this.db.object(SCORE_URL + winner).update({
                        wins: snapshotWins.val() + 1
                    }).catch(error => {
                        console.log(error);
                        reject('failed to update winner score (and not update losser score also).');
                    });

                    this.db.object(SCORE_URL + loser + '/losses').query.once('value').then(snapshotLosses => {
                        this.db.object(SCORE_URL + loser).update({
                            losses: snapshotLosses.val() + 1
                        }).then(_ => {
                            resolve('success update game and scores');
                        }).catch(error => {
                            console.log(error);
                            reject('failed to update losser score.');
                        })
                    })
                })
            })

        })

    }


}
