import { Component, Input, Output } from '@angular/core';
import { Campaign, Nft } from '../../models/nft';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CampaignService } from 'src/app/core/services/campaign.service';

@Component({
  selector: 'app-secondary-campaigns',
  templateUrl: './secondary-campaigns.component.html',
  styleUrls: ['./secondary-campaigns.component.scss']
})
export class SecondaryCampaignsComponent {
  public rows: Campaign[] = [];

  noCampaign: any;

  page = {
    currentPage:1,
    collectionSize:0,
    pageSize:10
  };


  constructor(
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private service: CampaignService,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.getAllCampaigns();
  }

  getAllCampaigns(){
    this.spinner.show()
    const userId = sessionStorage.getItem('userId');
    this.service.getPrimaryCampaigns().subscribe({
      next: (response) => {
        if(response.success === true){
       this.spinner.hide()
       let campaignlist = response.data
       this.rows = campaignlist.reverse();
       this.page.collectionSize = this.rows.length;
       this.noCampaign = this.rows.length;

     }
     else{
       this.spinner.hide()
       this.toastr.error("Error fetching campaigns","")
     }
      },
      error: (err) => {
      if(err.status === 403){
        this.toastr.info("Your session expired","");
        this.router.navigate(['./auth/login']);
      }
      if(err.status === 401){
        this.toastr.info("Contact your admin for access to this page","");
        this.router.navigate(['/dashboard/analytics']);
      }
      }
  });

  }
}
