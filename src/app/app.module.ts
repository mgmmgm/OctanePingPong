import 'hammerjs';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';
import {AngularFireDatabaseModule} from "angularfire2/database";
import {AngularFireAuthModule} from "angularfire2/auth";
import {AngularFireModule} from "angularfire2";
import {environment} from "../environments/environment";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './components/navBar/nav-bar.component';
import { AuthGardService } from './services/authGuardService';
import { FirebaseAuthService } from './services/firebaseAuthService';
import { FirebaseService } from './services/firebaseService';
import {FormsModule} from "@angular/forms";
import {ButtonModule} from "primeng/components/button/button";
import {
  MatTableModule, MatInputModule, MatPaginatorModule, MatProgressSpinnerModule,
  MatSortModule
} from "@angular/material";
import {MatTabsModule} from '@angular/material/tabs';
import {TableModule} from "primeng/components/table/table";
import {FieldsetModule} from "primeng/components/fieldset/fieldset";
import {SpinnerModule} from "primeng/components/spinner/spinner";
import {CalendarModule} from "primeng/components/calendar/calendar";
import { GameService } from './services/gameService';
import { RegistrationComponent } from './components/registration/registration.component';
import { LoginComponent } from './components/login/login.component';
import { AdminComponent } from './components/admin/admin.component';
import { AllGamesComponent } from './components/allGames/all-games.component';
import { NextMatchComponent } from './components/nextMatch/next-match.component';
import { TableLeagueCompoent } from './components/tableLeague/table-league.component';
import { PlayerService } from './services/playerService';
import { filterGamesPipe } from './pipes/filterGamesPipe';
import { SortByPipe } from './pipes/sortByPipe';
import { PlayerComponent } from './components/player/player.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    RegistrationComponent,
    LoginComponent,
    AdminComponent,
    AllGamesComponent,
    NextMatchComponent,
    TableLeagueCompoent,
    PlayerComponent,
    filterGamesPipe,
    SortByPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebaseConfiguration),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AppRoutingModule,
    FormsModule,
    ButtonModule,
    TableModule,
    FieldsetModule,
    SpinnerModule,
    CalendarModule,
    MatTabsModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule
  ],
  providers: [AuthGardService, FirebaseAuthService, FirebaseService, GameService, PlayerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
