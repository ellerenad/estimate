import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  SESSION_EDITOR_PATH: string = '/session';
  constructor(private router:Router){}

  ngOnInit(): void {
  }

  startNow() : void {
    let newId = this.generateUniqueId();
    this.router.navigate(
    [this.SESSION_EDITOR_PATH],
    { queryParams: { 'id': newId } } );
  }

  // TODO Duplicated code: refactor
  generateUniqueId(): string {
    let uniqueId = Date.now().toString(36) + Math.random().toString(36).substring(2);
    return uniqueId;
  }
}
