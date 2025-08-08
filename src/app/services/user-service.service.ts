import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../user';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  private baseUrl = 'https://jsonplaceholder.typicode.com/users';

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get<User[]>(this.baseUrl);
  }

  getUserById(id: number) {
    return this.http.get<User>(`${this.baseUrl}/${id}`);
  }

  addUser(user: User) {
    return this.http.post<User>(this.baseUrl, user);
  }

  // Update user info
  updateUser(id: number, user: User) {
    return this.http.put<User>(`${this.baseUrl}/${id}`, user);
  }

  deleteUser(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }


}
