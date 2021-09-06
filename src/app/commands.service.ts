import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CommandsInt } from 'src/assets/interfaces/CommandsInt';

@Injectable({
  providedIn: 'root',
})
export class CommandsService {
  private URL = 'https://bot.beccalyria.com/commands';
  public cache = new Map();

  constructor(private http: HttpClient) {}

  public getCommands(): Observable<CommandsInt[]> {
    const dataFromCache = this.cache.get(this.URL);

    if (dataFromCache) {
      return of(dataFromCache);
    }
    const response = this.http.get<CommandsInt[]>(this.URL);
    response.subscribe((data) => this.cache.set(this.URL, data));
    return response;
  }
}
