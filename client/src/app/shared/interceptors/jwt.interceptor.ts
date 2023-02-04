import { inject } from '@angular/core';
import { take } from 'rxjs/operators';
import { AccountService } from '../services/account.service';
import { HttpInterceptorFn } from '@angular/common/http';


export const jwtInterceptor: HttpInterceptorFn = (request, next) => {
  const accountService = inject(AccountService)

  accountService.currentUser$.pipe(take(1)).subscribe((user) => {
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${user?.token}`
      }
    })
  });
  return next(request);
}
