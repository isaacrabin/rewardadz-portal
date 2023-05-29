import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CampaignService {

  private _activeAds = new BehaviorSubject<number>(0);

  constructor(
    private http: HttpClient
  ) { }

  get activeAds$() {
    return this._activeAds.asObservable().pipe(

    );
  }

  setActiveAds(count: number){
    this._activeAds.next(this._activeAds.value + count);
  }

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

  walletInfo(id: any){
    const address  = id
    return this.http.get<any>(
      `${environment.baseurl}wallet/details/${address}`
    );
  }

  deleteCampaign(campaignDetailsID: any,payload: any){
    const address  = campaignDetailsID
    return this.http.delete<any>(
      `${environment.baseurl}campaigns/delete/campaign/${address}`,payload
    );

  }

  addQuestionaire(id:any,payload: any){
    const address  = id
    return this.http.post(
      // `${environment.baseurl}campaigns/questions/add/${address}`,payload
      `${environment.baseurl}campaigns/questions/add/${address}`,payload

    );
  }
}
