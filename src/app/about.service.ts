import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AboutInt } from 'src/assets/interfaces/AboutInt';

@Injectable({
  providedIn: 'root',
})
export class AboutService {
  private URL = 'https://bot.beccalyria.com/about';
  public cache = new Map();

  constructor(private http: HttpClient) {}

  public getCounts(): Observable<AboutInt> {
    const dataFromCache = this.cache.get(this.URL);

    if (dataFromCache) {
      return of(dataFromCache);
    }
    const response = this.http.get<AboutInt>(this.URL);
    response.subscribe((data) => this.cache.set(this.URL, data));
    return response;
  }
}
