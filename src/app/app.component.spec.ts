import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [RouterTestingModule]
    }).compileComponents();
  }));

  it(`should have as title 'task-manager'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('task-manager');
  });


  it('should display a navigation bar with links', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    const navLinks = compiled.querySelectorAll('nav a');
    expect(navLinks.length).toBeGreaterThan(0);
  });


  it('should have a link to the home page', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    const homeLink = compiled.querySelector('nav a[href="/"]');
    expect(homeLink).toBeTruthy();
  });

  it('should have a link to the Add Task page', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    const homeLink = compiled.querySelector('nav a[href="/tasks/new"]');
    expect(homeLink).toBeTruthy();
  });

});
