import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { AccountService } from '../services/account.service';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};
  currentUser$: Observable<User>;
  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
    // this.getCurrentUser();
    this.currentUser$ = this.accountService.currentUser$;
  }
  login(): void {
    this.accountService.login(this.model).subscribe(res => {
      console.log(res);
      // loggedIn = true
    }, err => console.log(err));
  }

  logout(): void {
    this.accountService.logout();
  }
  getCurrentUser() {
    this.accountService.currentUser$.subscribe((user) => {
      // this.loggedIn = !!user;
    }, err => console.log(err));
  }
}
