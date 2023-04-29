import { Component, Inject, OnInit } from '@angular/core';
import { GroupService } from '../../../../service/group.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Group } from '../../../../models/Group';
import { User } from '../../../../models/User';
import { UserService } from '../../../../service/user.service';

@Component({
  selector: 'app-set-teacher-modal',
  templateUrl: './set-teacher-modal.component.html',
  styleUrls: ['./set-teacher-modal.component.css']
})
export class SetTeacherModalComponent implements OnInit {
  group!: Group;
  teachers!: User[];
  selectedTeacher!: User;

  constructor(
    private groupService: GroupService,
    public dialogRef: MatDialogRef<SetTeacherModalComponent>,
    private userService: UserService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.group = data;
  }

  onSubmit() {
    if (this.selectedTeacher != null) {
      this.groupService
        .setTeacherToGroup(this.group.name, this.selectedTeacher.username)
        .subscribe(data => {
          console.log(data);
        });
    }
    this.closeDialog();
  }

  closeDialog() {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.userService.getAllTeachers().subscribe(
      data => {
        this.teachers = data;
      },
      error => {
        console.log(error);
      }
    );
  }
}
