import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  template: `
    <div class="container">
      <h1 class="">Not Found</h1>
      <button class="btn btn-info btn-lg" routerLink='/'>
        Return to home pgage
      </button>
    </div>

  `,
  styleUrls: ['./not-found.component.scss'],
  standalone: true,
  imports: [
    RouterLink
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotFoundComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
