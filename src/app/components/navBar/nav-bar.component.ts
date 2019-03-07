import {Component, OnInit} from '@angular/core';
import { FirebaseAuthService } from '../../services/firebaseAuthService';
import messageService from '../../services/messageService';
import { Player } from '../../models/player';

@Component({
    selector: 'nav-bar',
    templateUrl: './nav-bar.component.html',
    styles: []
})
export class NavBarComponent implements OnInit {

    isAdmin: boolean = false;

    constructor(private firebaseAuthService: FirebaseAuthService) {}

    ngOnInit() {
        messageService.message.subscribe(msg => {
            this.firebaseAuthService.getLoggedInUser().subscribe((player: Player) => this.isAdmin = player.isAdmin);
        })
    }

    logout() {
        console.log('logout');
        this.firebaseAuthService.logout();
    }
}