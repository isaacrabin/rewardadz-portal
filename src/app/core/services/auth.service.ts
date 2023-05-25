import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AsyncValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, catchError, delay, map, of, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginRequest, RegisterRequest } from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthorized ="active";
  takenUsernames = ['hello', 'world', 'username'];

  constructor(
    private http: HttpClient,
    private router: Router
    ) { }

    isAuthenticated(): boolean {
      return sessionStorage.getItem('isAuthorized') == 'active';
    }



  loginUser(payload: LoginRequest): Observable<any>  {
    sessionStorage.setItem('isAuthorized',this.isAuthorized);
    return this.http.post(
      `${environment.baseurl}auth/signin`,
      payload
    )
  }

  registerUser(payload: RegisterRequest){
    sessionStorage.setItem('isAuthorized',this.isAuthorized)
    return this.http.post(
      `${environment.baseurl}auth/signup`,
      payload
    );

  }

  createPassword(payload: any){
    return this.http.post(
      `${environment.baseurl}organization/create`,
      payload
    );
  }





  addOrganization(payload: any){
    sessionStorage.setItem('isAuthorized',this.isAuthorized)
    return this.http.post(
      `${environment.baseurl}organization/create`,
      payload
    );
  }


  getKycOrgAddress(payload: any){
    sessionStorage.setItem('isAuthorized',this.isAuthorized)
    return this.http.post(
      `${environment.baseurl}organization/details/information/details`,
      payload
    );
  }

  kycStep1(id: any,payload: any){
    const address  = id
    sessionStorage.setItem('isAuthorized',this.isAuthorized)
    return this.http.post(
      `${environment.baseurl}organization/details/information/files/cr12/${address}`,
      payload,
      {
        reportProgress: true,
        observe: 'events'
      }).pipe(
        catchError(this.errorMgmt)
    )

  }

  kycStep2(id: any,payload: any){
    const address  = id
    sessionStorage.setItem('isAuthorized',this.isAuthorized)
    return this.http.post(
      `${environment.baseurl}organization/details/information/files/kraPIN/${address}`,
      payload,
      {
        reportProgress: true,
        observe: 'events'
      }).pipe(
        catchError(this.errorMgmt)

    );
  }

  forgorPassword(payload: any){
    sessionStorage.setItem('isAuthorized',this.isAuthorized)
    return this.http.post(
      `${environment.baseurl}auth/forgot/password`,
      payload
    );

  }

  logoutUser() {
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("isAuthorized");
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("org");
    sessionStorage.removeItem("profile");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("walletId");
    sessionStorage.removeItem("campaignAddress");
    sessionStorage.removeItem("addressForQuestionaire");
    sessionStorage.removeItem("newCampaignType");
    this.router.navigate(["/auth/login"]);
  }


  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

}
