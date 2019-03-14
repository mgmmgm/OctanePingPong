import {Component, OnInit} from '@angular/core';
import { FirebaseAuthService } from '../../services/firebaseAuthService';
import messageService from '../../services/messageService';
import { Player } from '../../models/player';

@Component({
    selector: 'nav-bar',
    templateUrl: './nav-bar.component.html',
    styleUrls: ['nav-bar.component.less']
})
export class NavBarComponent implements OnInit {

    isAdmin: boolean = false;

    constructor(public firebaseAuthService: FirebaseAuthService) {}

    ngOnInit() {
        messageService.message.subscribe(msg => {
            this.firebaseAuthService.getLoggedInUser().subscribe((player: Player) => this.isAdmin = player.isAdmin);
        })
    }

    logout() {
        this.firebaseAuthService.logout();
    }
}