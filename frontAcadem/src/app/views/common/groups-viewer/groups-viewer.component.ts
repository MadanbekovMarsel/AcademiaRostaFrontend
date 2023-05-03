import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Group} from "../../../models/Group";
import {MatDialog} from "@angular/material/dialog";
import {CreateGroupModalComponent} from "../../admin/creations/create-group-modal/create-group-modal.component";
import {GroupService} from "../../../service/group.service";
import {UserService} from "../../../service/user.service";
import {dateTimestampProvider} from "rxjs/internal/scheduler/dateTimestampProvider";
import {
  CreateTimetableModalComponent
} from "../../admin/creations/create-timetable-modal/create-timetable-modal.component";
import {FormControl} from "@angular/forms";
import {User} from "../../../models/User";
import {map, Observable, startWith} from "rxjs";
import {TranslationPipePipe} from "../../../service/ translations/translation-pipe.pipe";

@Component({
  selector: 'app-groups-viewer',
  templateUrl: './groups-viewer.component.html',
  styleUrls: ['./groups-viewer.component.css']
})
export class GroupsViewerComponent implements OnInit, OnChanges{
  groups!: Group[];
  @Input() lang!: string;
  @Output() selectedGroup = new EventEmitter<any>();
  isLoaded: boolean = false;

  myControl = new FormControl<string | Group>('');
  filteredOptions!: Observable<Group[]>;

  constructor(private dialog: MatDialog,
              private groupService: GroupService,
              private userService: UserService,
              private translationPipe: TranslationPipePipe) {
  }
  translate(key: string, lang: string): string {
    return this.translationPipe.transform(key, lang);
  }
  onLanguageChanged(lang: string) {
    this.lang = lang;
  }
  sendGroupUp(group: Group){
    this.selectedGroup.emit(group);
  }

  openGroupCreateModal() {
    const dialogRef = this.dialog.open(CreateGroupModalComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog was closed:', result);
      this.refreshData();
    });
  }
  displayFn(group: Group): string {
    return group && group.name ? group.name : '';
  }
  ngOnInit(): void {
    this.refreshData();
  }
  refreshData():void{
    this.groupService.getCurrentUsersGroups().subscribe(data =>{
      this.groups = data;
      this.groups.forEach((group) =>{
        this.userService.getMembersOfGroup(group.id).subscribe(data =>{
          group.pupils = data;
        });
      });
      this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(''),
        map((value) => {
          const name = typeof value === 'string' ? value : value?.name;
          return name ? this._filter(name as string) : this.groups.slice();
        })
      );
    });
  }
  private _filter(name: string): Group[] {
    const filterValue = name.toLowerCase();
    return this.groups.filter(group => group.name.toLowerCase().includes(filterValue));
  }
  onDelete(group: Group) {
    this.groupService.deleteGroup(group.name).subscribe(data=>{
      console.log(data);
      this.refreshData();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.refreshData();
  }
}
