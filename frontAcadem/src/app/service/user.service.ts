import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

const USER_API = 'http://localhost:8080/api/user/';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUserById(id: number): Observable<any>{
    return this.http.get(USER_API + id);
  }
  getCurrentUser(): Observable<any>{
    return this.http.get(USER_API);
  }

  getAllPupils(): Observable<any>{
    return this.http.get(USER_API + 'pupils');
  }

  getAllTeachers():Observable<any>{
    return this.http.get(USER_API + 'teachers');
  }
  getMembersOfGroup(groupId: number | undefined): Observable<any>{
    return this.http.get(USER_API  + groupId + "/members");
  }

  updateUser(user : any): Observable<any>{
    return this.http.post(USER_API + "update",user);
  }

  getRole():Observable<string>{
    return this.http.get<string>(USER_API + "role");
  }
}
