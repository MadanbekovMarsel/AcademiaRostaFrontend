import {Component, Inject, Input} from '@angular/core';
import {User} from "../../../../models/User";
import {FormBuilder, Validators} from "@angular/forms";
import {UserService} from "../../../../service/user.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {NotificationsService} from "../../../../service/notifications.service";

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent {
  @Input() user!: User;
  @Input() lang!: string;
  firstFormGroup = this._formBuilder.group({
    firstname: [''],
    lastname: [''],
    fathersName: [''],
    phoneNumber: [''],
    email: ['', Validators.compose([Validators.email])],
    address: ['']
  });

  constructor(private _formBuilder: FormBuilder,
              private userService: UserService,
              public dialogRef: MatDialogRef<UserUpdateComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private notificationService: NotificationsService) {
    this.lang = data.lang;
    this.user = data.user;
  }


  ngOnInit(): void {
  }

  save() {
    this.userService.updateUser({
      firstname: this.firstFormGroup.value.firstname,
      lastname: this.firstFormGroup.value.lastname,
      address: this.firstFormGroup.value.address,
      email: this.firstFormGroup.value.email,
      phoneNumber: this.firstFormGroup.value.phoneNumber,
    }, this.user.username).subscribe(data =>{
      console.log(data);
    },error => {
      this.notificationService.showSnackBar(error);
    });
    this.dialogRef.close();
  }
}
