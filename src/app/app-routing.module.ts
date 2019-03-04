import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistrationComponent } from './components/registration/registration.component';
import { LoginComponent } from './components/login/login.component';
import { AdminComponent } from './components/admin/admin.component';
import { TableLeagueCompoent } from './components/tableLeague/table-league.component';
import { AuthGardService } from './services/authGuardService';
import { AllGamesComponent } from './components/allGames/all-games.component';
import { NextMatchComponent } from './components/nextMatch/next-match.component';

const routes: Routes = [
  {path: 'registration', component: RegistrationComponent},
  {path: 'login', component: LoginComponent},
  {path: 'admin', component: AdminComponent},
  {path: 'league' , component: TableLeagueCompoent, canActivate: [AuthGardService]},
  {path: 'nextMatch', component: NextMatchComponent, canActivate: [AuthGardService]},
  {path: 'games', component: AllGamesComponent, canActivate: [AuthGardService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
