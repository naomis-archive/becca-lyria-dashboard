import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { LeaderboardService } from './leaderboard.service';

describe('LeaderboardService', () => {
  let service: LeaderboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(LeaderboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
