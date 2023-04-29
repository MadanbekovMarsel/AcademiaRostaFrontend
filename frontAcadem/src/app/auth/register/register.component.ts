import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../service/auth.service";
import {NotificationsService} from "../../service/notifications.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public registerForm: FormGroup;

  constructor(
    private authService: AuthService,
    private notificationService: NotificationsService,
    private router: Router,
    private fb: FormBuilder) {
    this.registerForm = this.createRegisterForm();
  }

  ngOnInit(): void {
  }

  createRegisterForm(): FormGroup {
    return this.fb.group({
      firstname: ['', Validators.compose([Validators.required])],
      lastname: ['', Validators.compose([Validators.required])],
      fathersName: ['', Validators.compose([Validators.required])],
      age: ['', Validators.compose([Validators.required, Validators.max(100), Validators.min(0)])],
      username: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      confirmPassword: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });
  }

  submit(): void {
    this.authService.register({
      firstname: this.registerForm.value.firstname,
      lastname: this.registerForm.value.lastname,
      fathersName: this.registerForm.value.fathersName,
      age: this.registerForm.value.age,
      username: this.registerForm.value.username,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
      confirmPassword: this.registerForm.value.confirmPassword
    }).subscribe(data => {
      console.log(data);
      this.notificationService.showSnackBar('Successfully registered!');
    }, error => {
      this.notificationService.showSnackBar('Something went wrong during registration')
    })
  }
}
