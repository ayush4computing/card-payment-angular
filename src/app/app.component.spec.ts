import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';

describe('AppComponent', () => {
  let component: UserDetailsComponent;
  let fixture: ComponentFixture<UserDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent, UserDetailsComponent],
      imports: [HttpClientTestingModule, FormsModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should fetch random users on initialization', () => {
    spyOn(component, 'getRandomUsers');
    component.ngOnInit();
    expect(component.getRandomUsers).toHaveBeenCalled();
  });

  it('should apply filters correctly when all filters are empty', () => {
    const mockUsers = [
      { name: { first: 'John', last: 'Doe' }, dob: { age: 25 }, gender: 'male', nat: 'US', email: 'john@example.com', phone: '1234567890' },
      { name: { first: 'Jane', last: 'Smith' }, dob: { age: 30 }, gender: 'female', nat: 'CA', email: 'jane@example.com', phone: '9876543210' }
    ];
    component.users = mockUsers;

    // Apply filters
    component.applyFilters();

    expect(component.filteredUsers).toEqual(mockUsers);
  });

  it('should apply filters correctly based on age', () => {
    const mockUsers = [
      { name: { first: 'John', last: 'Doe' }, dob: { age: 25 }, gender: 'male', nat: 'US', email: 'john@example.com', phone: '1234567890' },
      { name: { first: 'Jane', last: 'Smith' }, dob: { age: 30 }, gender: 'female', nat: 'CA', email: 'jane@example.com', phone: '9876543210' }
    ];
    component.users = mockUsers;

    // Apply filters
    component.filterOptions.age = '25';
    component.applyFilters();

    expect(component.filteredUsers.length).toBe(1);
    expect(component.filteredUsers[0]).toEqual(mockUsers[1]);
  });

  it('should display "No result found" when no users match the filters', () => {
    const mockUsers = [
      { name: { first: 'John', last: 'Doe' }, dob: { age: 25 }, gender: 'male', nat: 'US', email: 'john@example.com', phone: '1234567890' },
      { name: { first: 'Jane', last: 'Smith' }, dob: { age: 30 }, gender: 'female', nat: 'CA', email: 'jane@example.com', phone: '9876543210' }
    ];
    component.users = mockUsers;

    // Apply filters that don't match any users
    component.filterOptions.age = '40';
    component.filterOptions.gender = 'male';
    component.filterOptions.nationality = 'AU';
    component.filterOptions.nameStartsWith = 'Z';
    component.applyFilters();

    const noResultsElement = fixture.nativeElement.querySelector('.no-results');
    expect(noResultsElement).toBeTruthy();
    expect(noResultsElement.textContent).toContain('No result found.');
  });


});
