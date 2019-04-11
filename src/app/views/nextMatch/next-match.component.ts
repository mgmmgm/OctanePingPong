import {Component, OnInit} from '@angular/core';
import {FirebaseAuthService} from '../../services/firebaseAuthService';
import {Player} from '../../models/player';
import { FirebaseService } from '../../services/firebaseService';
import { PlayerService } from '../../services/playerService';
import { Game } from '../../models/Game';

@Component({
    templateUrl: './next-match.component.html',
    styleUrls: ['./next-match.component.less']
})
export class NextMatchComponent implements OnInit {

    loggedInUser: Player = new Player();
    nextGame: Game;
    finishAllGames: boolean = false;
    isLoading: boolean = true;

    constructor(private firebaseAuthService: FirebaseAuthService, private firebaseService : FirebaseService, private playerService: PlayerService) {}

    async ngOnInit() {
        this.isLoading = true;
        await this.playerService.getAllPlayers();
        this.firebaseAuthService.getLoggedInUser().subscribe((player: Player) => {
            this.loggedInUser = player;
            this.firebaseService.getAllGames().subscribe((games: Game[]) => {
                for (let i=0; i < games.length; i++) {
                    if (games[i].winner) {
                        continue;
                    } else {
                        if (games[i].playerA === player.email || games[i].playerB === player.email) {
                            games[i].playerAfullName = this.playerService.getPlayerFullName(games[i].playerA);
                            games[i].playerBfullName = this.playerService.getPlayerFullName(games[i].playerB);
                            this.nextGame = games[i];
                            break;
                        }
                    }
                }
                this.finishAllGames = !this.nextGame;
                this.isLoading = false;
            });
        });
    }
    
}