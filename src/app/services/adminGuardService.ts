import {CanActivate, Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import { Observable} from 'rxjs';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

@Injectable()
export class AdminGuardService implements CanActivate {

    constructor(private afAuth: AngularFireAuth, private router: Router) {}

    canActivate() {
        return this.afAuth.authState.take(1).map(user => {
            return user && user.email === 'moshe@golan.com';
        }).do(allowed => {
            if (!allowed) {
                this.router.navigate(['/league']);
                console.log("user is not admin");
            }
        })
    }
}

