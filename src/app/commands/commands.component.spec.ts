import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { CommandsInt } from 'src/assets/interfaces/CommandsInt';
import { CommandsService } from '../commands.service';

import { CommandsComponent } from './commands.component';

const mockData: CommandsInt[] = [
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

describe('CommandsComponent', () => {
  let component: CommandsComponent;
  let fixture: ComponentFixture<CommandsComponent>;
  let compiled: any;
  const service = {
    getCommands: () => of<CommandsInt[]>(mockData),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommandsComponent],
      imports: [RouterTestingModule],
      providers: [{ provide: CommandsService, useValue: service }],
    }).compileComponents();
    fixture = TestBed.createComponent(CommandsComponent);
    component = fixture.componentInstance;
    compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  });

  beforeEach(() => {});

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show the correct header', () => {
    const header = compiled.querySelector('h1');
    expect(header.textContent.trim()).toBe('Command Usage!');
  });

  it('should display a notice while loading', () => {
    component.loaded = false;
    fixture.detectChanges();
    const message = compiled.querySelector('p');
    expect(message.textContent.trim()).toBe('Commands loading...');
  });

  it('should display the commands as expected', () => {
    const commands = compiled.querySelectorAll('.data');
    expect(commands.length).toBe(2);
    const name = commands[0].querySelector('.name');
    const uses = commands[0].querySelector('.uses');
    expect(name.textContent.trim()).toBe('/oogie woogie');
    expect(uses.textContent.trim()).toBe('This command has been used 20 times');
  });
});
