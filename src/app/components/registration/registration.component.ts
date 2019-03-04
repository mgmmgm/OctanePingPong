import {Component} from '@angular/core';
import {FirebaseAuthService} from '../../services/firebaseAuthService';
import {Player} from '../../models/player';

@Component({
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.less']
})
export class RegistrationComponent {

    user: Player;
    errorWithRegistration: string;

    constructor(private firebaseAuthService: FirebaseAuthService) {
        this.user = new Player();
    }

    async register() {
        this.errorWithRegistration = null;
        try {
            let result = await this.firebaseAuthService.signUp(this.user);
            console.log('user sign up successfully');
        } catch(error) {
            this.errorWithRegistration = error.message;
        }
    }

}