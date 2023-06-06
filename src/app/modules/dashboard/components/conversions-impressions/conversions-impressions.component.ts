import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartComponent } from 'ng-apexcharts';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CampaignService } from 'src/app/core/services/campaign.service';

//import { ChartOptions } from 'src/app/shared/models/chart-options';


import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart,
  ApexStroke,
  ApexFill
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  colors: any;
  stroke: ApexStroke;
  fill: ApexFill;
};

@Component({
  selector: '[app-conversions-impressions]',
  templateUrl: './conversions-impressions.component.html',
  styleUrls: ['./conversions-impressions.component.scss']
})
export class ConversionsImpressionsComponent implements OnInit {
  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  dataLength  = 0;

  userId : string = '';
  loading = false;
  totalPrimaryCampaigns = 0;
  accountBalance = "";
  performance: any  = [];
  performanceName: any;
  overalClick = 0;
  overalReach = 0;
  overalEngagements = 0;
  rows = [];
  totalSecondaryCampaigns: any;
  activeCampaign :any;
  activeStatus: any;
  allcoords:any = [];
  gradient = [];
  mobileUsers= [];
  myCampaignAddress: string = ''
  conversion_rate = 0;

constructor(
  private spinner: NgxSpinnerService,
  private toastr: ToastrService,
  private campaignService: CampaignService
) {



    this.chartOptions = {
      series: [14, 23],
      chart: {
        type: "polarArea"
      },

      stroke: {
        colors: ["#fff"]
      },
      colors:["#ed7014", "#1e40af"],
      fill: {
        opacity: 0.8,
        colors:["#ed7014", "#1e40af"],
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
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
       this.activeStatus =this.rows.filter((data: any) => data.status === true);
       this.activeCampaign =this.activeStatus.length;
       this.performance = this.rows.filter((data: any)=> data.performance && data.status === true);
       this.myCampaignAddress = this.performance[0].details._id
       var details = this.performance.filter((data: any)=> data.details);
       var result = details.map(function(a: any) {return a.details;});
       var budget = details.map(function(a: any) {return a.details;});
       this.performanceName = result.map(function(a: any) {return a.name;});
       var adPerformance = details.map(function(a: any) {return a.performance;});
       var geolocation = adPerformance.map(function(a: { location: any; }){return a.location})
       this.allcoords = Array.prototype.concat.apply([], geolocation);
       var adPerformanceValue = adPerformance.map(function(a: { total_clicks: any; }) {return a.total_clicks;});
       var impressions = adPerformance.map(function(a: { total_impressions: any; }) {return a.total_impressions;});
       for (var i = 0; i < impressions.length; i++) {
        this.overalReach += impressions[i]}
       var conversions = adPerformance.map(function(a: { total_conversions: any; }) {return a.total_conversions;});
       for (var i = 0; i < conversions.length; i++) {
        this.overalEngagements += conversions[i] }
       var female = adPerformance.map(function(a: { female: any; }) {return a.female})
       var totalFemale = 0;
      for (var i = 0; i < female.length; i++) {
      totalFemale += female[i] }
      var totalClicks = adPerformance.map(function(a: { total_clicks: any; }) {return a.total_clicks;});
      this.conversion_rate = Math.ceil((this.overalEngagements/this.overalReach)*100)
      for (var i = 0; i < totalClicks.length; i++) {
      this.overalClick += totalClicks[i] }
      let campaignClicks = [];
      campaignClicks.push({ name: this.performanceName, value: totalClicks});
      var male = adPerformance.map(function(a: { male: any; }) {return a.male})
      var totalMale = 0;
      for (var i = 0; i < male.length; i++) {
      totalMale += male[i] }
      const cdata = this.overalReach;
      this.dataLength = cdata;

      this.chartOptions = {
        series: [this.overalReach,this.overalEngagements],
        chart: {
          type: "polarArea"
        },
        stroke: {
          colors: ["#fff"]
        },
        colors:["#ed7014", "#1e40af"],
        fill: {
          opacity: 0.8,
          colors:["#ed7014", "#1e40af"],
        },
        labels:['Impressions','Conversions'],
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 400
              },
              legend: {
                position: "bottom"
              }
            }
          }
        ]
      };

      //Plot the gender graph
      // this.chartOptions = {
      //   series: [
      //     {

      //       data: [this.overalReach,this.overalEngagements]
      //     }
      //   ],
      //   chart: {
      //     type: "bar",
      //     height: 430
      //   },
      // colors:['#fd7e14','#fff'],

      //   plotOptions: {
      //     bar: {
      //       horizontal: true,
      //       dataLabels: {
      //         position: "top"
      //       }
      //     }
      //   },


      //   dataLabels: {
      //     enabled: true,
      //     offsetX: -6,
      //     style: {
      //       fontSize: "12px",
      //       colors: ["#fff"]
      //     }
      //   },
      //   stroke: {
      //     show: true,
      //     width: 1,
      //     colors: ["#fff"]
      //   },
      //   xaxis: {
      //     categories: ['Impression', 'Convertion']
      //   },

      // };
  }
     else{
      this.spinner.hide()
      this.toastr.error("Error fetching campaigns","")
     }

    })

  }
}
