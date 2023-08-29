import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs';
import { User } from '../../interfaces/User';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: User[] = [];
  arrUsers: User[] = [];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
      this.getUsers();
  }

  getUsers() {
    this.userService.getUsers().subscribe(
      res => {
        this.users = Object.values(res);
        this.users.forEach(user => {
          Object.values(user).forEach(item => {
            this.arrUsers.push(item);
          })
        });
      },
      error => console.log(error)
    );
  }

  deleteUser(userId: string) {
    this.userService.deleteUser(userId).subscribe(
      res => {
        this.getUsers();
        window.location.reload();
      },
      error => console.log(error)
    );
  }
}
