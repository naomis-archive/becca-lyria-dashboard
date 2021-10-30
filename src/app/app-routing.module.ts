import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommandsComponent } from './commands/commands.component';
import { HomeComponent } from './home/home.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { StarsComponent } from './stars/stars.component';
import { StatsComponent } from './stats/stats.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent },
  { path: 'leaderboard/:serverId', component: LeaderboardComponent },
  { path: 'leaderboard', component: LeaderboardComponent },
  { path: 'stars/:serverId', component: StarsComponent },
  { path: 'stars', component: StarsComponent },
  { path: 'commands', component: CommandsComponent },
  { path: 'stats/:stat', component: StatsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
