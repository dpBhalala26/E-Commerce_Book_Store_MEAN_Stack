import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { throwErrorIfAlreadyLoaded } from './utils/module-import-guard';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthHeaderInterceptorService } from './interceptor/auth-header-interceptor.service';
import { HttpErrorInterceptorService } from './interceptor/http-error-interceptor.service';

@NgModule({
  declarations: [],
  imports: [CommonModule, CoreRoutingModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHeaderInterceptorService,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptorService,
      multi: true
    },

  ],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwErrorIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
