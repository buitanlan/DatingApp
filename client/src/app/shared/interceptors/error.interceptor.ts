import { catchError, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const toastr = inject(ToastrService);
  return next(req).pipe(
    catchError(error => {
      if (error) {
        switch (error.status) {
          case 400:
            if (error.error.errors) {
              const modalStateErrors = [];
              for (const key in error.error.errors) {
                if (error.error.errors[key]) {
                  modalStateErrors.push(error.error.errors[key]);
                }
              }
              throw modalStateErrors.flat();
            } else if (typeof(error.error) === 'object'){
              toastr.error(error.statusTest, error.error);
            }
            else {
              toastr.error(error.statusText, error.status);
            }
            break;

          case 401:
            toastr.error(error.statusText, error.status);
            break;
          case 404:
            router.navigateByUrl('/not-found');
            break;
          case 500:
            router.navigateByUrl('/server-error');
            break;
          default:
            toastr.error('Something unexpected went wrong');
            console.log(error);
            break;
        }
      }
      return throwError(error);
    })
  );
}

