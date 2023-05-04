import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../service/auth.service";
import {TokenStorageService} from "../../service/token-storage.service";
import {NotificationsService} from "../../service/notifications.service";
import {NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router} from "@angular/router";
import {TranslationService} from "../../service/ translations/translation.service";
import {TranslationPipe} from "../../service/ translations/translation.pipe";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  lang = 'ru';
  showProgressBar: boolean = false;
  hide = true;

  constructor(
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private notificationService: NotificationsService,
    private router: Router,
    private fb: FormBuilder,
    private translationPipe: TranslationPipe) {
    this.loginForm = this.createLoginForm();
  }
  translate(key: string, lang: string): string {
    return this.translationPipe.transform(key, lang);
  }
  onLanguageChanged(lang: string) {
    this.lang = lang;
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
      this.router.navigate(['main']);
      this.notificationService.showSnackBar('Successfully logged in');
    }, error => {
      console.log(error);
      this.notificationService.showSnackBar(error.message);
    });
  }
}
