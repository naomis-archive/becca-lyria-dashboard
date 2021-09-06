import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { LeaderboardService } from './leaderboard.service';

describe('LeaderboardService', () => {
  let httpClientSpy: { get: jasmine.Spy };
  let service: LeaderboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = new LeaderboardService(httpClientSpy as any);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return expected data (HttpClient called once)', () => {
    const expectedData = {
      users: [
        {
          userID: '1',
          userTag: 'test',
          avatar: 'https://cdn.nhcarrigan.com/content/profile.jpg',
          level: 1,
          points: 100,
          lastSeen: '2020-01-01',
          cooldown: 1,
        },
        {
          userID: '2',
          userTag: 'test2',
          avatar: 'https://cdn.nhcarrigan.com/content/profile.jpg',
          level: 2,
          points: 200,
          lastSeen: '2020-01-01',
          cooldown: 1,
        },
      ],
      serverName: 'testy westy',
      serverID: '1234',
    };

    httpClientSpy.get.and.returnValue(of(expectedData));

    service
      .getLeaderboard('1234')
      .subscribe((data) => expect(data).toEqual(expectedData));

    expect(httpClientSpy.get.calls.count()).toBe(1);
  });
});
