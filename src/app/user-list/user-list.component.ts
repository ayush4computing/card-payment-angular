import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { users } from '../users'; // Import user data

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
})
export class UserListComponent {
  users = users; // Use the imported user data

  constructor(private router: Router) {}

  // Function to delete a user from the list
  deleteUser(userId: number) {
    // Remove the user from the list (you can use a service for this)
    // For now, remove it from the local list
    

    
  }
}
