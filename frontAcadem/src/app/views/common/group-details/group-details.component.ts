import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import {GroupService} from "../../../service/group.service";
import {MatDialog} from "@angular/material/dialog";
import {User} from "../../../models/User";
import {UserService} from "../../../service/user.service";
import {
  CreateTimetableModalComponent
} from "../../admin/creations/create-timetable-modal/create-timetable-modal.component";
import {SetTeacherModalComponent} from "../../admin/insertions/set-teacher-modal/set-teacher-modal.component";
import {Group} from "../../../models/Group";
import {dateTimestampProvider} from "rxjs/internal/scheduler/dateTimestampProvider";


@Component({
  selector: 'app-group-details',
  templateUrl: './group-details.component.html',
  styleUrls: ['./group-details.component.css']
})
export class GroupDetailsComponent implements OnInit, OnChanges{
  @Input() group!: any;
  @Input() role!: string;
  allpupils!: User[];

  @Output() uploadUser = new EventEmitter<any>();


  isLoaded = false;
  count!: number;
  timetab = {
    monday: ' ',
    tuesday:' ',
    wednesday:' ',
    thursday:' ',
    friday:' ',
    saturday:' ',
    sunday:' ',
  };

  haveTimetable = false;
  selectedPupil!: User;
  constructor(private groupService: GroupService,
              private userService: UserService,
              private dialog: MatDialog,
              private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.isLoaded = false;
    this.refreshData();
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.isLoaded = false;
    this.refreshData();
  }
  handleAddStudent() {
    this.groupService.addUserToGroup(this.group.name,this.selectedPupil.username).subscribe(data =>{
      console.log(data);
      this.refreshData();
    },error => {
      console.log(error);
    });
  }

  refreshData():void{
    this.userService.getMembersOfGroup(this.group.id).subscribe(data=>{
      this.group.pupils = data;
      if(this.group.pupils){
        this.count = this.group.pupils.length;
      }else this.count = 0;
    });

    this.userService.getAllPupils().subscribe(data =>{
      this.allpupils = data;
    });

    this.groupService.getGroupByGroupName(this.group.name).subscribe(data =>{
      this.group = data;
    })
    this.groupService.getTimetableForGroup(this.group.name).subscribe(data =>{
      if(data){
        this.timetab = data;
        this.haveTimetable = true;
      }
      console.log(data);
    },error => {
      console.log(error);
    })
    this.cdr.detectChanges()
  }


  onRowClick(row: User) {
    this.uploadUser.emit(row);
  }

  timetableCreate() {
    const dialogRef = this.dialog.open(CreateTimetableModalComponent, {
      data: this.group
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog was closed:', result);
      this.refreshData();
    });
  }

  setTeacher() {
    const dialogRef = this.dialog.open(SetTeacherModalComponent, {
      data: this.group
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog was closed:', result);
      this.refreshData();
    });
  }

  removePupil(pupil: User) {
    this.groupService.removeUserFromGroup(this.group.name,pupil.username).subscribe(data =>{
      console.log(data);
      this.refreshData();
    });
  }


}
