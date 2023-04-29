import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../service/auth.service";
import {TokenStorageService} from "../../service/token-storage.service";
import {NotificationsService} from "../../service/notifications.service";
import {NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router} from "@angular/router";
import {TranslationService} from "../../service/translation.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  lang = 'ru';
  showProgressBar: boolean = false;

  constructor(
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private notificationService: NotificationsService,
    private router: Router,
    private fb: FormBuilder,
    private translations: TranslationService) {
    this.loginForm = this.createLoginForm();
  }

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.showProgressBar = true;
      }

      if (event instanceof NavigationEnd || event instanceof NavigationCancel || event instanceof NavigationError) {
        this.showProgressBar = false;
      }
    });
    if (this.tokenStorage.getUser()) {
      this.router.navigate(['main']);
    }
  }

  createLoginForm(): FormGroup {
    return this.fb.group({
      username: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required])]
    });
  }

  submit(): void {
    this.authService.login({
      username: this.loginForm.value.username,
      password: this.loginForm.value.password
    }).subscribe(data => {
      console.log(data);

      this.tokenStorage.saveToken(data.token);
      this.tokenStorage.saveUser(data);

      console.log(data.role);
      switch (data.role) {
        case 'ROLE_ADMIN':
          console.log('there is admin');
          this.router.navigate(['main']);
          break;
        case 'ROLE_TEACHER':
          console.log('there is teacher');
          this.router.navigate(['teacher']);
          break;
        case 'ROLE_PUPIL':
          console.log('there is pupil');
          this.router.navigate(['pupil']);
          break;
        default:
          this.router.navigate(['main']);
          break;
      }
      this.notificationService.showSnackBar('Successfully logged in');
      // window.location.reload();
    }, error => {
      console.log(error);
      this.notificationService.showSnackBar(error.message);
    });
  }

  get login():string{
    return this.translations.translate('Login',this.lang);
  }

  get username(): string{
    return this.translations.translate('Username',this.lang);
  }

  get password(): string{
    return this.translations.translate('Password',this.lang);
  }
}
