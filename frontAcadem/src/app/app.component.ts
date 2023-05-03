import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router} from "@angular/router";
import {UserService} from "./service/user.service";
import {TokenStorageService} from "./service/token-storage.service";
import {TranslationService} from "./service/ translations/translation.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnChanges{
  showProgressBar: boolean = false;
  currentLang = 'en';
  constructor(private tokenService: TokenStorageService,
              private route: Router,
              private translationService: TranslationService) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.isLoggedIn = !!this.tokenService.getToken();
    window.location.reload();
  }
  isLoggedIn = false;
  logout() {
    this.tokenService.logOut();
    this.route.navigate(['/login'])
  }
  switchLanguage(lang: string) {
    this.currentLang = lang;
    // this.translationService.setLanguage(lang);
  }
  ngOnInit() {
    this.isLoggedIn = !!this.tokenService.getToken();

    this.route.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.showProgressBar = true;
      }

      if (event instanceof NavigationEnd || event instanceof NavigationCancel || event instanceof NavigationError) {
        this.showProgressBar = false;
      }
    });
  }
  isAuthenticated() {
    // Implement your authentication logic here
    return true;
  }
}
