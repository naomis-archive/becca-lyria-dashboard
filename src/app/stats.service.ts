import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ServerCommandsInt } from 'src/assets/interfaces/StatsInt';

@Injectable({
  providedIn: 'root',
})
export class StatsService {
  private URL = 'https://bot.beccalyria.com/stats';
  public cache = new Map();

  constructor(private http: HttpClient) {}

  public getServerCommands(): Observable<ServerCommandsInt[]> {
    const dataFromCache = this.cache.get(this.URL + '/commands');
    if (dataFromCache) {
      return of(dataFromCache);
    }
    const response = this.http.get<ServerCommandsInt[]>(this.URL + '/commands');
    response.subscribe((data) => this.cache.set(this.URL + '/commands', data));
    return response;
  }
}
