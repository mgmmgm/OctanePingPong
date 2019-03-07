import {Injectable} from '@angular/core';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {Player} from '../models/player';
import messageService from '../services/messageService';

@Injectable()
export class FirebaseAuthService {

    authState: any;

    constructor(private db: AngularFireDatabase, private afAuth: AngularFireAuth, private router: Router) {
        afAuth.authState.subscribe(auth => {
            if (auth) {
                this.authState = auth;
                messageService.message.next('check if admin');
            } else {
                console.log('problem to connect to firebase');
            }
        });
    }

    get currentUserId(): string {
        return this.authState && (this.authState.uid || this.authState.user.uid);
    }

    signUp(player: Player) {
        return this.afAuth.auth.createUserWithEmailAndPassword(player.email, player.password)
			.then(fUser => {
				this.authState = fUser;
                this.setUserData(player);
                return player;
			});
    }

    async setUserData(player: Player) {
        const path = `players/${this.currentUserId}`;
        player.email = player.email.replace(/[.#$]/g, '_');
        const data = {'email': player.email, 'password': player.password, 'nickname': player.nickname};
        try {
            await this.db.object(path).update(data);
        } catch (error) {
            console.log('error save user data, ' + error);
        }
    }

    login(player: Player) {
		return this.afAuth.auth.signInWithEmailAndPassword(player.email, player.password)
			.then(fUser => {
                this.authState = fUser;
                this.router.navigate(['/league']);
			});
	}

    getLoggedInUser() {
        const path = `players/${this.currentUserId}`;
        return this.db.object(path).valueChanges();
    }

    logout() {
        this.afAuth.auth.signOut();
        this.authState = null;
        this.router.navigate(['/login']);
    }

}