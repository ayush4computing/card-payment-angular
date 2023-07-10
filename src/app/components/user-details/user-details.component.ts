import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  users: any[] = [];
  filteredUsers: any[] = [];
  filterOptions = {
    age: '',
    gender: '',
    nationality: '',
    nameStartsWith: ''
  };

  constructor(private http: HttpClient) { }

  ngOnInit() {
    // Add your code here

  }

  loadMoreUsers() {
    // Add your code here
  }

  getRandomUsers() {
    this.http.get<any>('https://randomuser.me/api/?results=50').subscribe(response => {
      // Add your code here

      this.filteredUsers = this.users;
    });
  }

  applyFilters() {
    this.filteredUsers = this.users.filter(user => {
      // Add your code here
    });
  }

  filterByAge(user: any): boolean {
    if (!this.filterOptions.age) {
      return true;
    }

    // Remove following return statement and add your code here
    return true

  }

  filterByGender(user: any): boolean {
    if (!this.filterOptions.gender) {
      return true;
    }
    // Remove following return statement and add your code here
    return true
  }

  filterByNationality(user: any): boolean {
    if (!this.filterOptions.nationality) {
      return true;
    }

    // Remove following return statement and add your code here

    return true

  }

  filterByName(user: any): boolean {
    if (!this.filterOptions.nameStartsWith) {
      return true;
    }

    // Remove following return statement and add your code here
    
    return true;
  }
}