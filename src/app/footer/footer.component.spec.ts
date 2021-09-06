import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;
  let compiled: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FooterComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the expected text', () => {
    const footer = compiled.querySelector('footer');
    expect(footer.textContent.trim()).toBe(
      '© 2021 - Nicholas Carrigan | Art by Moonlight'
    );
  });

  it('should render the expected links', () => {
    const links = compiled.querySelectorAll('a');
    expect(links[0].textContent.trim()).toBe('Nicholas Carrigan');
    expect(links[0].getAttribute('href')).toBe('https://www.nhcarrigan.com');
    expect(links[1].textContent.trim()).toBe('Moonlight');
    expect(links[1].getAttribute('href')).toBe(
      'https://www.instagram.com/moonlightkcreations/'
    );
  });
});
