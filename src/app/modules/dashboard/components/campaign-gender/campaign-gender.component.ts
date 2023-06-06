import { Component, OnInit, ViewChild } from "@angular/core";
import { ChartComponent } from "ng-apexcharts";

import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart,
  ApexDataLabels,
  ApexLegend,
  ApexStroke,
  ApexPlotOptions,
  ApexStates,
  ApexTheme,
  ApexTitleSubtitle
} from "ng-apexcharts";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import { CampaignService } from "src/app/core/services/campaign.service";

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  fill: any;
  stroke: ApexStroke;
  states: ApexStates;
  legend: ApexLegend;
  title: ApexTitleSubtitle;
  theme: ApexTheme;
  plotOptions: ApexPlotOptions;
  dataLabels: ApexDataLabels;
};

@Component({
  selector: '[app-campaign-gender]',
  templateUrl: './campaign-gender.component.html',
  styleUrls: ['./campaign-gender.component.scss']
})
export class CampaignGenderComponent implements OnInit{
  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  rows = [];
  totalPrimaryCampaigns = 0;
  activeCampaign = 0;
  myCampaignAddress = '';
  overalReach: any;
  conversion_rate: any;
  overalEngagements: any;
  overalClick: any;
  clickLabels: any;
  dataLength = 0;


  constructor(
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private campaignService: CampaignService
  ) {
    const data = [40, 55]
    this.chartOptions = {
      series: [],
      chart: {
        width: 450,
        type: "donut"
      },
      dataLabels: {
        enabled: true
      },
      fill: {
        type: "solid",
        colors:["#ed7014", "#1e40af"]

      },
      labels: ["Male", "Female"],

      legend: {
        position:'bottom',
        formatter: function(val, opts) {
          return val + " - " + opts.w.globals.series[opts.seriesIndex];
        }
      },
      responsive: [
        {
          breakpoint: 400,
          options: {
            chart: {
              width: 150
            },
            legend: {
              position: "top"
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
       const allcoords = Array.prototype.concat.apply([], geolocation);
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

      if(totalFemale === 0 && totalMale === 0){
        this.dataLength = 0;
      }
      else{
        this.dataLength = 1;
      //Plot the gender graph
      this.chartOptions = {
        series: [totalMale, totalFemale],
        chart: {
          width: 450,
          type: "donut"
        },
        dataLabels: {
          enabled: true
        },
        fill: {
          type: "solid",
          colors:["#ed7014", "#1e40af"]

        },
        labels: ["Male", "Female"],

        legend: {
          position:'bottom',
          formatter: function(val, opts) {
            return val + " - " + opts.w.globals.series[opts.seriesIndex];
          }
        },
        responsive: [
          {
            breakpoint: 400,
            options: {
              chart: {
                width: 150
              },
              legend: {
                position: "top"
              }
            }
          }
        ]

      };
      }
  }
     else{
      this.spinner.hide()
      this.toastr.error("Error fetching campaigns","")
     }

    })

  }
}
