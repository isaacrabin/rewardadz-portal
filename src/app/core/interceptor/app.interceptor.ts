import {Injectable} from "@angular/core";
import {HTTP_INTERCEPTORS, HttpHandler, HttpInterceptor, HttpRequest, HttpHeaders} from "@angular/common/http";


const TOKEN_HEADER_KEY = 'Authorization';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {
  }



  intercept(req: HttpRequest<any>, next: HttpHandler) {
    let authReq = req;
    const token = 'Bearer ' + sessionStorage.getItem("token");
    authReq = req.clone({headers: req.headers.set(TOKEN_HEADER_KEY, token).set('Content-Type', 'application/json')});
    // console.log('Intercepted HTTP call', authReq);
    return next.handle(authReq);
  }
}

export const httpInterceptorProviders = [
  {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
];
