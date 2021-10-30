import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { StatsService } from './stats.service';

describe('StatsService', () => {
  let httpClientSpy: { get: jasmine.Spy };
  let service: StatsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = new StatsService(httpClientSpy as any);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return expected server command data (HttpClient called once)', () => {
    const expectedData = [
      {
        serverName: 'test',
        serverId: '12',
        serverAvatar: 'something I guess',
        commandUses: 1000000,
      },
    ];

    httpClientSpy.get.and.returnValue(of(expectedData));

    service
      .getServerCommands()
      .subscribe((data) => expect(data).toEqual(expectedData, 'expected data'));

    expect(httpClientSpy.get.calls.count()).toBe(1);
  });
});
