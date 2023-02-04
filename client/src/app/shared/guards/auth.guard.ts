import { inject } from '@angular/core';
import { map } from 'rxjs/operators';
import { AccountService } from '../services/account.service';
import { ToastrService } from 'ngx-toastr';


export const authGuard = () => {
  const toastr = inject(ToastrService);
  const accountService = inject(AccountService);
  return accountService.currentUser$.pipe(
    map((auth) => {
      if (!auth) {
        toastr.error('You shall not pass !');
      }
      return !!auth;
    }),
  );
}
