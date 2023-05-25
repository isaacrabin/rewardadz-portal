import { Component, Input, OnInit } from '@angular/core';
import { Campaign, Nft } from '../../../models/nft';

@Component({
  selector: '[nft-auctions-table-item]',
  templateUrl: './nft-auctions-table-item.component.html',
})
export class NftAuctionsTableItemComponent implements OnInit {
  @Input() auction = <Campaign>{};


  constructor() {
    console.log('Auction',this.auction)
  }

  ngOnInit(): void {}
}
