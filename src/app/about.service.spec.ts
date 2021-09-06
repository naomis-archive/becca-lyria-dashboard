import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { AboutService } from './about.service';

describe('AboutService', () => {
  let httpClientSpy: { get: jasmine.Spy };
  let service: AboutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = new AboutService(httpClientSpy as any);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return expected data (HttpClient called once)', () => {
    const expectedData = { commands: 1, members: 12, guilds: 3 };

    httpClientSpy.get.and.returnValue(of(expectedData));

    service.getCounts().subscribe((data) => expect(data).toEqual(expectedData));

    expect(httpClientSpy.get.calls.count()).toBe(1);
  });
});
