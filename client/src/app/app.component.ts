import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { User } from './models/user';
import { AccountService } from './services/account.service';
import { NavComponent } from './nav/nav.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  template: `
    <app-nav></app-nav>
    <div class="container" style="margin-top: 100px">
      <router-outlet></router-outlet>
    </div>

  `,
  styleUrls: ['./app.component.css'],
  imports: [
    NavComponent,
    RouterOutlet
  ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
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
