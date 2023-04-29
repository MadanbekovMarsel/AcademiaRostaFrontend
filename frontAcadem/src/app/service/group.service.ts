import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Group} from "../models/Group";
import {Observable} from "rxjs";
import {Timetable} from "../models/Timetable";
import {group} from "@angular/animations";

const GROUP_API = "http://localhost:8080/api/group/";
@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private http: HttpClient) {
  }
  createGroup(group: Group): Observable<any> {
    console.log("hello registering group" + group.name)
    return this.http.post(GROUP_API + "create", group);
  }

  getAllGroups(): Observable<any>{
    return this.http.get(GROUP_API+"all");
  }

  getCurrentUsersGroups(): Observable<any> {
    return this.http.get(GROUP_API);
  }

  getGroupsByUsername(username: string):Observable<any>{
    return this.http.get(GROUP_API + username + "/groups");
  }


  getGroupById(id: number): Observable<any> {
    return this.http.get(GROUP_API + id);
  }

  getTimetableForGroup(groupName: string): Observable<any> {
    return this.http.get(GROUP_API  + groupName + "/timetable");
  }

  updateGroupById(id: number, group: Group): Observable<any> {
    return this.http.patch(GROUP_API + id + "/update", group);
  }

  addUserToGroup(groupName: string, username: string): Observable<any> {
    return this.http.patch(GROUP_API + groupName + "/" + username + "/add", null);
  }

  setTeacherToGroup(groupName:string, username: string):Observable<any>{
    return this.http.patch(GROUP_API + groupName +"/" + username + "/setTeacher",null)
  }
  removeUserFromGroup(groupName: string, username: string): Observable<any> {
    return this.http.patch(GROUP_API + groupName + "/" + username + "/remove", null);
  }

  setTimetableToGroup(groupName:string, timetable: Timetable): Observable<any>{
    return this.http.patch(GROUP_API + groupName + "/setTimetable",timetable);
  }

  getGroupByGroupName(name: string) {
    return this.http.get(GROUP_API + name +"/byName");
  }

  deleteGroup(groupName: string) {
    return this.http.delete(GROUP_API + groupName + "/delete");
  }
}
