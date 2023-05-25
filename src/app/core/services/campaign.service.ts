import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CampaignService {

  constructor(
    private http: HttpClient
  ) { }

  getPrimaryCampaigns(){
    // const address  = id
    return this.http.get<any>(
      `${environment.baseurl}campaigns/search/primary`
    );
  }

  getAllCustomers(){
    return this.http.get<any>(
      `${environment.adminurl}mobile/accounts`
    );
  }
}
