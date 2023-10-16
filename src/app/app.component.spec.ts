import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, FormsModule, ReactiveFormsModule],
      declarations: [AppComponent],
    });
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should display the app title in the navbar', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.navbar-brand').textContent).toContain('User Profile App');
  });

  it('should navigate to User Create', async () => {
    const compiled = fixture.nativeElement;
    const link = compiled.querySelector('.nav-link'); // Replace with the appropriate selector
    link.click();
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      const routerOutletContent = compiled.querySelector('router-outlet').textContent;
      expect(routerOutletContent).toContain('Create User'); // Replace with the appropriate text
    });
  });

  it('should navigate to User List', async () => {
    const compiled = fixture.nativeElement;
    const link = compiled.querySelector('.nav-link');
    link.click();
    fixture.detectChanges();
  
    fixture.whenStable().then(() => {
      const routerOutletContent = compiled.querySelector('router-outlet').textContent;
      expect(routerOutletContent).toContain('User List');
    });
  });
  
});
