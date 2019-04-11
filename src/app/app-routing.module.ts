import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistrationComponent } from './views/registration/registration.component';
import { LoginComponent } from './views/login/login.component';
import { AdminComponent } from './views/admin/admin.component';
import { TableLeagueCompoent } from './views/tableLeague/table-league.component';
import { AuthGardService } from './services/authGuardService';
import { AllGamesComponent } from './views/allGames/all-games.component';
import { NextMatchComponent } from './views/nextMatch/next-match.component';
import { AdminGuardService } from './services/adminGuardService';
import { FinalComponent } from './views/final/final.component';

const routes: Routes = [
  {path: 'registration', component: RegistrationComponent},
  {path: 'login', component: LoginComponent},
  {path: 'admin', component: AdminComponent, canActivate: [AuthGardService, AdminGuardService]},
  {path: 'league' , component: TableLeagueCompoent, canActivate: [AuthGardService]},
  {path: 'nextMatch', component: NextMatchComponent, canActivate: [AuthGardService]},
  {path: 'games', component: AllGamesComponent, canActivate: [AuthGardService]},
  {path: 'final', component: FinalComponent, canActivate: [AuthGardService]},
  { path: '',  redirectTo: '/registration', pathMatch: 'full' },
	{ path: '**', redirectTo: '/registration' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
