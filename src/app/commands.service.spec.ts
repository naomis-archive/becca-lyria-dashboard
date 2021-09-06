import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { CommandsService } from './commands.service';

describe('CommandsService', () => {
  let httpClientSpy: { get: jasmine.Spy };
  let service: CommandsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = new CommandsService(httpClientSpy as any);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return expected data (HttpClient called once)', () => {
    const expectedData = [
      {
        command: 'testy',
        subcommand: 'westy',
        uses: 10,
      },
      {
        command: 'oogie',
        subcommand: 'woogie',
        uses: 20,
      },
    ];

    httpClientSpy.get.and.returnValue(of(expectedData));

    service
      .getCommands()
      .subscribe((data) => expect(data).toEqual(expectedData));

    expect(httpClientSpy.get.calls.count()).toBe(1);
  });
});
