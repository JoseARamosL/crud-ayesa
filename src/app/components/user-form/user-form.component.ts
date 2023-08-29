import { Component, OnInit } from '@angular/core';
import { User } from '../../interfaces/User';
import { UserService } from '../../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  user: User = {
    name: '',
    lastName: '',
    age: 0,
    description: '',
    email: '',
    password: ''
  };

  edit: boolean = false;

  constructor(
    private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute
    ) {}

  ngOnInit(): void {
    const params = this.activatedRoute.snapshot.params;

    if (params) {
      this.userService.getUser(params['id']).subscribe(
        res => {
          Object.values(res).forEach(user => {
            this.user = user;
          });
          this.edit = true;
        },
        error => console.log(error)
      );
    }
  }

  submitUser() {
    this.userService.createUser(this.user).subscribe(
      res => {
        this.router.navigate(['/']);
      },
      error => console.log(error)
    );
  }

  updateUser() {
    if (this.user._id) {
      delete this.user.createdAt;
      this.userService.updateUser(this.user._id, this.user).subscribe(
        res => {
          this.router.navigate(['/']);
        },
        error => console.log(error)
      );
    }
  }
}
