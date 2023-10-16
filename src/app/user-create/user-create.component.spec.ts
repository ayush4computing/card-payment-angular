import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { UserCreateComponent } from './user-create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('UserCreateComponent', () => {
  let component: UserCreateComponent;
  let fixture: ComponentFixture<UserCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, FormsModule, ReactiveFormsModule],
      declarations: [UserCreateComponent],
    });
    fixture = TestBed.createComponent(UserCreateComponent);
    component = fixture.componentInstance;

    // Initialize the form controls
    component.userForm.setValue({ name: '', email: '', phone: '' });

    fixture.detectChanges();
  });

  it('should display user creation form', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h2').textContent).toContain('Create User');
    expect(compiled.querySelector('form')).toBeTruthy();
  });

  it('should disable the "Add User" button initially', () => {
    const compiled = fixture.nativeElement;
    const addButton = compiled.querySelector('button');
    expect(addButton.disabled).toBeTruthy();
  });

  it('should enable the "Add User" button when the form is valid', () => {
    component.userForm.setValue({ name: 'Test User', email: 'test@example.com', phone: '' });
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    const addButton = compiled.querySelector('button');
    expect(addButton.disabled).toBeFalsy();
  });
  
  it('should disable the "Add User" button when the name is missing', () => {
    component.userForm.setValue({ name: '', email: 'test@example.com', phone: '' });
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    const addButton = compiled.querySelector('button');
    expect(addButton.disabled).toBeTruthy();
  });
  
  it('should disable the "Add User" button when the email is missing', () => {
    component.userForm.setValue({ name: 'Test User', email: '', phone: '' });
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    const addButton = compiled.querySelector('button');
    expect(addButton.disabled).toBeTruthy();
  });
  
  it('should enable the "Add User" button when the phone is missing', () => {
    component.userForm.patchValue({ name: 'Test User', email: 'test@example.com', phone: '' });
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    const addButton = compiled.querySelector('button');
    expect(addButton.disabled).toBeFalsy();
  });
    
});
