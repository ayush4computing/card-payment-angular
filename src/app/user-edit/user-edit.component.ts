import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { users } from '../users'; // Import user data

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
})
export class UserEditComponent {
  user: any;

  constructor(private route: ActivatedRoute, private router: Router) {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam !== null) {
      const id = +idParam;
      // Find the user by ID (you can use a service for this)
  

      if (!this.user) {
        // Handle user not found, e.g., redirect to the user list
      
      }
    } else {
      // Handle the case when 'id' parameter is not provided, e.g., redirect to the user list
    
    }
  }

  // Function to save user data
  saveUser() {
    // Update the user data (you can use a service for this)
    

    // Redirect to the user details page
    
  }
}
