/* eslint-disable max-len */
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  // If you want to some exclude api call from Encryption then add here like that
  excludeURLList = [];

  constructor(

    ) { }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const token = sessionStorage.getItem('token');
    if (!token) {
      return next.handle(request).pipe(
        map((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            sessionStorage.setItem(
              'token',
              event.headers.get('Authorization')?? '{}'
            );
          }
          return event;
        })
      );
    }

    const req1 = request.clone({
      headers: request.headers.set('Authorization', `Bearer ${token}`),
    });

    return next.handle(req1).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          if (event.headers.get('Authorization') !== null) {
            sessionStorage.setItem('token',event.headers.get('Authorization')?? '{}');
          }
        }
        return event;
      }),
    );
  }
}
