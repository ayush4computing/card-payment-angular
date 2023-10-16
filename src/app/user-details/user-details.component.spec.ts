import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { UserDetailsComponent } from './user-details.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';

describe('UserDetailsComponent', () => {
  let component: UserDetailsComponent;
  let fixture: ComponentFixture<UserDetailsComponent>;

  beforeEach(() => {
    const activatedRouteStub = {
      snapshot: {
        paramMap: convertToParamMap({ id: '1' }),
      },
    };

    TestBed.configureTestingModule({
      declarations: [UserDetailsComponent],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteStub },
        // Add any other needed providers here
      ],
    });

    fixture = TestBed.createComponent(UserDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should display user details', () => {
    // Simulate a user by setting the user property
    component.user = { id: 1, name: 'Alice', email: 'alice@example.com', phone: '123-456-7890' };
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h2').textContent).toContain('User Details');
    expect(compiled.querySelector('.card')).toBeTruthy();
  });

  it('should redirect to the user list if the user is not found', () => {
    const router = TestBed.inject(Router);
    const navigateSpy = spyOn(router, 'navigate');
    const activatedRoute = TestBed.inject(ActivatedRoute);
    spyOn(activatedRoute.snapshot.paramMap, 'get').and.returnValue('999'); // Simulate a non-existing user ID
  
    fixture = TestBed.createComponent(UserDetailsComponent);
    component = fixture.componentInstance;
  
    expect(navigateSpy).toHaveBeenCalledWith(['/users']);
  });
  
});
