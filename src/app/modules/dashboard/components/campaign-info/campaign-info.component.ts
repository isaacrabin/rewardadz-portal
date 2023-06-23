import { MapsAPILoader } from '@agm/core';
import { Component, OnInit,ElementRef, NgZone, ViewChild,  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';


import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexXAxis,
  ApexPlotOptions,
  ApexStroke,
  ApexYAxis,
  ApexFill,
  ApexGrid,
  ApexTooltip,
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexLegend,
  ApexStates
} from "ng-apexcharts";
import { ToastrService } from 'ngx-toastr';
import { CampaignService } from 'src/app/core/services/campaign.service';


export type ChartOptions = {
  series?: ApexAxisChartSeries;
  chart?: ApexChart;
  xaxis?: ApexXAxis;
  yaxis?: ApexYAxis;
  stroke?: ApexStroke;
  tooltip?: ApexTooltip;
  dataLabels?: ApexDataLabels;
  colors?: string [];
  plotOptions: ApexPlotOptions,
  legend: ApexLegend
};

export type ChartOptionsAge = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: any;
  colors:any;
  legend: ApexLegend;
  responsive: ApexResponsive[];
  plotOptions: ApexPlotOptions;
  grid: ApexGrid;
  dataLabels: ApexDataLabels;
  fill: ApexFill;
  states: ApexStates;
};


@Component({
  selector: 'app-campaign-info',
  templateUrl: './campaign-info.component.html',
  styleUrls: ['./campaign-info.component.scss']
})
export class CampaignInfoComponent implements OnInit {

  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions!: Partial<ChartOptions>;
  public chartOptionsAge!: Partial<ChartOptionsAge>;
  public chartOptionsGender!: Partial<ChartOptionsAge>;
  gradient: any = [];
  allcoords: any = [];
  topUpForm: FormGroup;


  public map!: google.maps.Map;
  private heatmap!: google.maps.visualization.HeatmapLayer;

  lat = -1.2344;
  long = 36.456;
  lat_lng = new Array();

  loading = false;
  selectedCampaign: any;
  selectedCategory: any;
  format: any;
  selectedFile: any;
  selectedIcon: any;
  url: any;
  selectedIndustry: any;
  selectedTag: any;
  selectedName: any;
  selecteddescription: string = '';
  selectedTotalBudget: string = '';
  selectedDailyBudget: string = '';
  selectedPayout : string = '';
  selectedBalance: string = '';
  selectedClicks: string = '';
  selectedConversions: string = '';
  overalEngagements: string = '';
  selectedImpressions: string = '';
  overalReach: any;
  selectedDevices: any;
  deviceArray : any;
  clicksStats: any;
  conversionStats : any;
  impressionStats: any;
  totalFemale: any;
  totalMale: any;
  showtopUpModal = false;
  campaignAddress:string = '';

  constructor(
    private ngZone: NgZone,
    private mapsAPILoader: MapsAPILoader,
    private route: ActivatedRoute,
    private service: CampaignService,
    private fb: FormBuilder,
    private toastr: ToastrService
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
    ];

    this.topUpForm = this.fb.group({
      amount:['',[Validators.required]],
      dailyBudget: ['',[Validators.required]],
      payout:['',[Validators.required]]
    });

    this.chartOptions = {
      series: [
        {
          name: "Total",
          data:  [80,20,45]
        }
      ],
      chart: {
        height: 350,
        type: "area"
      },

      plotOptions: {
        bar: {
          // horizontal: true,
        }
      },
      colors: ["#16a34a"],
            xaxis: {
        categories: ['tecno','samsung','nokia'],
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

    this.chartOptionsAge = {
      series: [1103,500,480,201],
      chart: {
        width: 420,
        type: "pie"
      },
      labels:['18 - 23','24 - 28','24 - 34','35+'],
      colors:["#ed7014", "#0a1172","#004225","#b90e0a","#009161"],
      plotOptions: {
        pie: {
          startAngle: 0,
          endAngle: 360,
          offsetY: 10
        }
      },
      grid: {
        padding: {
          bottom: 0
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

    this.chartOptionsGender = {
      series: [100,57],
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
    this.fetchDetails();
    this.fetchDevices();
    this.fetchAgeMetrics();
  }


  //Fetching Campaign Details
  fetchDetails() {
    this.loading=true
    this.route.params.subscribe(params => {
      const id = params['id']; // (+) converts string 'id' to a number
      this.service.fetchCampaignById(id).subscribe({
        next: (resp) => {
          this.loading = false;
          this.selectedCampaign = resp.data.details.name;
          this.selectedCategory = resp.data.type;
          this.format = this.selectedCategory
          this.selectedFile = resp.data.file
          this.selectedIcon = resp.data.icon
          if(this.selectedCategory == 'Survey'){
            this.url = this.selectedIcon;
          }
          else{
            this.url = this.selectedFile;
          }
          this.selectedIndustry = resp.data.details.industry
          this.selectedTag = resp.data.details.tags
          this.selectedName = resp.data.details.name
          this.selecteddescription = resp.data.details.description
          let comabudget = Math.ceil(resp.data.budget.totalBudget);
          this.selectedTotalBudget = comabudget.toLocaleString();
          this.selectedDailyBudget  = resp.data.budget.dailyBudget
          let comapayout= resp.data.budget.payout
          this.selectedPayout = comapayout.toLocaleString();
          let comafy = Math.ceil(resp.data.budget.balance);
          this.selectedBalance = comafy.toLocaleString();
          this.selectedClicks = resp.data.performance.total_clicks
          this.selectedConversions = resp.data.performance.total_conversions
          this.overalEngagements = this.selectedConversions
          this.selectedImpressions = resp.data.performance.total_impressions
          this.overalReach = this.selectedImpressions
          this.selectedDevices = resp.data.performance.devices
          this.deviceArray = JSON.parse(JSON.stringify(this.selectedDevices))
          this.clicksStats= resp.data.performance.clicks
          this.conversionStats = resp.data.performance.conversions.length;
          this.impressionStats =resp.data.performance.impressions.length;
          this.totalFemale = resp.data.performance.female
          this.totalMale = resp.data.performance.male

          this.chartOptionsGender = {
            series: [this.totalFemale,this.totalMale],
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
            labels: ["Female", "Male"],

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

        },
        error: (err) => {
          this.loading = false;
        }
      })
    });
  }

  fetchDevices(){
    this.loading=true
    this.route.params.subscribe(params => {
      const id = params['id']; // (+) converts string 'id' to a number
      this.service.fechCampaignDevices(id).subscribe((resp: any) => {
        this.deviceArray = resp.data
        const myDeviceArrayNames = this.deviceArray.map((item: { name: any; }) => {
          let name = item.name;
          return  name;
        });

        const myDeviceArrayCount = this.deviceArray.map((item: any) => {
          let count = item.count;
          return count;

        });


        this.chartOptions = {
          series: [
            {
              name: "Total",
              data:  myDeviceArrayCount
            }
          ],
          chart: {
            height: 350,
            type: "area"
          },

          plotOptions: {
            bar: {
              // horizontal: true,
            }
          },
          colors: ["#16a34a"],
                xaxis: {
            categories: myDeviceArrayNames,
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
      })
    })

  }

  fetchAgeMetrics(){
    this.loading=true
    this.route.params.subscribe(params => {
      let id = params['id']; // (+) converts string 'id' to a number
      this.campaignAddress = id;
      this.service.fetchAgeMetrics(id).subscribe((resp: any) => {
        let above_35 = resp.data.above35
        let between12To22 = resp.data.between12To22
        let between23To28 = resp.data.between23To28
        let between29To34 = resp.data.between29To34
        this.chartOptionsAge = {
          series: [between12To22,between23To28,between29To34,above_35],
          chart: {
            width: 420,
            type: "pie"
          },
          labels:['18 - 23','24 - 28','24 - 34','35+'],
          colors:["#ed7014", "#0a1172","#004225","#b90e0a","#009161"],
          plotOptions: {
            pie: {
              startAngle: 0,
              endAngle: 360,
              offsetY: 10
            }
          },
          grid: {
            padding: {
              bottom: 0
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

  onMapLoad(mapInstance: google.maps.Map) {
    let location: any;
    location = sessionStorage.getItem('selectedLocation');
    this.map = mapInstance;
    let selectedLocation=JSON.parse(location)

    // here our in other method after you get the coords; but make sure map is loaded
    for (var i = 0; i < selectedLocation.length; i++) {
      const coordi = selectedLocation[i];
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

 topUp(){
  this.showtopUpModal = true;
 }
 addFunds(){
  this.loading = true;
  const {amount,dailyBudget,payout} = this.topUpForm.value;
  const payload = {
    totalBudget: amount,
    dailyBudget: dailyBudget,
    payout: payout,
    feeType: "plus",
    numberOfUsers: '5',
    address: sessionStorage.getItem('userId'),
    campaignName: this.selectedCampaign
  };
  this.service.newStep4(this.campaignAddress,payload).subscribe((resp:any) =>{
    this.loading = false;
    this.toastr.success("Camapign topup successful","")
    this.showtopUpModal = false;
  })
 }
 hideDelModal(){
  this.showtopUpModal = false;
 }
}
