import {Injectable} from '@angular/core';
import {FirebaseService} from '../services/firebaseService';
import {Player} from '../models/player';
import { Game } from '../models/Game';

@Injectable()
export class PlayerService {

    private allPlayers: Player[];
    private playersMap = {};

    constructor(private firebaseService: FirebaseService) {
        this.getAllPlayers();
    }

    private createPlayersMap(players: Player[]) {
        players.forEach(player => {
            this.playersMap[player.email] = player;
        });
    }

    public getAllPlayers() : Promise<any> {
        if (this.allPlayers) {
            return Promise.resolve(this.allPlayers);
        } else {
            return new Promise((resolve, reject) => {
                this.firebaseService.getAllPlayers().subscribe(players => {
                    this.allPlayers = players;
                    this.createPlayersMap(players);
                    resolve(this.allPlayers);
                })
            })
        }
    }

    public getPlayerFullName(playerEmail: string) : string {
        return (this.playersMap[playerEmail] && this.playersMap[playerEmail].nickname) || (this.playersMap[playerEmail.replace(/[.#$]/g, '_')] && this.playersMap[playerEmail.replace(/[.#$]/g, '_')].nickname) ;
    }

    public setFullNameForPlayers(games) {
        games.forEach((game: Game) => {
            game.playerAfullName = this.getPlayerFullName(game.playerA);
            game.playerBfullName = this.getPlayerFullName(game.playerB);
            if (game.winner) {
                game.winner = this.getPlayerFullName(game.winner);
            }
        });
    }

}