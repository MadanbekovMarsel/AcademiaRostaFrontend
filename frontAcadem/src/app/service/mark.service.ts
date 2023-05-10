import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Mark} from "../models/Mark";
import {Observable} from "rxjs";

const TRENAJER_API = 'http://localhost:8080/api/mark/'
@Injectable({
  providedIn: 'root'
})
export class MarkService {

  constructor(private http: HttpClient) {}

  setMark(mark: Mark,username: string):Observable<any>{
    return this.http.patch(TRENAJER_API + username + '/setMark',mark);
  }

  getMarksByDays(username: string):Observable<any>{
    return this.http.get(TRENAJER_API + username);
  }
  getMarksByTopics(username: string):Observable<any>{
    return this.http.get(TRENAJER_API + username + "/byTopics");
  }
}
