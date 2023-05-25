import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(
    private http: HttpClient
  ) { }

  walletTransactions(id: any){
    const address  = id
    return this.http.get<any>(
      `${environment.baseurl}wallet/transactions/${address}`
    );

  }
}
