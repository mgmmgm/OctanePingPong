import {Component, OnInit} from '@angular/core';
import { FirebaseAuthService } from '../../services/firebaseAuthService';

@Component({
    selector: 'nav-bar',
    templateUrl: './nav-bar.component.html',
    styles: []
})
export class NavBarComponent implements OnInit {

    isAdmin: boolean = false;

    constructor(private firebaseAuthService: FirebaseAuthService) {}

    ngOnInit() {
        
    }

    logout() {
        console.log('logout');
        this.firebaseAuthService.logout();
    }
}