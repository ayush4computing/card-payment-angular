import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { users } from '../users'; // Import user data

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
})
export class UserDetailsComponent {
  user: any;

  constructor(private route: ActivatedRoute, private router: Router) {
    const id = this.route.snapshot.paramMap.get('id');

    if (id !== null) {
      const userId = +id;
      this.user = users.find((user) => user?.id === userId);
    }

    if (!this.user) {
      // Handle user not found, e.g., redirect to the user list
      this.router.navigate(['/users']);
    }
  }
}
