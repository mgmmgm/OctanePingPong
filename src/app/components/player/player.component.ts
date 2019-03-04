import {Component, Input} from '@angular/core';

@Component({
    selector: 'player',
    templateUrl: './player.component.html',
    styleUrls: ['./player.component.less']
})
export class PlayerComponent{

    @Input()
    name: string;

    @Input()
    picture: string;    

}