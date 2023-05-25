import { ToastrService } from 'ngx-toastr';
import { Component, Input, OnInit } from '@angular/core';
import { Campaign, Nft } from '../../models/nft';
import { NgxSpinnerService } from "ngx-spinner";
import { CampaignService } from 'src/app/core/services/campaign.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-primary-campaigns',
  templateUrl: './primary-campaigns.component.html',
  styleUrls: ['./primary-campaigns.component.scss']
})
export class PrimaryCampaignsComponent implements OnInit {
  public activeAuction: Nft[] = [];

  rows = [];

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
    this.getAllPrimaryCampaigns()
  }



  getAllPrimaryCampaigns(){
    this.spinner.show()
    const userId = sessionStorage.getItem('userId');
    this.service.getPrimaryCampaigns().subscribe({
      next: (response) => {
        if(response.success === true){
       this.spinner.hide()
       let campaignlist = response.data
       this.rows = campaignlist.reverse();
       console.log(this.rows)
       this.page.collectionSize = this.rows.length;
       this.noCampaign = this.rows.length;

     }
     else{
      // this.loading = false
      this.spinner.hide()
       this.toastr.error("Error fetching campaigns","")
     }
      },
      error: (err) => {
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
