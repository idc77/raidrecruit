import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse} from '@angular/common/http';
import {OAuthService} from 'angular-oauth2-oidc';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router, private oauthService: OAuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authreq = req.clone({setHeaders: {'Authorization': 'Bearer ' + this.oauthService.getAccessToken()}});
    return next.handle(authreq).pipe(tap((event: HttpEvent<any>) => {
    }, (err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
          this.oauthService.initImplicitFlow();
        }
      }
    }));
  }

}
