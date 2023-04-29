import {Component} from '@angular/core';
import {Group} from "../../../models/Group";
import {Router} from "@angular/router";
import {GroupService} from "../../../service/group.service";
import {UserService} from "../../../service/user.service";
import {User} from "../../../models/User";
import {group} from "@angular/animations";

@Component({
  selector: 'app-main-pupil',
  templateUrl: './main-pupil.component.html',
  styleUrls: ['./main-pupil.component.css']
})
export class MainPupilComponent {
  groups!: Group[];
  selectedComponent = 'main';
  allpupils!: User[];
  role!: string;
  selectedGroup!: Group;
  isLoaded = false;
  uploadUser!: User;
  userViewerRole!: number;

  constructor(private router: Router,
              private groupService: GroupService,
              private userService: UserService) {
  }

  ngOnInit(): void {
    this.groupService.getCurrentUsersGroups().subscribe(data => {
      this.groups = data;

      console.log(data);
    }, error => {
      console.log(error);
    });
    this.userService.getAllPupils().subscribe(data => {
      this.allpupils = data;
    })
    this.userService.getRole().subscribe(data => {
      this.role = data;
    });
    this.isLoaded = true;
  }

  main(): void {
    this.selectedComponent = 'main';
  }

  trenajer(): void {
    this.router.navigate(['trenajer']);
  }

  handleGroupEvent(data: Group) {
    this.selectedGroup = data;
    this.selectedComponent = 'groupDetails';
  }

  handleUserEvent(data: User) {
    this.uploadUser = data;
    this.selectedComponent = 'userDetails';
  }

  teachers() {
    this.userViewerRole = 1;
    this.selectedComponent = 'users'
  }

  pupils(){
    this.userViewerRole = 2;
    this.selectedComponent = 'users';
  }

  handleTeacherEvent(user : User) {
    this.uploadUser = user;
    this.selectedComponent = 'userDetails';
  }
}
