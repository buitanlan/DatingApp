import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-server-error',
  template: ``,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ServerErrorComponent {
  readonly router = inject(Router);

  navigation = this.router.getCurrentNavigation();
  error = this.navigation?.extras?.state!['error'];


}
