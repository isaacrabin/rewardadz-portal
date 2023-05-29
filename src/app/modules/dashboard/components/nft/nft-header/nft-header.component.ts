import { Component, OnInit } from '@angular/core';
import { CampaignService } from 'src/app/core/services/campaign.service';

@Component({
  selector: 'app-nft-header',
  templateUrl: './nft-header.component.html',
})
export class NftHeaderComponent implements OnInit {

  userId = '';
  accountBalance: any;
  activeAds = this.campaignService.activeAds$;

  constructor(
    private campaignService: CampaignService,
  ) {
  //  this.activeAds = this.campaignService.activeAds$;
  //  console.log('ASD',this.activeAds)
  }

  ngOnInit(): void {
    this.getWalletDetails();
  }

  getWalletDetails(){
    this.userId = sessionStorage.getItem('userId')?? '{}';
    this.campaignService.walletInfo(this.userId).subscribe((resp: any) => {
      var comafy = Math.ceil(resp.data.balance);
      this.accountBalance = comafy.toLocaleString();
      sessionStorage.setItem('walletId',resp.data._id);
    })
  }
}
