import {Component, OnInit} from '@angular/core';
import {NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router} from "@angular/router";
import {UserService} from "./service/user.service";
import {TokenStorageService} from "./service/token-storage.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  showProgressBar: boolean = false;
  isLoggedIn = false;
  constructor(private tokenService: TokenStorageService,
              private route: Router) {}

  logout() {
    this.tokenService.logOut();
    this.route.navigate(['/login'])
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
}
