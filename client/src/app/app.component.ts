import { Component, OnInit } from '@angular/core';
import { User } from './models/user';
import { AccountService } from './services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'The Dating app';
  users: any;

  constructor( private accountService: AccountService) {
  }
  ngOnInit(): void {
    this.setCurrentUser();
  }

  setCurrentUser(): void {

    // tslint:disable-next-line:no-non-null-assertion
    const user: User = JSON.parse(localStorage.getItem('user')!);

    this.accountService.setCurrentUser(user);
  }
}
