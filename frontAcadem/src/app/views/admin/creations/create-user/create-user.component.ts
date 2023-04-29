import {Component} from '@angular/core';
import {STEPPER_GLOBAL_OPTIONS} from "@angular/cdk/stepper";
import {FormBuilder, Validators} from "@angular/forms";
import {AuthService} from "../../../../service/auth.service";
import {NotificationsService} from "../../../../service/notifications.service";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {showError: true},
    },
  ],
})
export class CreateUserComponent {
  firstFormGroup = this._formBuilder.group({
    firstname: ['', Validators.compose([Validators.required])],
    lastname: ['', Validators.compose([Validators.required])],
    fathersName: ['', Validators.compose([Validators.required])],
    username: ['', Validators.compose([Validators.required])],
    password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
    confirmPassword: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
  });
  secondFormGroup = this._formBuilder.group({
    age: ['', Validators.compose([Validators.required, Validators.max(100), Validators.min(0)])],
    email: ['', Validators.compose([Validators.email])],
    address: ['',Validators.compose([])],
    phoneNumber:['',Validators.compose([])]
  });
  selectedRole: number = 1;

  constructor(private _formBuilder: FormBuilder,
              private authService: AuthService,
              private dialogRef: MatDialogRef<CreateUserComponent>,
              private notificationService: NotificationsService) {
  }

  submit() {
    let currentRole;
    switch (this.selectedRole) {
      case 1:
        currentRole = 'ROLE_TEACHER';
        break;
      case 2:
        currentRole = 'ROLE_ADMIN';
        break;
      case 3:
        currentRole = 'ROLE_PUPIL';
        break;
      default:
        break;
    }
    console.log({
      firstname: this.firstFormGroup.value.firstname,
      lastname: this.firstFormGroup.value.lastname,
      fathersName: this.firstFormGroup.value.fathersName,
      age: this.secondFormGroup.value.age,
      username: this.firstFormGroup.value.username,
      address: this.secondFormGroup.value.address,
      phoneNumber: this.secondFormGroup.value.phoneNumber,
      role: currentRole,
      email: this.secondFormGroup.value.email,
      password: this.firstFormGroup.value.password,
      confirmPassword: this.firstFormGroup.value.confirmPassword
    });
    this.authService.register({
      firstname: this.firstFormGroup.value.firstname,
      lastname: this.firstFormGroup.value.lastname,
      fathersName: this.firstFormGroup.value.fathersName,
      age: this.secondFormGroup.value.age,
      username: this.firstFormGroup.value.username,
      address: this.secondFormGroup.value.address,
      phoneNumber: this.secondFormGroup.value.phoneNumber,
      role: currentRole,
      email: this.secondFormGroup.value.email,
      password: this.firstFormGroup.value.password,
      confirmPassword: this.firstFormGroup.value.confirmPassword,
    }).subscribe(data => {
      console.log(data);
      this.notificationService.showSnackBar('Successfully registered!');
    }, error => {
      this.notificationService.showSnackBar('Something went wrong during registration')
    })
  }
}
