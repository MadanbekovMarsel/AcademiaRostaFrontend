import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Subject} from "../models/Subject";
import {Observable} from "rxjs";

const SUBJECT_API = 'http://localhost:8080/api/subject/';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  constructor(private http: HttpClient) {
  }


  createSubject(subject: { cost: string | null | undefined; name: string | null | undefined }): Observable<any> {
    return this.http.post(SUBJECT_API + "create", subject);
  }

  getAllSubjects(): Observable<any> {
    return this.http.get(SUBJECT_API);
  }

  updateSubject(id: number, subject: Subject): Observable<any> {
    return this.http.patch(SUBJECT_API + ":" + id + "/update", subject);
  }

  deleteSubject(subject:Subject):Observable<any>{
    return this.http.delete(SUBJECT_API + subject.name)
  }
}
