import {Component} from '@angular/core';
import {FirebaseAuthService} from '../../services/firebaseAuthService';
import {Player} from '../../models/player';

@Component({
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.less']
})
export class RegistrationComponent {

    user: Player;
    registerSuccessfully;
    errorWithRegistration: string;
    isLoading: boolean = false;

    constructor(private firebaseAuthService: FirebaseAuthService) {
        this.user = new Player();
    }

    async register() {
        this.errorWithRegistration = null;
        this.isLoading = true;
        try {
            this.registerSuccessfully = await this.firebaseAuthService.signUp(this.user);
            console.log('user sign up successfully', this.registerSuccessfully);
        } catch(error) {
            this.errorWithRegistration = error.message;
        } finally {
            this.isLoading = false;
        }
    }

}