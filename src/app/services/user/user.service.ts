import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import User from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) {}

  private url = "http://localhost:5050/users/"

  get(){
    return this.httpClient.get(this.url, {
      headers: {
        'Authorization': this.getToken() as string
      }
    });
  }

  register(user: User){
    return this.httpClient.post(this.url, user);
  }

  login(username: string, password: string){
    return this.httpClient.post(this.url + "login", {username: username, password: password});
  }

  storeToken(token: string){
    localStorage.setItem("token", token);
  }
  
  getToken(){
    return localStorage.getItem("token")
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    return token !== null && token !== undefined;
  }

  logOut(){
    localStorage.removeItem("username");
    return localStorage.removeItem("token");
  }

  getUserName(){
    return localStorage.getItem("username");
  }
}
