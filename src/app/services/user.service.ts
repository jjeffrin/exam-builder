import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { UserModel } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  readonly baseUrl = "https://localhost:44368/api";

  constructor(
    private http: HttpClient
  ) { }

  loginUser(username: string, password: string): Observable<any> {
    return this.http.get<any>(this.baseUrl + "/User/Login", {
      params: {
        username: username,
        password: password
      },
      observe: 'response'
    });
  }

  addNewUser(user: UserModel): Observable<any> {
    return this.http.post<any>(this.baseUrl + "/User", user)
  }

  getUsers() {
    return this.http.get<any>(this.baseUrl + "/User");
  }

  deleteUserById(id: string) {
    return this.http.delete<any>(this.baseUrl + "/User", {
      params: {
        id: id
      }
    });
  }

  updateUser(user: UserModel) {
    return this.http.put<any>(this.baseUrl + "/User", user);
  }
}
