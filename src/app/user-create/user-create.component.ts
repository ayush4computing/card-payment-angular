import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Import FormBuilder and FormGroup
import { users } from '../users'; // Import user data

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
})
export class UserCreateComponent {
  userForm!: FormGroup; // Initialize userForm as a FormGroup
  phoneInvalid: boolean = false;

  constructor(private router: Router, private formBuilder: FormBuilder) {
    // Initialize the userForm with form controls

  }
  
  // Function to add a new user to the list
  addUser() {
    if (this.userForm.valid) {
      // Get the values from the form


      // Generate a unique ID for the new user (you can use a service for this)

      
      // Add the new user to the list (you can use a service for this)
      // For now, add it to the local list


      // Redirect to the user list
      
    }
  }
}
