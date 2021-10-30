import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ServerCommandsInt } from 'src/assets/interfaces/StatsInt';
import { of } from 'rxjs';

import { StatsComponent } from './stats.component';
import { RouterTestingModule } from '@angular/router/testing';
import { StatsService } from '../stats.service';

const mockCommandData: ServerCommandsInt[] = [
  {
    serverName: 'test',
    serverId: 'test',
    serverAvatar: 'https://cdn.nhcarrigan.com/content/profile.jpg',
    commandUses: 1,
  },
  {
    serverName: 'last',
    serverId: 'last',
    serverAvatar: '',
    commandUses: 200,
  },
];

describe('StatsComponent', () => {
  let component: StatsComponent;
  let fixture: ComponentFixture<StatsComponent>;
  let compiled: any;
  const service = {
    getServerCommands: () => {
      of<ServerCommandsInt[]>(mockCommandData);
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StatsComponent],
      imports: [RouterTestingModule],
      providers: [{ provide: StatsService, useValue: service }],
    }).compileComponents();
    fixture = TestBed.createComponent(StatsComponent);
    component = fixture.componentInstance;
    compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the expected header', () => {
    const header = compiled.querySelector('h1');
    expect(header.textContent).toContain('General Stats!');
  });

  it('should display the notice when stat is missing', () => {
    component.stat = '';
    fixture.detectChanges();
    const notice = compiled.querySelector('p');
    expect(notice.textContent.trim()).toBe('Invalid Stat!');
  });

  it('should display the loading text', () => {
    component.valid = false;
    component.stat = 'commands';
    fixture.detectChanges();
    const loading = compiled.querySelector('p');
    expect(loading.textContent.trim()).toBe('Stats loading...');
  });

  it('should display the warning when no stats data', () => {
    component.stat = 'commands';
    component.error = true;
    fixture.detectChanges();
    const warning = compiled.querySelector('p');
    expect(warning.textContent.trim()).toBe('Those stats could not be loaded!');
  });

  it('should render the command header', () => {
    component.valid = true;
    component.stat = 'commands';
    component.commands = mockCommandData;
    fixture.detectChanges();
    const ame = compiled.querySelector('h2');
    expect(ame.textContent.trim()).toBe('Server Command Uses');
  });

  it('should render the server command leaderboard', () => {
    component.valid = true;
    component.stat = 'commands';
    component.commands = mockCommandData;
    fixture.detectChanges();
    const leaderboard = compiled.querySelector('#server-commands');
    const servers = leaderboard.querySelectorAll('.server');
    expect(servers.length).toBe(2);
    const img = servers[0].querySelector('img');
    const name = servers[0].querySelector('.servername');
    const uses = servers[0].querySelector('.commands');
    expect(img.getAttribute('src')).toBe(mockCommandData[0].serverAvatar);
    expect(name.textContent.trim()).toBe(mockCommandData[0].serverName);
    expect(uses.textContent.trim()).toBe(
      `${mockCommandData[0].commandUses} ${
        mockCommandData[0].commandUses === 1 ? 'command' : 'commands'
      } used!`
    );
  });
});
