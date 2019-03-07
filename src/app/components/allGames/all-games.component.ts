import {Component, OnInit} from '@angular/core';
import {FirebaseService} from '../../services/firebaseService';
import {FirebaseAuthService} from '../../services/firebaseAuthService';
import {PlayerService} from '../../services/playerService';
import {Game} from '../../models/game';
import {Player} from '../../models/player';

@Component({
    templateUrl: './all-games.component.html',
    styleUrls: ['./all-games.component.less']
})
export class AllGamesComponent implements OnInit {

    loggedInUser: Player = new Player();
    games;
    selectedFilter = 'all';
    tableFilter;
    playerGroup: string;

    constructor(private firebaseService: FirebaseService, private firebaseAuthService: FirebaseAuthService, private playerService: PlayerService) {}

    async ngOnInit() {
        const playersPromise = this.playerService.getAllPlayers();
        const gamesPromise = new Promise((resolve, reject) => this.firebaseService.getAllGames().subscribe((games) => resolve(games)));
        const [allPlayers, games] = await Promise.all([playersPromise, gamesPromise]);
        
        this.playerService.setFullNameForPlayers(games);
        this.games = games;

        this.firebaseAuthService.getLoggedInUser().subscribe((player: Player) => {
            this.loggedInUser = player;
            this.findPlayerGroup(player);
            console.log(this.playerGroup);
        });
    }


    public selectFilterTable(filterBy: string) {
        switch(filterBy) {
            case 'all':
                this.tableFilter = null;
                break;
            case 'group':
                this.tableFilter = {groupName : this.playerGroup};
                break;
            case 'my':
                this.tableFilter = this.loggedInUser;
                break;
        }
        this.selectedFilter = filterBy;
    }

    private findPlayerGroup(player: Player) {
        for (let i=0; i < this.games.length; i++) {
            if (this.games[i].playerA === player.email || this.games[i].playerB === player.email) {
                this.playerGroup = this.games[i].groupName;
                return;
            }
        }
    }


}