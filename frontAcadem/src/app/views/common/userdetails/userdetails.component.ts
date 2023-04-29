import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {User} from "../../../models/User";
import {UserService} from "../../../service/user.service";
import {Group} from "../../../models/Group";
import {GroupService} from "../../../service/group.service";

@Component({
  selector: 'app-userdetails',
  templateUrl: './userdetails.component.html',
  styleUrls: ['./userdetails.component.css']
})
export class UserdetailsComponent implements OnInit{
  @Input() user!: User;
  @Output() selectedGroup = new EventEmitter<any>();

  groups!: Group[];
  isLoad = false;

  constructor(private groupSevice: GroupService) {
  }

  onSubmit() {
    // Обработка отправки формы
  }

  ngOnInit(): void {
    this.groupSevice.getGroupsByUsername(this.user.username).subscribe(data =>{
      this.groups = data;
    });
    this.isLoad = true;
  }
  sendGroupUp(group: Group){
    this.selectedGroup.emit(group);
  }
}
