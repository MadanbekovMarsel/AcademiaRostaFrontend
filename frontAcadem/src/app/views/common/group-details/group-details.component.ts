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
import {TranslationPipe} from "../../../service/ translations/translation.pipe";


@Component({
  selector: 'app-group-details',
  templateUrl: './group-details.component.html',
  styleUrls: ['./group-details.component.css']
})
export class GroupDetailsComponent implements OnInit, OnChanges {
  @Input() groupName!: string;
  @Input() role!: string;
  @Input() lang!: string;
  group!: any;
  allpupils!: User[];

  @Output() uploadUser = new EventEmitter<any>();


  isLoaded = false;
  count!: number;
  timetab = {
    monday: ' ',
    tuesday: ' ',
    wednesday: ' ',
    thursday: ' ',
    friday: ' ',
    saturday: ' ',
    sunday: ' ',
  };

  haveTimetable = false;
  selectedPupil!: User;

  constructor(private groupService: GroupService,
              private userService: UserService,
              private dialog: MatDialog,
              private cdr: ChangeDetectorRef,
              private translationPipe: TranslationPipe) {
  }
  translate(key: string, lang: string): string {
    return this.translationPipe.transform(key, lang);
  }
  onLanguageChanged(lang: string) {
    this.lang = lang;
  }

  ngOnInit(): void {
    this.isLoaded = false;
    this.refreshData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.isLoaded = false;
    this.refreshData();
  }

  handleAddStudent() {
    this.groupService.addUserToGroup(this.groupName, this.selectedPupil.username).subscribe(data => {
      console.log(data);
      this.isLoaded = false;
      this.refreshData();
    }, error => {
      console.log(error);
    });
  }

  refreshData(): void {
    this.groupService.getTimetableForGroup(this.groupName).subscribe(data => {
      if (data) {
        this.timetab = data;
        this.haveTimetable = true;
      }
      console.log(data);
    }, error => {
      console.log(error);
    })

    this.userService.getAllPupils().subscribe(data => {
      this.allpupils = data;
    });

    this.groupService.getGroupByGroupName(this.groupName).subscribe(data => {
      this.group = data;
      this.userService.getMembersOfGroup(this.group.id).subscribe(data => {
        this.group.pupils = data;
        if (this.group.pupils) {
          this.count = this.group.pupils.length;
        } else this.count = 0;
        this.isLoaded = true;
      });
    })
    this.cdr.detectChanges()
  }


  onRowClick(row: User) {
    this.uploadUser.emit(row);
  }

  timetableCreate() {
    const dialogRef = this.dialog.open(CreateTimetableModalComponent, {
      data: {
        group: this.group,
        lang: this.lang
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog was closed:', result);
      this.isLoaded = false;
      this.refreshData();
    });
  }

  setTeacher() {
    const dialogRef = this.dialog.open(SetTeacherModalComponent, {
      data: this.group
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog was closed:', result);
      this.isLoaded = false;
      this.refreshData();
    });
  }

  removePupil(pupil: User) {
    this.groupService.removeUserFromGroup(this.groupName, pupil.username).subscribe(data => {
      console.log(data);
      this.isLoaded = false;
      this.refreshData();
    });
  }
}
