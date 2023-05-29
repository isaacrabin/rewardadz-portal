import { CampaignService } from './../../../../core/services/campaign.service';
import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ThemeService } from 'src/app/core/services/theme.service';
import { ChartOptions } from 'src/app/shared/models/chart-options';
import { ClicksData } from '../../models/analytics';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: '[app-campaign-clicks]',
  templateUrl: './campaign-clicks.component.html',
  styleUrls: ['./campaign-clicks.component.scss']
})
export class CampaignClicksComponent implements OnInit{
  @Input() clickInfo: any;
  public chartOptions!: Partial<ChartOptions>;
  private subscription: Subscription = new Subscription();

  rows = [];
  totalPrimaryCampaigns = 0;
  activeCampaign = 0;
  myCampaignAddress = '';
  overalReach: any;
  conversion_rate: any;
  overalEngagements: any;
  overalClick: any;
  clickLabels: any;
  maxClicks: string = '';

  constructor(
    private themeService: ThemeService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private router: Router,
    private campaignService: CampaignService
    ) {
    this.chartOptions = {
      series: [
        {
          name: "Clicks",
          data:  []
        }
      ],
      chart: {
        height: 350,
        type: "bar"
      },

      plotOptions: {
        bar: {
          // horizontal: true,
        }
      },
      colors: ["#16a34a"],
            xaxis: {
        categories: [],
        labels: {
          show: true,
        },
      },

      tooltip: {
        theme: 'light',
        y: {
          formatter: function (val) {
            return val + '';
          },
        },
      },
    };





  }

  ngOnInit(): void {
   this.fetchAllPrimaryCampaigns();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  //Request to fetch all primary campaigns
  fetchAllPrimaryCampaigns(){
    this.spinner.show()
    // this.fetchAllMobileCustomers();
    this.campaignService.getPrimaryCampaigns().subscribe({
      next: (resp) => {
        this.spinner.hide()
        if(resp.success == true){
          this.rows = resp.data
          this.totalPrimaryCampaigns = this.rows.length;
          let activeStatus =this.rows.filter((data: any) => data.status === true);
          this.activeCampaign = activeStatus.length;
          var performance = [];
          performance = this.rows.filter((data: any) => data.performance && data.status === true);
          //  this.myCampaignAddress = performance[0].details._id
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

          this.maxClicks = Math.max(...adPerformanceValue).toLocaleString();
          this.chartOptions = {
            series: [
              {
                name: "Clicks",
                data:  adPerformanceValue
              }
            ],
            chart: {
              height: 350,
              type: "bar"
            },

            plotOptions: {
              bar: {
                // horizontal: true,
              }
            },
            colors: ["#16a34a"],
                  xaxis: {
              categories: performanceName,
              labels: {
                show: true,
              },
            },

            tooltip: {
              theme: 'light',
              y: {
                formatter: function (val) {
                  return val + '';
                },
              },
            },
          };
         }
        else{
          this.spinner.hide()
          this.toastr.error("Error fetching campaigns","")
        }
      },
      error:(err) =>{
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
      })

  }
}



