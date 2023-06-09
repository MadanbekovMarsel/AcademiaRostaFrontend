import {Component, Inject, Input, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {User} from "../../../../models/User";
import {Subject} from "../../../../models/Subject";
import {UserService} from "../../../../service/user.service";
import {SubjectService} from "../../../../service/subject.service";
import {GroupService} from "../../../../service/group.service";

@Component({
  selector: 'app-create-group-modal',
  templateUrl: './create-group-modal.component.html',
  styleUrls: ['./create-group-modal.component.css']
})
export class CreateGroupModalComponent implements OnInit{
  teachers!: User[];
  subjects!: Subject[];

  name!: string;
  selectedTeacher!: User;
  selectedSubject!: Subject;
  @Input() lang!: string;

  constructor(private http: HttpClient,
              private dialogRef: MatDialogRef<CreateGroupModalComponent>,
              private userService:UserService,
              @Inject(MAT_DIALOG_DATA) public data: string,
              private subjectService: SubjectService,
              private groupService: GroupService) {
    this.lang = data;
  }

  onSubmit() {
    this.groupService.createGroup({
      name: this.name,
      subject: this.selectedSubject,
      teacher:this.selectedTeacher,
    }).subscribe(data =>{
      console.log(data);
    },error => {
      console.log(error);
    });
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.subjectService.getAllSubjects().subscribe(data =>{
      this.subjects = data;
    },error => {
      console.log(error);
    });
    this.userService.getAllTeachers().subscribe(data =>{
      this.teachers = data;
    },error =>{
      console.log(error);
    })
  }
}
