import {Component, OnInit} from '@angular/core';
import {FirebaseAuthService} from '../../services/firebaseAuthService';
import {Player} from '../../models/player';
import { FirebaseService } from '../../services/firebaseService';
import { Score } from '../../models/score';
import { PlayerService } from '../../services/playerService';
import { SortByPipe } from '../../pipes/sortByPipe';

@Component({
    templateUrl: './table-league.component.html',
    styleUrls: ['./table-league.component.less']
})
export class TableLeagueCompoent implements OnInit {

    loggedInUser: Player = new Player();
    mapTablesLeague: object = {};
    userGroup: string;
    userPlaceInHisGroup: number;

    constructor(private firebaseAuthService: FirebaseAuthService, private firebaseService: FirebaseService, private playerService: PlayerService, private sortByPipe: SortByPipe) {}

    async ngOnInit() {
        await this.playerService.getAllPlayers();
        this.firebaseAuthService.getLoggedInUser().subscribe((player: Player) => this.loggedInUser = player);
        this.firebaseService.getAllScores().subscribe(scores => {
            this.createTableLeague(scores);
            this.findUserPlaceInHisGroup();
        });
    }

    createTableLeague(scores: Score[]) {
        scores.forEach((score: Score) => {
            // change username to full name
            score.fullName = this.playerService.getPlayerFullName(score.username);

            if (score.username === this.loggedInUser.email) {
                this.userGroup = score.groupName;
            }

            // create map tables league
            if (this.mapTablesLeague[score.groupName]) {
                this.mapTablesLeague[score.groupName].push(score);
            } else {
                this.mapTablesLeague[score.groupName] = [];
                this.mapTablesLeague[score.groupName].push(score);
            }
        })
    }

    findUserPlaceInHisGroup() {
        let userTable: Score[] = this.sortByPipe.transform(this.mapTablesLeague[this.userGroup], 'wins', 'descending');
        userTable.forEach((score: Score, index: number) => {
            if (score.username === this.loggedInUser.email) {
                this.userPlaceInHisGroup = index;
            }
        })
    }

}