import {Component} from "@angular/core";
import {Router} from "@angular/router";
import {FirebaseAuthService} from "../../services/firebaseAuthService";
import { Player } from '../../models/player';

@Component({
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.less']
})
export class LoginComponent {

	public user: Player;
	public errorInLogin: string;
	public isLoading: boolean = false;

	constructor(private firebaseAuthService: FirebaseAuthService, private router: Router) {
		this.user = new Player();
	}

	async login() {
		this.errorInLogin = null;
		this.isLoading = true;
        try {
            await this.firebaseAuthService.login(this.user);
            this.router.navigate(['league']);
        } catch (error) {
            this.errorInLogin = error.message;
        } finally {
			this.isLoading = false;
		}
	}
}