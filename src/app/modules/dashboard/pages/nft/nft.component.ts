import { Campaign } from './../../models/nft';
import { Component, OnInit } from '@angular/core'
import { NgxSpinnerService } from 'ngx-spinner';
import { CampaignService } from 'src/app/core/services/campaign.service';

@Component({
  selector: 'app-nft',
  templateUrl: './nft.component.html',
})
export class NftComponent implements OnInit {

  rows = [];
  totalPrimaryCampaigns = 0;
  activeCampaign = 0;
  myCampaignAddress = '';
  overalReach: any;
  conversion_rate: any;
  overalEngagements: any;
  overalClick: any;
  clickLabels: any;

  constructor(
    private spinner: NgxSpinnerService,
    private campaignService: CampaignService
  ) {

  }

  ngOnInit(): void {
    this.fetchAllPrimaryCampaigns()
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
      console.log(this.clickLabels)

  //       this.campaignOption = {
  //         title:{
  //           text:'Your Campaigns Performance (by Clicks)'
  //         },
  //         xAxis: {
  //             type: 'category',
  //             data: this.performanceName
  //         },
  //         yAxis: {
  //             type: 'value'
  //         },
  //         tooltip: {
  //           trigger: "axis",
  //           axisPointer: {
  //             type: "shadow",
  //           },
  //         },
  //         toolbox: {
  //           show: true,
  //           feature: {
  //             mark: { show: true },
  //             dataView: { show: true, readOnly: false },
  //             restore: { show: true },
  //             saveAsImage: { show: true },
  //           },
  //         },
  //         series: [{
  //             data: adPerformanceValue,
  //             type: 'line',
  //             smooth: true
  //         }]
  //     };

  //     this.genderoption = {
  //       title:{
  //         text: 'Gender Performance(By Engagement)'
  //       },
  //       tooltip: {
  //           trigger: 'item'
  //       },
  //       legend: {
  //           bottom: '5%',
  //           left: 'center'

  //       },
  //       toolbox: {
  //         show: true,
  //         feature: {
  //           mark: { show: true },
  //           dataView: { show: true, readOnly: false },
  //         },
  //       },
  //       color: ["#ed7014", "#0a1172"],
  //       series: [
  //           {
  //               name: 'Gender',
  //               type: 'pie',
  //               radius: ['40%', '70%'],
  //               avoidLabelOverlap: false,
  //               itemStyle: {
  //                   borderRadius: 10,
  //                   borderColor: '#fff',
  //                   borderWidth: 2
  //               },
  //               label: {
  //                   show: false,
  //                   position: 'center'
  //               },
  //               emphasis: {
  //                   label: {
  //                       show: true,
  //                       fontSize: '40',
  //                       fontWeight: 'bold'
  //                   }
  //               },
  //               labelLine: {
  //                   show: false
  //               },
  //               data: [
  //                   {value: totalFemale, name: 'Female'},
  //                   {value: totalMale, name: 'Male'},

  //               ]
  //           }
  //       ]
  //     };

  //     this.clickOption = {
  //       title: {
  //         text: 'Campaign Performance (By Clicks)',
  //       },
  //       tooltip: {
  //         trigger: "axis",
  //         axisPointer: {
  //           type: "shadow",
  //         },
  //       },
  //       toolbox: {
  //         show: true,
  //         feature: {
  //           mark: { show: true },
  //           dataView: { show: true, readOnly: false },
  //           restore: { show: true },
  //           saveAsImage: { show: true },
  //         },
  //       },
  //       color:['#28a745'],
  //       xAxis: {
  //         type: 'category',
  //         data: this.performanceName
  //       },
  //       yAxis: {
  //         type: 'value'
  //       },
  //       series: [
  //         {
  //           data: totalClicks,
  //           type: 'bar',
  //           showBackground: true,
  //           backgroundStyle: {
  //             color: 'rgba(180, 180, 180, 0.2)'
  //           }
  //         }
  //       ]
  //     };

  //     this.conversionVsImpressionOption = {
  //       title: {
  //         text: 'Impressions Vs Conversions',
  //         subtext: '',
  //         left: 'center'
  //       },
  //       tooltip: {
  //         trigger: 'item',
  //         formatter: '{a} <br/>{b} : {c} ({d}%)'
  //       },
  //       color:['#28a745','#fd7e14'],
  //       legend: {
  //         bottom: 10,
  //         left: 'center',
  //         data: ['Conversion', 'Impression']
  //       },
  //       series: [
  //         {
  //           type: 'pie',
  //           radius: '60%',
  //           center: ['50%', '50%'],
  //           selectedMode: 'single',
  //           data: [
  //             { value: this.overalEngagements, name: 'Conversion'},
  //             { value: this.overalReach, name: 'Impression'}
  //           ],
  //           emphasis: {
  //             itemStyle: {
  //               shadowBlur: 10,
  //               shadowOffsetX: 0,
  //               shadowColor: 'rgba(0, 0, 0, 0.5)'
  //             }
  //           }
  //         }
  //       ]
  //     };



  //     this.timeOption = {
  //       title: {
  //         text: 'Daily Performance Statistics(By Time of the Day)'
  //       },
  //       tooltip: {
  //         trigger: 'axis'
  //       },
  //       legend: {
  //         data: this.performanceName
  //       },
  //       grid: {
  //         left: '3%',
  //         right: '4%',
  //         bottom: '3%',
  //         containLabel: true
  //       },
  //       toolbox: {
  //         feature: {
  //           saveAsImage: {}
  //         }
  //       },
  //       xAxis: {
  //         type: 'category',
  //         boundaryGap: false,
  //         data: ['00', '01', '02', '03', '04', '05', '06','07','08', '09', '10', '11', '12', '13','14', '15', '16', '17', '18', '19','20','21', '22', '23']
  //       },
  //       yAxis: {
  //         type: 'value'
  //       },
  //       series: [
  //         {
  //           name: 'Clicks',
  //           type: 'line',
  //           stack: 'Total',
  //           data: [0, 132, 10, 34, 90, 230, 10,0, 32, 10, 100, 90, 230, 210,0, 132, 10, 34, 90, 230, 210,90, 200, 110]
  //         }
  //       ]
  //     };

  // this.campaignImpressions = {
  //   title: {
  //     text: 'Campaign Impressions (For your Currently Running Campaigns)',
  //   },
  //   tooltip: {
  //     trigger: "axis",
  //     axisPointer: {
  //       type: "shadow",
  //     },
  //   },
  //   toolbox: {
  //     show: true,
  //     feature: {
  //       mark: { show: true },
  //       dataView: { show: true, readOnly: false },
  //       restore: { show: true },
  //       saveAsImage: { show: true },
  //     },
  //   },
  //   color:['#ed7014'],
  //   xAxis: {
  //     type: 'category',
  //     data: this.performanceName
  //   },
  //   yAxis: {
  //     type: 'value'
  //   },
  //   series: [
  //     {
  //       data: impressions,
  //       type: 'bar',
  //       showBackground: true,
  //       backgroundStyle: {
  //         color: 'rgba(180, 180, 180, 0.2)'
  //       }
  //     }
  //   ]
  // };

  // this.budgetOption = {
  //   toolbox: {
  //     show: true,
  //     feature: {
  //       mark: { show: true },
  //       dataView: { show: true, readOnly: false },
  //       restore: { show: true },
  //       saveAsImage: { show: true },
  //     },
  //   },
  //   title: {
  //     text: 'Conversions (For your Currently Running Campaigns)',
  //   },
  //   tooltip: {
  //     trigger: 'axis',
  //     axisPointer: {
  //       type: 'shadow'
  //     },
  //     formatter: function (params) {
  //       var tar = params[1];
  //       return tar.name + '<br/>' + tar.seriesName + ' : ' + tar.value;
  //     }
  //   },
  //   grid: {
  //     left: '3%',
  //     right: '4%',
  //     bottom: '3%',
  //     containLabel: true
  //   },
  //   xAxis: {
  //     type: 'category',
  //     splitLine: { show: false },
  //     data:this.performanceName
  //   },
  //   yAxis: {
  //     type: 'value'
  //   },
  //   color: ["#008080"],
  //   series: [
  //     {
  //       name: 'Placeholder',
  //       type: 'bar',
  //       stack: 'Total',
  //       itemStyle: {
  //         borderColor: 'transparent',
  //         color: 'transparent'
  //       },
  //       emphasis: {
  //         itemStyle: {
  //           borderColor: 'transparent',
  //           color: 'transparent'
  //         }
  //       },
  //       data: conversions
  //     },
  //     {
  //       name: 'Conversion',
  //       type: 'bar',
  //       stack: 'Total',
  //       label: {
  //         show: true,
  //         position: 'inside'
  //       },
  //       data: conversions
  //     }
  //   ]
  // };

     }
     else{
      // this.loading = false
      //  this.toastr.error("Error fetching campaigns","")
     }

    })

  }
}
