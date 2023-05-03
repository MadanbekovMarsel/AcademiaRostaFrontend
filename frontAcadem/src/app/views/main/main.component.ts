import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Group} from "../../models/Group";
import {Router} from "@angular/router";
import {User} from "../../models/User";
import {GroupService} from "../../service/group.service";
import {UserService} from "../../service/user.service";
import {TokenStorageService} from "../../service/token-storage.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit{
  @Output() languageChanged = new EventEmitter<string>();
  groups!: Group[];
  selectedComponent = 'main';
  allPupils!: User[];
  role!: string;
  selectedGroup!: Group;
  isLoaded = false;
  uploadUser!: User;
  userViewerRole!: number;
  isLoggedIn = false;

  language = 'kg';

  constructor(private router: Router,
              private tokenService: TokenStorageService,
              private groupService: GroupService,
              private userService: UserService) {
  }
  changeLanguage(lang: string) {
    this.language = lang;
    this.languageChanged.emit(lang);
  }
  logout() {
    this.tokenService.logOut();
    this.router.navigate(['/login'])
  }
  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenService.getToken();
    this.groupService.getCurrentUsersGroups().subscribe(data => {
      this.groups = data;

      console.log(data);
    }, error => {
      console.log(error);
    });
    this.userService.getAllPupils().subscribe(data => {
      this.allPupils = data;
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
