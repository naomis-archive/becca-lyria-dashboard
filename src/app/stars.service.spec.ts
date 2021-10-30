import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { StarsService } from './stars.service';

describe('StarsService', () => {
  let httpClientSpy: { get: jasmine.Spy };
  let service: StarsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = new StarsService(httpClientSpy as any);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return expected data (HttpClient called once)', () => {
    const expectedData = {
      serverName: 'testy westy',
      serverID: '12345',
      users: [
        {
          userID: '1',
          userTag: 'testy#0001',
          avatar: 'https://cdn.nhcarrigan.com/content/profile.jpg',
          stars: 100,
        },
        {
          userID: '2',
          userTag: 'testy#9999',
          avatar: 'https://cdn.nhcarrigan.com/content/profile.jpg',
          stars: 10,
        },
      ],
    };

    httpClientSpy.get.and.returnValue(of(expectedData));

    service
      .getStars('1234')
      .subscribe((data) => expect(data).toEqual(expectedData));

    expect(httpClientSpy.get.calls.count()).toBe(1);
  });
});
