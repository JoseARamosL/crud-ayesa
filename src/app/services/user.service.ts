import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/User';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  BASE_URL: string = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.BASE_URL}/user`);
  }

  getUser(userId: string): Observable<User> {
    return this.http.get<User>(`${this.BASE_URL}/user/${userId}`);
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.BASE_URL}/user/create`, user);
  }

  deleteUser(userId: string): Observable<User> {
    return this.http.delete<User>(`${this.BASE_URL}/user/delete/${userId}`);
  }

  updateUser(userId: string, user: User): Observable<User> {
    return this.http.put<User>(`${this.BASE_URL}/user/update/${userId}`, user);
  }


}
