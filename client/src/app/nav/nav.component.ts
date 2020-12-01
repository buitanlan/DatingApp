import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  constructor(private accountService: AccountService, private router: Router) { }

  ngOnInit(): void {
    // this.getCurrentUser();
    this.currentUser$ = this.accountService.currentUser$;
  }
  login(): void {
    this.accountService.login(this.model).subscribe(res => {
      this.router.navigateByUrl('/members');
    }, err => console.log(err));
  }

  logout(): void {
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }
  getCurrentUser() {
    this.accountService.currentUser$.subscribe((user) => {
      // this.loggedIn = !!user;
    }, err => console.log(err));
  }
}
