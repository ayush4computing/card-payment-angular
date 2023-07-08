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

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getRandomUsers();
  }

  getRandomUsers() {
    this.http.get<any>('https://randomuser.me/api/?results=50').subscribe(response => {
      this.users = response.results;
      this.filteredUsers = this.users;
    });
  }

  applyFilters() {
    this.filteredUsers = this.users.filter(user => {
      return (
        this.filterByAge(user) &&
        this.filterByGender(user) &&
        this.filterByNationality(user) &&
        this.filterByName(user)
      );
    });
  }

  filterByAge(user: any): boolean {
    if (!this.filterOptions.age) {
      return true;
    }

    const age = parseInt(this.filterOptions.age, 10);
    return user.dob.age > age;
  }

  filterByGender(user: any): boolean {
    if (!this.filterOptions.gender) {
      return true;
    }

    return user.gender.toLowerCase() === this.filterOptions.gender.toLowerCase();
  }

  filterByNationality(user: any): boolean {
    if (!this.filterOptions.nationality) {
      return true;
    }
    // return true;
    return user.nat.toLowerCase() === this.filterOptions.nationality.toLowerCase();
  }

  filterByName(user: any): boolean {
    if (!this.filterOptions.nameStartsWith) {
      return true;
    }

    const nameStartsWith = this.filterOptions.nameStartsWith.toLowerCase();
    return (
      user.name.first.toLowerCase().startsWith(nameStartsWith) ||
      user.name.last.toLowerCase().startsWith(nameStartsWith)
    );
  }
}