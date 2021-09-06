import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { StarsInt } from 'src/assets/interfaces/StarsInt';

@Injectable({
  providedIn: 'root',
})
export class StarsService {
  private URL = 'https://bot.beccalyria.com/stars';
  public cache = new Map();

  constructor(private http: HttpClient) {}

  public getStars(server: string): Observable<StarsInt> {
    const dataFromCache = this.cache.get(this.URL + '/' + server);

    if (dataFromCache) {
      return of(dataFromCache);
    }
    const response = this.http.get<StarsInt>(this.URL + '/' + server);
    response.subscribe((data) => this.cache.set(this.URL + '/' + server, data));
    return response;
  }
}
