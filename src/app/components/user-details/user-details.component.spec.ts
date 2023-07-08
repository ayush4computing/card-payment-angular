import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { UserDetailsComponent } from './user-details.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('AppComponent', () => {
  let component: UserDetailsComponent;
  let fixture: ComponentFixture<UserDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserDetailsComponent],
      imports: [HttpClientTestingModule, FormsModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should display "No result found" when filteredUsers is empty', () => {
    component.filteredUsers = [];

    fixture.detectChanges();
    const noResultsElement = fixture.nativeElement.querySelector('.no-results');
    expect(noResultsElement).toBeTruthy();
    expect(noResultsElement.textContent).toContain('No result found.');
  });

  it('should load more users when loadMore button is clicked', () => {
    spyOn(component, 'getRandomUsers');
    const loadMoreButton = fixture.nativeElement.querySelector('.load-more-btn');
    loadMoreButton.click();

    expect(component.getRandomUsers).toHaveBeenCalled();
  });

  it('should return all female users when gender choosen is `female`', () => {
    const mockUsers = [
      { name: { first: 'John', last: 'Doe' }, dob: { age: 25 }, gender: 'male', nat: 'US', email: 'john@example.com', phone: '1234567890' },
      { name: { first: 'Jane', last: 'Smith' }, dob: { age: 30 }, gender: 'female', nat: 'CA', email: 'jane@example.com', phone: '9876543210' }
    ];
    component.users = mockUsers;

    // Apply filters
    component.filterOptions.gender = 'female';
    component.applyFilters();
    component.filteredUsers.forEach((user)=>{
      expect(user.gender).toEqual('female');
    })
  });

  it('should not return any male user when gender choosen is `female`', () => {
    const mockUsers = [
      { name: { first: 'John', last: 'Doe' }, dob: { age: 25 }, gender: 'male', nat: 'US', email: 'john@example.com', phone: '1234567890' },
      { name: { first: 'Jane', last: 'Smith' }, dob: { age: 30 }, gender: 'female', nat: 'CA', email: 'jane@example.com', phone: '9876543210' }
    ];
    component.users = mockUsers;

    // Apply filters
    component.filterOptions.gender = 'female';
    component.applyFilters();
    component.filteredUsers.forEach((user)=>{
      expect(user.gender).not.toEqual('male');
    })
  });

  it('should not return any user from country `US` when nationality choosen is `CA`', () => {
    const mockUsers = [
      { name: { first: 'John', last: 'Doe' }, dob: { age: 25 }, gender: 'male', nat: 'US', email: 'john@example.com', phone: '1234567890' },
      { name: { first: 'Jane', last: 'Smith' }, dob: { age: 30 }, gender: 'female', nat: 'CA', email: 'jane@example.com', phone: '9876543210' }
    ];
    component.users = mockUsers;

    // Apply filters
    component.filterOptions.nationality = 'CA';
    component.applyFilters();
    component.filteredUsers.forEach((user)=>{
      expect(user.nat).not.toEqual('US');
    })
  });

  it('should return all users from country `US` when nationality choosen is `US`', () => {
    const mockUsers = [
      { name: { first: 'John', last: 'Doe' }, dob: { age: 25 }, gender: 'male', nat: 'US', email: 'john@example.com', phone: '1234567890' },
      { name: { first: 'Jane', last: 'Smith' }, dob: { age: 30 }, gender: 'female', nat: 'CA', email: 'jane@example.com', phone: '9876543210' }
    ];
    component.users = mockUsers;

    // Apply filters
    component.filterOptions.nationality = 'US';
    component.applyFilters();
    component.filteredUsers.forEach((user)=>{
      expect(user.nat).toEqual('US');
    })
  });

  it('should filter users based on nationality and gender', () => {
    const mockUsers = [
      { name: { first: 'John', last: 'Doe' }, dob: { age: 25 }, gender: 'male', nat: 'US', email: 'john@example.com', phone: '1234567890' },
      { name: { first: 'Jane', last: 'Smith' }, dob: { age: 30 }, gender: 'female', nat: 'CA', email: 'jane@example.com', phone: '9876543210' }
    ];
    component.users = mockUsers;

    // Apply filters
    component.filterOptions.nationality = 'US';
    component.filterOptions.gender = 'male'
    component.applyFilters();
    component.filteredUsers.forEach((user)=>{
      expect(user.gender).toEqual('male');
      expect(user.nat).toEqual('US');
    })
  });

  it('should apply filters correctly based on name starts with', () => {
    const mockUsers = [
      { name: { first: 'John', last: 'Doe' }, dob: { age: 25 }, gender: 'male', nat: 'US', email: 'john@example.com', phone: '1234567890' },
      { name: { first: 'Jane', last: 'Smith' }, dob: { age: 30 }, gender: 'female', nat: 'CA', email: 'jane@example.com', phone: '9876543210' }
    ];
    component.users = mockUsers;

    // Apply filters
    component.filterOptions.nameStartsWith = 'J';
    component.applyFilters();
    component.filteredUsers.forEach((user)=>{
      expect(user.name.first.toLowerCase().startsWith('j') ||
      user.name.last.toLowerCase().startsWith('j')).toBeTrue();
    })
  });

  it('should render label for age input', () => {
    const labelElement = fixture.debugElement.query(By.css('label[for="age"]'));
    expect(labelElement).toBeTruthy();
    expect(labelElement.nativeElement.textContent).toContain('Minimum Age');
  });

  it('should render label for nationality input', () => {
    const labelElement = fixture.debugElement.query(By.css('label[for="nationality"]'));
    expect(labelElement).toBeTruthy();
    expect(labelElement.nativeElement.textContent).toContain('Nationality');
  });

});
