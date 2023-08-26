import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private httpClient: HttpClient, private userService: UserService) { }

  private url = "http://localhost:5050/tasks/"

  get(){
    
    return this.httpClient.get(this.url)
  }
}



