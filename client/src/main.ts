import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { environment } from './environments/environment';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.route';
import { ToastrModule } from 'ngx-toastr';
import { RouterModule } from '@angular/router';
import { jwtInterceptor } from './app/shared/interceptors/jwt.interceptor';
import { errorInterceptor } from './app/shared/interceptors/error.interceptor';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom([
      RouterModule.forRoot(routes),
      ToastrModule.forRoot({
        positionClass: "toast-bottom-right",
        preventDuplicates: true,
      }),
      TabsModule.forRoot(),
      BsDropdownModule.forRoot()
    ]),
    provideHttpClient(
      withInterceptors([jwtInterceptor, errorInterceptor])
    ),
  ],
}).catch(console.error);
