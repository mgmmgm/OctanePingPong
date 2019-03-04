import {Component} from "@angular/core";
import {Router} from "@angular/router";
import {FirebaseAuthService} from "../../services/firebaseAuthService";
import { Player } from '../../models/player';

@Component({
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.less']
})
export class LoginComponent {

	private user: Player;
	private errorInLogin: string;

	constructor(private firebaseAuthService: FirebaseAuthService, private router: Router) {
		this.user = new Player();
	}

	async login() {
        this.errorInLogin = null;
        try {
            await this.firebaseAuthService.login(this.user);
            this.router.navigate(['league']);
        } catch (error) {
            this.errorInLogin = error.message;
        }
	}
}