import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../shared/services/account.service';
import { AsyncPipe, NgIf, TitleCasePipe } from '@angular/common';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-nav',
  template: `
    <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-primary">
      <div class="container">
        <a class="navbar-brand" routerLink="/" routerLinkActive="active">Dating App</a>
        <ul class="navbar-nav mr-auto">
          <ng-container *ngIf="accountService.currentUser$ | async">
            <li class="nav-item">
              <a class="nav-link" routerLink="/members" routerLinkActive="active">Matchs</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="/lists" routerLinkActive="active">Lists</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="/messages" routerLinkActive="active">Messages</a>
            </li>
          </ng-container>
          <li class="nav-item">
            <a class="nav-link" routerLink="/errors" routerLinkActive="active">Errors</a>
          </li>
        </ul>

        <div class="dropdown" *ngIf="accountService.currentUser$ | async as user" dropdown>
          <a class="dropdown-toggle text-light" dropdownToggle>Welcome {{ user.username | titlecase }}
          </a>
          <div class="dropdown-menu" *dropdownMenu>
            <a class="dropdown-item">Edit Profile</a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" (click)="logout()">Logout</a>
          </div>
        </div>
        <form *ngIf="(accountService.currentUser$ | async) === null" #loginForm="ngForm"
              class="form-inline mt-2 mt-md-0" (ngSubmit)="login()" autocomplete="off">
          <input name="username" [(ngModel)]="model.username" class="form-control mr-sm-2" type="text"
                 placeholder="Username" />
          <input name="password" [(ngModel)]="model.password" class="form-control mr-sm-2" type="password"
                 placeholder="Password" />
          <button class="btn btn-success my-2 my-sm-0" type="submit">Login</button>
        </form>
      </div>
    </nav>
  `,
  styleUrls: ['./nav.component.scss'],
  standalone: true,
  imports: [
    AsyncPipe,
    RouterLinkActive,
    RouterLink,
    NgIf,
    BsDropdownModule,
    TitleCasePipe,
    FormsModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavComponent implements OnInit {
  model: any = {};
  constructor(public accountService: AccountService, private router: Router, private toastr: ToastrService) {
    accountService.currentUser$.subscribe((user) => console.log(user));
  }

  ngOnInit(): void {
    // this.getCurrentUser();
  }
  login(): void {
    this.accountService.login(this.model).subscribe(res => {
      this.router.navigateByUrl('/members');
    }, err => {
        console.log(err);
    });
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
