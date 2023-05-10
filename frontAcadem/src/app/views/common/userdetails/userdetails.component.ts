import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from "../../../models/User";
import {Group} from "../../../models/Group";
import {GroupService} from "../../../service/group.service";
import {UserService} from "../../../service/user.service";
import {Router} from "@angular/router";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {UserUpdateComponent} from "../../admin/updates/user-update/user-update.component";
import {OldViewComponent} from "../../../view/old-view/old-view.component";
import {
  CreateTimetableModalComponent
} from "../../admin/creations/create-timetable-modal/create-timetable-modal.component";

@Component({
  selector: 'app-userdetails',
  templateUrl: './userdetails.component.html',
  styleUrls: ['./userdetails.component.css']
})
export class UserdetailsComponent implements OnInit {
  @Input() user!: User;
  @Output() selectedGroup = new EventEmitter<any>();
  @Input() lang!: string;

  groups!: Group[];
  isLoad = false;
  hideStats: boolean = true;

  constructor(private groupService: GroupService,
              private dialog: MatDialog,
              private userService: UserService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.refreshData();
  }

  sendGroupUp(group: Group) {
    this.selectedGroup.emit(group);
  }

  deleteUser() {
    this.userService.deleteUser(this.user.username).subscribe(data => {
      console.log(data);
    })
    this.router.navigate(['main']);
    window.location.reload();
  }

  edit() {
    const dialogRef = this.dialog.open(UserUpdateComponent, {
      data: {
        user: this.user,
        lang: this.lang
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog was closed:', result);
      this.refreshData();
    });
  }

  private refreshData() {
    this.userService.getUserByUsername(this.user.username).subscribe(data => {
      this.user = data;
      this.groupService.getGroupsByUsername(this.user.username).subscribe(data => {
        this.groups = data;
      });
    })

    this.isLoad = true;
  }
}
