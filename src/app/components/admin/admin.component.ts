import {Component, OnInit} from '@angular/core';
import {FirebaseAuthService} from '../../services/firebaseAuthService';
import {FirebaseService} from '../../services/firebaseService';
import {GameService} from '../../services/gameService';
import {Player} from '../../models/player';

@Component({
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.less']
})
export class AdminComponent implements OnInit {

    players: Player[];
    league;
    createLeagueResult: string;

    constructor(private firebaseAuthService: FirebaseAuthService, private firebaseService: FirebaseService, private gameService: GameService) {}

    ngOnInit() {
        this.league = {howManyGroups: 1, startingDay: new Date()};
        this.firebaseService.getAllPlayers().subscribe(players => this.players = players);
    }

    public createLeague() {
		let groups = this.gameService.divideUsersToGroups(this.league.howManyGroups, this.players);
		let id = 0;
		let A= 65;
		for (let i=0; i < groups.length; i++) {
			// generate groups
			let players = groups[i];
			let groupName = String.fromCharCode(A + i);
			this.firebaseService.addGroup(groupName, players);

			// generate scores for each player
			for (let t=0; t < players.length; t++) {
				this.firebaseService.initScore(players[t], groupName);
			}

			// generate games
			let howManyGames = (players.length * (players.length - 1)) / 2;

			let games = this.setLeague(players);

			let date;
			if (this.league.startingDay) {
				date = Date.parse(this.league.startingDay);
			} else {
				date = Date.now();
			}
			for (let j=0; j < games.length; j++) {
				let roundGames = games[j];
				let nextDate = this.gameService.calcNextWorkingDays(date, 2);
				for (let k=0; k < roundGames.length; k++, id++) {
					this.firebaseService.addGame(groupName, id, date, nextDate, roundGames[k].player1, roundGames[k].player2, j+1);
				}
				date = this.gameService.calcNextWorkingDays(nextDate, 1);
			}
		}
		this.createLeagueResult = 'League created successfully!';
	}
	
	private setLeague(nameArray) {
		let games = [] ;
		// $log.log('players: '+shuffleArray(nameArray).toString());
		let gameNum = 0;

		let persons = [];
		for (let i = 0 ; i < nameArray.length -1; i++) {
			let clonedArray = JSON.parse(JSON.stringify(nameArray))
			//$log.log(clonedArray.toString());
			persons[nameArray[i]] = clonedArray.splice(i+1,nameArray.length-i-1);
		}
		let noMoreGames = false;
		while (!noMoreGames) {

			let people = [];
			noMoreGames = true;
			// $log.log('day '+gameNum);
			let matches = [];
			for (let i = 0 ; i<nameArray.length -1; i=i+1) {
				if ((persons[nameArray[i]]).length > 0 && people.indexOf(nameArray[i]) === -1) {
					noMoreGames = false;
					let name1 = nameArray[i];
					let name2 = '';

					this.shuffleArray(persons[name1]);
					for (let z = 0; z < persons[name1].length ; z=z+1) {
						if (people.indexOf(persons[name1][z]) === -1) {
							name2 = (persons[name1][z]);
							if (persons[name1].length === 1) {
								persons[name1] = [];
							}
							else {
								persons[name1].splice(z,1);
							}
							break;
						}
					}
					if (name2 !== '') {
						// $log.log('playing '+name1+' vs. '+name2);
						matches.push({'player1':name1, 'player2':name2});
						people.push(name1)
						people.push(name2);
					}
				}
			}
			if (matches.length>0) {
				games[gameNum] = matches;
			}
			gameNum++;

		}

		return games;
	}

	private shuffleArray(array) {
		for (let i = array.length - 1; i > 0; i--) {
			let j = Math.floor(Math.random() * (i + 1));
			let temp = array[i];
			array[i] = array[j];
			array[j] = temp;
		}
		return array;
    }
    


}