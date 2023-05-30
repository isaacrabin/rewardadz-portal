import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }


  newStep1(id:any, payload: any){
    const address  = id
    return this.http.post(
      `${environment.baseurl}campaigns/create/step1/${address}`,
      payload
    )
  }
  newStep2(id:any, payload: any){
    const address  = id
    return this.http.post(
      `${environment.baseurl}campaigns/create/step2/${address}`,
      payload
    )

  }

  newStep21(payload: FormData,id:any):Observable<any> {
    const address  = id
    return this.http.post(
      `${environment.baseurl}campaigns/create/step2/icon/${address}`,payload,
      {
        reportProgress: true,
        observe: 'events'
      }).pipe(
        catchError(this.errorMgmt)

    );
  }

  uploadFile(file: File, address: any) {
    const formData = new FormData();
    formData.append('file', file);
    const headers = new HttpHeaders({
      'Content-Type': file.type
    });

    return this.http.post( `${environment.baseurl}campaigns/create/step2/icon/${address}`, formData,{headers});
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
    return throwError(errorMessage);
  }

  newStep22(payload: FormData,id:any,): Observable<any> {
    const address  = id
    return this.http.post(
      `${environment.baseurl}campaigns/create/step2/file/${address}`, payload,
      {
        reportProgress: true,
        observe: 'events'
      }).pipe(
        catchError(this.errorMgmt)
    );
  }
  newStep3(id:any,payload: any){
    const address  = id
    return this.http.post(
      `${environment.baseurl}campaign/metrics/setup/${address}`,payload
    );
  }
  newStep4(id:any, payload:any){
    const address  = id
    return this.http.post(
      `${environment.baseurl}campaigns/create/step3/${address}`,payload
    );
  }

  fetchCampaignById(id: any){
    const address  = id
    return this.http.get<any>(
      `${environment.baseurl}campaigns/search/details/${address}`
    );

  }

  completeAndPublish(id:any, payload:any){
    const address  = id
    return this.http.post(
      `${environment.baseurl}schedule/campaign/${address}`,payload
    );
  }

  addLocationSetup(id:any,payload: any){
    const address  = id
    return this.http.patch(
      `${environment.baseurl}campaign/metrics/add/location/${address}`,payload
    );
  }
}
