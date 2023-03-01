import { ChangeDetectionStrategy, Component } from '@angular/core';
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
  standalone: true,
  imports: [
    RouterLink
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotFoundComponent {

}
