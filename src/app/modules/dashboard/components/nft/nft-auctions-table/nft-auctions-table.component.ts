import { Component, OnInit } from '@angular/core';
import { Campaign, Nft } from '../../../models/nft';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CampaignService } from 'src/app/core/services/campaign.service';
import { MouseEvent } from '@agm/core';

@Component({
  selector: '[nft-auctions-table]',
  templateUrl: './nft-auctions-table.component.html',
})
export class NftAuctionsTableComponent implements OnInit {
  public activeAuction: Campaign[] = [];

  rows = [];
  totalPrimaryCampaigns = 0;
  activeCampaign = 0;
  myCampaignAddress = '';
  overalReach: any;
  conversion_rate: any;
  overalEngagements: any;
  overalClick: any;
  clickLabels: any;
  allcoords: any;
  gradient: any = []

  viewMap = false;





  public map!: google.maps.Map;
  private heatmap!: google.maps.visualization.HeatmapLayer;

  lat = -1.2344;
  long = 36.456;
  lat_lng = new Array();

  constructor(
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private campaignService: CampaignService
  ) {
    this.gradient = [
      'rgba(0, 255, 255, 0)',
      'rgba(0, 255, 255, 1)',
      'rgba(0, 191, 255, 1)',
      'rgba(0, 127, 255, 1)',
      'rgba(0, 63, 255, 1)',
      'rgba(0, 0, 255, 1)',
      'rgba(0, 0, 223, 1)',
      'rgba(0, 0, 191, 1)',
      'rgba(0, 0, 159, 1)',
      'rgba(0, 0, 127, 1)',
      'rgba(63, 0, 91, 1)',
      'rgba(127, 0, 63, 1)',
      'rgba(191, 0, 31, 1)',
      'rgba(255, 0, 0, 1)'
    ]

  }

  ngOnInit(): void {
    this.fetchAllPrimaryCampaigns();
  }


   //Request to fetch all primary campaigns
   fetchAllPrimaryCampaigns(){
    this.spinner.show()
    // this.fetchAllMobileCustomers();
    this.campaignService.getPrimaryCampaigns().subscribe((resp:any) =>{
      this.spinner.hide()
     if(resp.success == true){
       this.rows = resp.data
       this.totalPrimaryCampaigns = this.rows.length;
       let activeStatus =this.rows.filter((data: any) => data.status === true);
       this.activeCampaign = activeStatus.length;
       var performance = [];
       performance = this.rows.filter((data: any) => data.performance && data.status === true);
       var details = performance.filter((data: any) => data.details);
       var result = details.map(function(a: any) {return a.details;});
       var budget = details.map(function(a: any) {return a.details;});
       const performanceName = result.map(function(a) {return a.name;});
       var adPerformance = details.map(function(a: any) {return a.performance;});
       var geolocation = adPerformance.map(function(a){return a.location})
       this.allcoords = Array.prototype.concat.apply([], geolocation);
       var adPerformanceValue = adPerformance.map(function(a) {return a.total_clicks;});
       var impressions = adPerformance.map(function(a) {return a.total_impressions;});
       for (var i = 0; i < impressions.length; i++) {
        this.overalReach += impressions[i]}
       var conversions = adPerformance.map(function(a) {return a.total_conversions;});
       for (var i = 0; i < conversions.length; i++) {
        this.overalEngagements += conversions[i] }
       var female = adPerformance.map(function(a) {return a.female})
       var totalFemale = 0;
      for (var i = 0; i < female.length; i++) {
      totalFemale += female[i] }
      var totalClicks = adPerformance.map(function(a) {return a.total_clicks;});
      this.conversion_rate = Math.ceil((this.overalEngagements/this.overalReach)*100)
      for (var i = 0; i < totalClicks.length; i++) {
      this.overalClick += totalClicks[i] }
      let campaignClicks = [];
      campaignClicks.push({ name: performanceName, value: totalClicks});
      var male = adPerformance.map(function(a) {return a.male})
      var totalMale = 0;
      for (var i = 0; i < male.length; i++) {
      totalMale += male[i] }
      this.clickLabels = {performanceName,adPerformanceValue};


  }
     else{
      this.spinner.hide()
      this.toastr.error("Error fetching campaigns","")
     }

    })

  }

  onMapLoad(mapInstance: google.maps.Map) {
    this.map = mapInstance;
    this.viewMap = true;
    // here our in other method after you get the coords; but make sure map is loaded
    for (var i = 0; i < this.allcoords.length; i++) {
      const coordi = this.allcoords[i];
      var myLatlng = new google.maps.LatLng(coordi.lat, coordi.long);
      this.lat_lng.push(myLatlng);
    }
    const coords: google.maps.LatLng[] = this.lat_lng;
    this.heatmap = new google.maps.visualization.HeatmapLayer({
       map: this.map,
       data: coords
    });
    this.heatmap.setMap(this.map);
    this.heatmap.set('gradient', this.heatmap.get('gradient') ? null : this.gradient);
     }



  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`)
  }



}


// just an interface for type safety.
interface marker {
	lat: number;
	lng: number;
	label?: string;
	draggable: boolean;
}
