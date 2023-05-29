import { ToastrService } from 'ngx-toastr';
import { Component, Input, OnInit } from '@angular/core';
import { Campaign, Nft } from '../../models/nft';
import { NgxSpinnerService } from "ngx-spinner";
import { CampaignService } from 'src/app/core/services/campaign.service';
import { Router } from '@angular/router';
import { Carousel, Dropdown, initTE, Modal,Ripple } from 'tw-elements';

@Component({
  selector: 'app-primary-campaigns',
  templateUrl: './primary-campaigns.component.html',
  styleUrls: ['./primary-campaigns.component.scss']
})
export class PrimaryCampaignsComponent implements OnInit {
  public activeAuction: Nft[] = [];

  rows: any = [];

  noCampaign: any;
  activeCampaign: any;

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
    this.getAllPrimaryCampaigns();
    initTE({ Carousel, Dropdown,Modal,Ripple });
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
       this.page.collectionSize = this.rows.length;
       const activeStatus =this.rows.filter((data: any) => data.status === true);
       this.activeCampaign = activeStatus.length;
       this.service.setActiveAds(this.activeCampaign);
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
      else if(err.status === 401){
        this.toastr.info("Contact your admin for access to this page","");
        this.router.navigate(['/app/dashboard/analytics']);
      }
      else{
        this.toastr.error("Error: ",err);
      }
      }
  });

  }

}
