import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { LeaderboardInt } from 'src/assets/interfaces/LeaderboardInt';
import { LeaderboardService } from '../leaderboard.service';

import { LeaderboardComponent } from './leaderboard.component';

const mockData: LeaderboardInt = {
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

describe('LeaderboardComponent', () => {
  let component: LeaderboardComponent;
  let fixture: ComponentFixture<LeaderboardComponent>;
  let compiled: any;
  const service = {
    getLeaderboard: (server: string) => {
      of<LeaderboardInt>(mockData);
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LeaderboardComponent],
      imports: [RouterTestingModule],
      providers: [{ provide: LeaderboardService, useValue: service }],
    }).compileComponents();
    fixture = TestBed.createComponent(LeaderboardComponent);
    component = fixture.componentInstance;
    compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the expected header', () => {
    const header = compiled.querySelector('h1');
    expect(header.textContent.trim()).toBe('Leaderboard!');
  });

  it('should display the notice when server id is missing', () => {
    component.serverId = '';
    fixture.detectChanges();
    const notice = compiled.querySelector('p');
    expect(notice.textContent.trim()).toBe('No server ID!');
  });

  it('should display the loading text', () => {
    component.valid = false;
    component.serverId = '1234';
    fixture.detectChanges();
    const loading = compiled.querySelector('p');
    expect(loading.textContent.trim()).toBe('Leaderboard is loading...');
  });

  it('should display the warning when no server data', () => {
    component.serverId = '1234';
    component.error = true;
    fixture.detectChanges();
    const warning = compiled.querySelector('p');
    expect(warning.textContent.trim()).toBe(
      'That server does not have a leaderboard yet!'
    );
  });

  it('should render the server name', () => {
    component.valid = true;
    component.leaderboard = mockData.users;
    component.serverName = mockData.serverName;
    fixture.detectChanges();
    const name = compiled.querySelector('h2');
    expect(name.textContent.trim()).toBe("testy westy's Leaderboard");
  });

  it('should render the leaderboard', () => {
    component.valid = true;
    component.leaderboard = mockData.users;
    component.serverName = mockData.serverName;
    fixture.detectChanges();
    const leaderboard = compiled.querySelector('#leaderboard');
    const users = leaderboard.querySelectorAll('.user');
    expect(users.length).toBe(2);
    const img = users[0].querySelector('img');
    const name = users[0].querySelector('.username');
    const experience = users[0].querySelector('.experience');
    const level = users[0].querySelector('.level');
    expect(img.getAttribute('src')).toBe(mockData.users[0].avatar);
    expect(name.textContent.trim()).toBe(mockData.users[0].userTag);
    expect(experience.textContent.trim()).toBe(
      mockData.users[0].points.toString() + ' XP'
    );
    expect(level.textContent.trim()).toBe(
      'Level ' + mockData.users[0].level.toString()
    );
  });
});
