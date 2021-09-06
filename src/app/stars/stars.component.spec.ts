import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { StarsInt } from 'src/assets/interfaces/StarsInt';
import { StarsService } from '../stars.service';

import { StarsComponent } from './stars.component';

const mockData: StarsInt = {
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

describe('StarsComponent', () => {
  let component: StarsComponent;
  let fixture: ComponentFixture<StarsComponent>;
  let compiled: any;
  const service = {
    getStars: (server: string) => {
      of<StarsInt>(mockData);
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StarsComponent],
      imports: [RouterTestingModule],
      providers: [{ provide: StarsService, useValue: service }],
    }).compileComponents();
    fixture = TestBed.createComponent(StarsComponent);
    component = fixture.componentInstance;
    compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  });

  beforeEach(() => {});

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the expected header', () => {
    const header = compiled.querySelector('h1');
    expect(header.textContent.trim()).toBe('Stars!');
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
    expect(loading.textContent.trim()).toBe('Star counts are loading...');
  });

  it('should display the warning when no server data', () => {
    component.serverId = '1234';
    component.error = true;
    fixture.detectChanges();
    const warning = compiled.querySelector('p');
    expect(warning.textContent.trim()).toBe(
      'That server has not given any stars yet!'
    );
  });

  it('should render the server name', () => {
    component.valid = true;
    component.stars = mockData.users;
    component.serverName = mockData.serverName;
    fixture.detectChanges();
    const name = compiled.querySelector('h2');
    expect(name.textContent.trim()).toBe("testy westy's All Stars");
  });

  it('should render the leaderboard', () => {
    component.valid = true;
    component.stars = mockData.users;
    component.serverName = mockData.serverName;
    fixture.detectChanges();
    const leaderboard = compiled.querySelector('#leaderboard');
    const users = leaderboard.querySelectorAll('.user');
    expect(users.length).toBe(2);
    const img = users[0].querySelector('img');
    const name = users[0].querySelector('.username');
    const stars = users[0].querySelector('.stars');
    expect(img.getAttribute('src')).toBe(mockData.users[0].avatar);
    expect(name.textContent.trim()).toBe(mockData.users[0].userTag);
    expect(stars.textContent.trim()).toBe(
      `${mockData.users[0].stars} ${
        mockData.users[0].stars === 1 ? 'star' : 'stars'
      } received.`
    );
  });
});
