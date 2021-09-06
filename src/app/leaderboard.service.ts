import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { LeaderboardInt } from 'src/assets/interfaces/LeaderboardInt';

@Injectable({
  providedIn: 'root',
})
export class LeaderboardService {
  private URL = 'https://bot.beccalyria.com/leaderboard';
  public cache = new Map();

  constructor(private http: HttpClient) {}

  public getLeaderboard(server: string): Observable<LeaderboardInt> {
    const dataFromCache = this.cache.get(this.URL + '/' + server);

    if (dataFromCache) {
      return of(dataFromCache);
    }
    const response = this.http.get<LeaderboardInt>(this.URL + '/' + server);
    response.subscribe((data) => this.cache.set(this.URL + '/' + server, data));
    return response;
  }
}
