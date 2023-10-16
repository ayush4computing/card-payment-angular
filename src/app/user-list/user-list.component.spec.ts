import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { UserListComponent } from './user-list.component';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [UserListComponent],
    });
    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display user list', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h2').textContent).toContain('User List');
    expect(compiled.querySelector('table')).toBeTruthy();
  });

  it('should display user details correctly', () => {
    component.users = [
      { id: 1, name: 'Alice', email: 'alice@example.com', phone: '123-456-7890' },
      { id: 2, name: 'Bob', email: 'bob@example.com', phone: '987-654-3210' },
    ];
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    const tableRows = compiled.querySelectorAll('tbody tr');
    expect(tableRows.length).toBe(2);
    expect(tableRows[0].textContent).toContain('Alice');
    expect(tableRows[1].textContent).toContain('Bob');
  });

  it('should trigger delete user function', () => {
    const spy = spyOn(component, 'deleteUser');
    const compiled = fixture.nativeElement;
    const deleteButton = compiled.querySelector('.btn-danger');
    deleteButton.click();
    expect(spy).toHaveBeenCalled();
  });
});
