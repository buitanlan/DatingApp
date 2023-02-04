import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../shared/services/account.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  template: `
    <form #registerForm="ngForm" (ngSubmit)="register()" autocomplete="off">
      <h2 class="text-center text-primary">Sign up</h2>
      <hr>
      <div class="form-group">
        <input type="text" class="form-control" name="username"
               [(ngModel)]="model.username" placeholder="Username">
      </div>
      <div class="form-group">
        <input type="password" class="form-control" name="password"
               [(ngModel)]="model.password" placeholder="Password">
      </div>
      <div class="form-group text-center">
        <button class="btn btn-success mr-2" type="submit">Register</button>
        <button class="btn btn-success mr-2" (click)="cancel()" type="button">Cancel</button>
      </div>

    </form>
  `,
  styleUrls: ['./register.component.scss'],
  standalone: true,
  imports: [
    FormsModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterComponent implements OnInit {
  @Input() usersFormHomeComponent: any;
  @Output() cancelRegister = new EventEmitter();
  model: any = {};
  constructor(private accountService: AccountService, private toastr: ToastrService) {}

  ngOnInit(): void {}

  register() {
    this.accountService.register(this.model).subscribe(
      (res) => {
        console.log(res);
        this.cancel();
      },
      err => {
        console.log(err);
        this.toastr.error(err.error);
      }
    );
  }

  cancel() {
    this.cancelRegister.emit(false);
  }
}
