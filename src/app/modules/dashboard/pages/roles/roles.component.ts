import { Component, OnInit } from '@angular/core';
import { Campaign, Nft } from '../../models/nft';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { TeamService } from 'src/app/core/services/team.service';
import { Role } from '../../models/role';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit{
  public rows: Role[] = [];
  noTeam = false;


  constructor(
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private service: TeamService,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.getAll();
  }


  getAll(){
    this.spinner.show()
    const userId = sessionStorage.getItem('userId');
    this.service.getOrgRoles(userId).subscribe({
      next: (resp) => {
        this.spinner.hide()
        switch (resp.success) {
          case true:
            this.rows = resp.data;
            const totalUsers = this.rows.length;
            if(totalUsers === 0){
              this.noTeam = true;
            }
            break;

          case false:
            this.rows = resp.data;
            this.service.teamMembers = resp.data;
            const totalUser = this.rows.length;
            if(totalUser === 0){
              this.noTeam = true;
            }
            break;

          default:
            this.toastr.error('Error occured. Try again later.')
            break;      }
      },
      error: (err) => {
        this.spinner.hide()
      if(err.status === 403){
        this.toastr.info("Your session expired","");
        this.router.navigate(['./auth/sign-in']);
      }
      if(err.status === 401){
        this.toastr.info("Contact your admin for access to this page","");
        this.router.navigate(['/dashboard/analytics']);
      }
      }
  });

  }

}
