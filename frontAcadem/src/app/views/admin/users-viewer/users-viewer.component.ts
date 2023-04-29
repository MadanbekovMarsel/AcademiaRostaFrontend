import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {User} from "../../../models/User";
import {UserService} from "../../../service/user.service";
import {MatDialog} from "@angular/material/dialog";
import {CreateUserComponent} from "../creations/create-user/create-user.component";
import {FormControl} from "@angular/forms";
import {map, Observable, startWith} from "rxjs";

@Component({
  selector: 'app-users-viewer',
  templateUrl: './users-viewer.component.html',
  styleUrls: ['./users-viewer.component.css']
})
export class UsersViewerComponent implements OnChanges, OnInit{
  @Input() role!: number;
  @Output() uploadUser = new EventEmitter<any>;
  public users!: User[];
  myControl = new FormControl<string | User>('');
  filteredOptions!: Observable<User[]>;


  constructor(private userService: UserService,
              private dialog: MatDialog,) {}
  ngOnInit(): void {
    this.refreshData();
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.refreshData();
  }
  displayFn(user: User): string {
    return user && user.firstname ? user.firstname : '';
  }
  refreshData(): void {
    if (this.role !== null) {
      if (this.role == 1) {
        this.userService.getAllTeachers().subscribe((data) => {
          this.users = data;
          this.filteredOptions = this.myControl.valueChanges.pipe(
            startWith(''),
            map((value) => {
              const name = typeof value === 'string' ? value : value?.firstname;
              return name ? this._filter(name as string) : this.users.slice();
            })
          );
        });
      } else {
        this.userService.getAllPupils().subscribe((data) => {
          this.users = data;
          this.filteredOptions = this.myControl.valueChanges.pipe(
            startWith(''),
            map((value) => {
              const name = typeof value === 'string' ? value : value?.firstname;
              return name ? this._filter(name as string) : this.users.slice();
            })
          );
        });
      }
    }
  }
  private _filter(name: string): User[] {
    const filterValue = name.toLowerCase();

    return this.users.filter(option =>
      option.firstname.toLowerCase().includes(filterValue) ||
      option.lastname.toLowerCase().includes(filterValue)
    );
  }



  createUser(){
    const dialogRef = this.dialog.open(CreateUserComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog was closed:', result);
      this.refreshData();
    });
  }

  onRowClick(row: User) {
    this.uploadUser.emit(row);
  }
}
