import {Component, Input, OnInit} from '@angular/core';
import {Group} from "../../models/Group";
import {Router} from "@angular/router";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit{
  groups!: Group[];
  selectedComponent = 'main';
  selectedGroup!: Group;

  constructor(private router: Router) {
  }

  ngOnInit(): void {

  }

  main(): void{
    console.log('main');
    this.selectedComponent = 'main';
  }
  trenajer():void {
    this.router.navigate(['trenajer']);
  }

  handleMyEvent(data: Group) {
    this.selectedGroup = data;
    console.log(data);
    this.selectedComponent = 'details';
  }
}
