import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { HttpClientModule } from '@angular/common/http';
import { LeaderboardService } from './leaderboard.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FooterComponent,
    LeaderboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [LeaderboardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
