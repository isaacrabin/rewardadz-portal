import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CampaignService } from 'src/app/core/services/campaign.service';
import { Team } from '../../models/team';
import { TeamService } from 'src/app/core/services/team.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit{
  public rows: Team[] = [];

  profileInfo: any;
  orgId = '';
  users = [];
  noTeam = false;
  closeResult: string | undefined;
  userToRemove = '';
  emailToRemove = '';
  loading = false;
  roleInfo: any;


  selectedRoleId = '';


  page = {
    currentPage:1,
    collectionSize:0,
    pageSize:10
  };


  constructor(
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private service: TeamService,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.getAllPrimaryCampaigns()
  }



  getAllPrimaryCampaigns(){
    this.spinner.show()
    const userId = sessionStorage.getItem('userId');
    this.service.getTeamMembers(userId).subscribe({
      next: (response) => {
        if(response.success === true){
        this.spinner.hide()
        this.profileInfo = response.data;
        this.rows = response.data;
        this.service.teamMembers = response.data;
        const totalUsers = this.profileInfo.length;
        if(totalUsers === 0){
          this.noTeam = true;
        }
     }
     else{
      // this.loading = false
      this.noTeam = true;
      this.spinner.hide()
      //  this.toastr.error(response.message,"")
     }
      },
      error: (err) => {
        this.spinner.hide()
      if(err.status === 403){
        this.toastr.info("Your session expired","");
        this.router.navigate(['./auth/sign-in']);
      }
      else if(err.status === 401){
        this.toastr.info("Contact your admin for access to this page","");
        this.router.navigate(['/dashboard/analytics']);
      }
      else if(err.status === 400){
        this.noTeam = true;
        this.toastr.warning(err.error.message,"");
      }
      }
  });

  }

  getAll(){
    this.spinner.show();
    this.service.getTeamMembers(this.orgId).subscribe({
      next: (resp) => {
      this.spinner.hide();
      switch (resp.success) {
        case true:
          this.profileInfo = resp.data;
          this.service.teamMembers = resp.data;
          const totalUsers = this.profileInfo.length;
          if(totalUsers === 0){
            this.noTeam = true;
          }
          break;

        case false:
          this.spinner.hide();
          this.profileInfo = resp.data;
          this.service.teamMembers = resp.data;
          const totalUser = this.profileInfo.length;
          this.noTeam = true;
          if(totalUser === 0){
            this.noTeam = true;
          }
          break;

        default:
          this.toastr.error('Error occured. Try again later.')
          break;      }

    },
    error:(err) =>{
      console.log(err)
      this.spinner.hide();
      this.toastr.error('Error while fetching team. Try again later.')
    }
  })
  }
}
