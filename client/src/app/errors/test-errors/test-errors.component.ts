import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { environment } from 'src/environments/environment';
import { NgForOf, NgIf } from '@angular/common';

@Component({
  selector: 'app-test-errors',
  template: `
    <ng-container>
      <button (click)="get400Error()" class="btn btn-outline-primary mr-3">Test 400 Error</button>
      <button (click)="get401Error()" class="btn btn-outline-primary mr-3">Test 401 Error</button>
      <button (click)="get404Error()" class="btn btn-outline-primary mr-3">Test 404 Error</button>
      <button (click)="get500Error()" class="btn btn-outline-primary mr-3">Test 500 Error</button>
      <button (click)="get400ValidationError()" class="btn btn-outline-primary mr-3">Test 400 Validation Error</button>

    </ng-container>
    <div class="row mt-5" *ngIf="validationErrors.length > 0">
      <ul class="text-danger">
        <li *ngFor="let validationErr of validationErrors">
          {{validationErr}}
        </li>
      </ul>
    </div>

  `,
  standalone: true,
  imports: [
    NgIf,
    NgForOf
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TestErrorsComponent {
  baseUrl = environment.apiUrl;
  validationErrors: string[] = [];
  readonly http = inject(HttpClient);

  get404Error() {
    this.http.get(this.baseUrl + 'buggy/not-found').subscribe(
      (response) => {
        console.log(response);
      },
      (err) => console.log(err)
    );
  }

  get400Error() {
    this.http.get(this.baseUrl + 'buggy/bad-request').subscribe(
      (response) => {
        console.log(response);
      },
      (err) => console.log(err)
    );
  }

  get500Error() {
    this.http.get(this.baseUrl + 'buggy/server-error').subscribe(
      (response) => {
        console.log(response);
      },
      (err) => console.log(err)
    );
  }

  get401Error() {
    this.http.get(this.baseUrl + 'buggy/auth').subscribe(
      (response) => {
        console.log(response);
      },
      (err) => console.log(err)
    );
  }

  get400ValidationError() {
    this.http.post(this.baseUrl + 'account/register', {}).subscribe(
      (response) => {
        console.log(response);
      },
      (err) => {
        console.log(err);
        this.validationErrors = err;
      }
    );
  }
}
