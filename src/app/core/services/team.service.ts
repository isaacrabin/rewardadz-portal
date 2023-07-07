import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  teamMembers = [];

  constructor(private http: HttpClient) { }

  getTeamMembers(id: any){
    const address  = id
    return this.http.get<any>(
      `${environment.baseurl}usermanagement/get/users/${address}`,
    );
  }


  getOrgRoles(id: any){
    const address  = id
    return this.http.get<any>(
      `${environment.baseurl}roles/${address}`,
    );
  }

  addOrgUser(id: any,payload: any){
    const address  = id
    return this.http.post<any>(
      `${environment.baseurl}usermanagement/add/new/user/${address}`,payload
    );
  }
}
