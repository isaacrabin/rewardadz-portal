import { Component, OnInit, ViewChild } from '@angular/core';
import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart,
  ApexPlotOptions,
  ApexLegend,
  ApexGrid,
  ChartComponent,
} from "ng-apexcharts";
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CampaignService } from 'src/app/core/services/campaign.service';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: any;
  colors:any;
  legend: ApexLegend;
  responsive: ApexResponsive[];
  plotOptions: ApexPlotOptions;
  grid: ApexGrid
};

@Component({
  selector: '[app-age-breakdown]',
  templateUrl: './age-breakdown.component.html',
  styleUrls: ['./age-breakdown.component.scss']
})
export class AgeBreakdownComponent implements OnInit{
  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  age18To23 = 0;
  age24To28 = 0;
  age29To34 = 0;
  above35 = 0;
  below18 = 0;
  dataLength = 0;
  loading = false;


  mobileUsers= [];

  constructor(
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private campaignService: CampaignService,

  ) {
    this.dataLength = 1;
    this.chartOptions = {
      series: [1103,500,480,201],
      chart: {
        width: 450,
        type: "donut"
      },
      labels:['18 - 23','24 - 28','24 - 34','35+'],
      colors:["#ed7014", "#0a1172","#004225","#b90e0a","#009161"],
      plotOptions: {
        pie: {
          startAngle: -90,
          endAngle: 90,
          offsetY: 10
        }
      },
      grid: {
        padding: {
          bottom: -80
        }
      },

      legend: {
        position:'bottom',
        formatter: function(val, opts) {
          return val + " - " + opts.w.globals.series[opts.seriesIndex];
        }
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 400
            },
            legend: {
              position: 'bottom'
            }
          }
        }
      ]
    };
  }
  ngOnInit(): void {


  }

  fetchAllMobileCustomers(){
    this.campaignService.getAllCustomers().subscribe((resp: any) =>{
      this.mobileUsers = resp.data.users
      //Getting the users Age Metrics
      var age_details = this.mobileUsers.filter((data: any) => data.dob);
      var dob_result = age_details.map(function(a: any) {return a.dob;});
      const today = new Date();
      dob_result.filter(data => {
        var mydate= new Date(data);
        var Difference_In_Time = today.getTime() - mydate.getTime();
        var Difference_In_Days = Math.ceil(Difference_In_Time / (1000 * 3600 * 24*365));
        dob_result.push(Difference_In_Days);

        //Below 18
        var clusterX = dob_result.filter(
          function(value){
            return value < 18;
          }
        ).length
          this.below18 = clusterX;

        //Age 18 to 23
          var clusterOne = dob_result.filter(
              function(value){
                return value > 17 && value < 24;
          }
        ).length
          this.age18To23 = clusterOne;

          //Age 24 to 28
          var clusterTwo = dob_result.filter(
            function(value){
              return value > 23 && value < 29;
            }
          ).length
            this.age24To28 = clusterTwo;

           //Age 29 to 34
          var clusterThree = dob_result.filter(
            function(value){
              return value > 28 && value < 35;
            }
          ).length
            this.age29To34 = clusterThree;

          //Above 35
          var clusterFour = dob_result.filter(
            function(value){
              return value > 34;
            }
          ).length
            this.above35 = clusterFour;

            this.chartOptions = {
              series: [this.age18To23, this.age24To28, this.age29To34, this.above35],
              chart: {
                width: 450,
                type: "donut"
              },
              labels:['18 - 23','24 - 28','24 - 34','35+'],
              colors:["#ed7014", "#0a1172","#004225","#b90e0a","#009161"],
              plotOptions: {
                pie: {
                  startAngle: -90,
                  endAngle: 90,
                  offsetY: 10
                }
              },
              grid: {
                padding: {
                  bottom: -80
                }
              },

              legend: {
                position:'bottom',
                formatter: function(val, opts) {
                  return val + " - " + opts.w.globals.series[opts.seriesIndex];
                }
              },
              responsive: [
                {
                  breakpoint: 480,
                  options: {
                    chart: {
                      width: 400
                    },
                    legend: {
                      position: 'bottom'
                    }
                  }
                }
              ]
            };
        })
    })
  }
}
