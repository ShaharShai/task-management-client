import { Component } from '@angular/core';
import User from 'src/app/models/user.model';
import { SocketioService } from 'src/app/services/socket/socketio.service';
import { UserService } from 'src/app/services/user/user.service';
import { Router } from '@angular/router';


import { Validators } from '@angular/forms';

export const titleValidator = (title: string) => {
  if (title.length < 2 || title.length > 10) {
    return {
      invalid: true,
      message: 'Title must be between 2 and 10 characters long.',
    };
  }

  return { invalid: false };
};

export const descriptionValidator = (description: string) => {
  if (description.length > 50) {
    return {
      invalid: true,
      message: 'Description must be no more than 50 characters long.',
    };
  }

  return { invalid: false };
};

export const priorityValidator = (priority: number) => {
  if (priority < 1 || priority > 5) {
    return {
      invalid: true,
      message: 'Priority must be between 1 and 5.',
    };
  }

  return { invalid: false };
};



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  newUser: User = new User("", "", "", "");

  users: User[] = [];

  registerSection: boolean = false;

  constructor(private userService: UserService, private socketService: SocketioService, private router: Router) {
    this.socketService.setupSocketConnection();
    this.userService.get().subscribe(data => {
      this.users = data as User[];
      
    })
  }

  loginUser(){
    this.userService.login(this.username, this.password)
    .subscribe((data:any) => {
      this.userService.storeToken(data.token);
      localStorage.setItem('username', this.username);
      this.router.navigate(['/tasks']);
    }, (err:any) => {
      alert(err.error);
    })
  }

  registerHandler(){
    this.registerSection = !this.registerSection;
  }

  registerUser(){
    this.userService.register(this.newUser)
    .subscribe((data:any) => {
      this.userService.storeToken(data.token);
      localStorage.setItem('username', this.newUser.username);
      this.router.navigate(['/tasks']);
    }, (err:any) => {
      alert(err.error);
    })
  }

}
