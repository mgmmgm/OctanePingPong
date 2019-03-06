import {Injectable} from '@angular/core';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {Player} from '../models/player';
import { routerNgProbeToken } from '@angular/router/src/router_module';

@Injectable()
export class FirebaseAuthService {

    authState: any;

    constructor(private db: AngularFireDatabase, private afAuth: AngularFireAuth, private router: Router) {
        afAuth.authState.subscribe(auth => {
            if (auth) {
                this.authState = auth;
            } else {
                console.log('problem to connect to firebase');
            }
        })
    }

    get currentUserId(): string {
        return this.authState && this.authState.user.uid;
    }

    signUp(player: Player) {
        return this.afAuth.auth.createUserWithEmailAndPassword(player.email, player.password)
			.then(fUser => {
				this.authState = fUser;
				this.setUserData(player);
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
        const userId = this.authState.uid;
        const path = `players/${userId}`;
        return this.db.object(path).valueChanges();
    }

    logout() {
        this.afAuth.auth.signOut();
        this.router.navigate(['/login']);
    }

}