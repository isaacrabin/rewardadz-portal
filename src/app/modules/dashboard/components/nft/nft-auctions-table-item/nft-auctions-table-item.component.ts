import { initTE } from 'tw-elements';
import { Component, Input, OnInit } from '@angular/core';
import { Campaign, Nft } from '../../../models/nft';
import {Button} from 'tw-elements'
import { CampaignService } from 'src/app/core/services/campaign.service';
import { ToastrService } from 'ngx-toastr';
import { setTimeout } from 'timers';
import { Router } from '@angular/router';

@Component({
  selector: '[nft-auctions-table-item]',
  templateUrl: './nft-auctions-table-item.component.html',
})
export class NftAuctionsTableItemComponent implements OnInit {
  @Input() auction = <Campaign>{};

  showdeleteModal = false;
  loading = false;
  selectedCampaignId = '';



  constructor(
    private service: CampaignService,
    private toastr: ToastrService,
    private router:Router
  ) {
  }

  ngOnInit(): void {
    initTE({Button})
  }

  openDelModal(val: any){
    this.selectedCampaignId = val._id;
    this.showdeleteModal = true;
  }

  removeCampaign(){
    this.loading = true;
    const payload = {}
    this.service.deleteCampaign(this.selectedCampaignId,payload).subscribe((resp: any) =>{
      this.loading = false;
      this.toastr.success('Deleted successfully','');
      this.showdeleteModal = false;
      window.location.reload();
    })
  }

  hideDelModal(){
    this.showdeleteModal = false;
  }

  viewInfo(val: any){
    sessionStorage.setItem('selectedLocation',JSON.stringify(val.performance.location));
    sessionStorage.setItem('selectedID',val._id);
    sessionStorage.setItem('selectedType',val.type);
    sessionStorage.setItem('selectedWalletID',val.network.primary);
    this.router.navigate([`app/dashboard/campaign-info/${val._id}`]);
  }

  editInfo(id: string){
    this.router.navigate([`app/dashboard/edit-campaign/${id}`]);
  }

  addQuiz(id: string){
    this.router.navigate([`app/dashboard/campaign-questions/${id}`]);
  }

}
