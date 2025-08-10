import { Component, OnInit } from '@angular/core';
import { UserServiceService } from 'src/app/services/user-service.service';
import { User } from 'src/app/user';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  users: User[] = [];
  userAdded: boolean = false; // Control Add User Form
  userEdited: boolean = false; // Control Edit User Form
  userDetails?: User; // Hold Edit User Details
  indexEdit: number = 0; // Hold Index of User being edited

  constructor(private userService: UserServiceService) { }

  
  ngOnInit(): void {
    this.getUserList();
  }

  getUserList() {
    this.userService.getUsers().subscribe((data: User[]) => {
      this.users = data;
    });
  }

  addUser() {
    this.userAdded = !this.userAdded;
    this.userEdited = false; // Reset edit mode when adding a new user
    this.userDetails = undefined;
  }

  addUserDetails(user: User) {
    this.userDetails = user;
    console.log('Adding User:', this.userDetails);
    
    // Local list is empty (all data is deleted)
    if (this.users.length === 0) {
      this.userDetails.id = 1; // Start with ID 1 if no users exist
      console.log('First User ID:', this.userDetails.id);
    } else {
      // New user added to, local list
      this.userDetails.id = this.users.slice(-1)[0].id + 1; // Increment ID based on last user
      console.log('Last User ID:', this.userDetails.id);
      this.userDetails.id = this.userDetails.id++; // Assign a new ID
      console.log('New ID:', this.userDetails.id);
    }

    console.log('User Added:', this.userDetails);
    this.users = [...this.users, this.userDetails]; // Add new user to the list
    
    if (this.users.slice(-1)[0].id !== this.userDetails.id) {
      console.error('Fail Adding:', this.userDetails);
    }

    // No Adding Data in API, just local
    // this.userService.addUser(this.userDetails).subscribe((data: User) => { });
  }


  editUser(index: number){
    this.userEdited = true;
    this.userAdded = false; // Reset add mode when editing a user
    const userData = this.users[index];
    
    if(userData) {
      console.log('Editing Local User:', userData);
      this.userDetails = userData; // data for display in form
      this.indexEdit = userData.id;
    } else {
      console.error('User not found at index:', index);
      return;
    }

    // No Editing Data in API, just local
    // this.userService.getUserById(this.users[index].id).subscribe((data: User) => {
    //   console.log('Editing API User:',data);
    //   this.userDetails = data;
    // });
  
    console.log('User ID:', userData.id, 'index:', this.indexEdit);
    
  }

  editUserDetails(user: User) {
    console.log('Editing User Details', this.indexEdit);
    this.editUserDetailsByID(this.indexEdit, user)
  }

  editUserDetailsByID(id: number, user: User) {
    // update new user data
    const userIndex = this.users.findIndex(u => u.id === id);
    if (userIndex !== -1) {
      this.users[userIndex] = user; // Update the user in the list
      this.users[userIndex].id = id; // Ensure the ID is inserted
      console.log('User Updated:', this.users[userIndex].id, this.users[userIndex]);
      this.userDetails = undefined; // Clear user details after editing
    } else {
      console.error('User not found for ID:', id);
    }

    // No Editing Data in API, just local
    // this.userService.updateUser(id, user).subscribe((data: User) => {
    //   console.log('User Updated:', data);
    //   this.userDetails = undefined; // Clear user details
    // });
  }

  editFormToggle(event: boolean) {
    this.userEdited = event;
    if (!event) {
      // Clear user details when edit form is closed
      this.userDetails = undefined; 
    }
  }

  addFormToggle(event: boolean) {
    this.userAdded = event;
    if (!event) {
      // Clear user details when add form is closed
      this.userDetails = undefined; 
    }
  }

  deleteUser(id: number) {
    this.users = this.users.filter(user => user.id !== id); // Remove user from the list

    console.log('User Deleted:', id);
    
    // No Deleting Data in API, just local
    // this.userService.deleteUser(id).subscribe(() => {});
  }
}
