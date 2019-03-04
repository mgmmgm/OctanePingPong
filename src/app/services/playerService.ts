import {Injectable} from '@angular/core';
import {FirebaseService} from '../services/firebaseService';
import {Player} from '../models/player';

@Injectable()
export class PlayerService {

    private allPlayers: Player[];
    private playersMap = {};

    constructor(private firebaseService: FirebaseService) {}

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
        return this.playersMap[playerEmail].nickname;
    }
}