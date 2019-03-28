import {CanActivate, Router} from '@angular/router';
import { Observable} from 'rxjs';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import {Injectable} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';

@Injectable()
export class AuthGardService implements CanActivate {

    constructor(private afAuth: AngularFireAuth, private router: Router) {}

    canActivate(): Observable<boolean> {
          return this.afAuth.authState
           .take(1)
           .map(user => {
             return !!user
           })
           .do(authenticated => {
             if (!authenticated) {
              //  console.log("access denied");
               this.router.navigate(['/login']);
             }
         })
       }
}