import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { AboutService } from '../about.service';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let compiled: any;
  const service = {
    getCounts: () =>
      of({
        commands: 10,
        members: 1000,
        guilds: 15,
      }),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      providers: [{ provide: AboutService, useValue: service }],
    }).compileComponents();
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the expected text information', () => {
    const h1 = compiled.querySelector('h1');
    expect(h1.textContent.trim()).toBe('Becca Lyria Dashboard');
    const ps = compiled.querySelectorAll('p');
    expect(ps[0].textContent.trim()).toBe(
      "Welcome to Becca's Dashboard! Becca Lyria is a Discord bot specifically designed to facilitate community management and moderation."
    );
    expect(ps[1].textContent.trim()).toBe(
      'Becca is currently in 15 servers, serving approximately 1,000 people. She has 10 commands available.'
    );
    expect(ps[2].textContent.trim()).toBe(
      'If you are interested in seeing what Becca can do, check out the documentation.'
    );
    expect(ps[3].textContent.trim()).toBe(
      'You can also invite Becca to your server!'
    );
    expect(ps[4].textContent.trim()).toBe(
      'If you have questions, or need help setting things up, check out our support server!'
    );
  });

  it('should render the commands link', () => {
    const link = compiled.querySelector('a');
    expect(link.textContent.trim()).toBe('10 commands available.');
    expect(link.getAttribute('routerLink')).toBe('/commands');
  })

  it('should render the documentation button', () => {
    const button = compiled.querySelectorAll('a')[1];
    expect(button.textContent.trim()).toBe('📖 Read the Docs');
    expect(button.getAttribute('href')).toBe('https://docs.beccalyria.com');
  });

  it('should render the invite button', () => {
    const button = compiled.querySelectorAll('a')[2];
    expect(button.textContent.trim()).toBe('➕ Invite the Bot');
    expect(button.getAttribute('href')).toBe('https://invite.beccalyria.com');
  });

  it('should render the support button', () => {
    const button = compiled.querySelectorAll('a')[3];
    expect(button.textContent.trim()).toBe('❔ Get Support');
    expect(button.getAttribute('href')).toBe('https://chat.nhcarrigan.com');
  });
});
