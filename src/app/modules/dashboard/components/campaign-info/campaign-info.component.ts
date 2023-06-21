import { MapsAPILoader } from '@agm/core';
import { Component, OnInit,ElementRef, NgZone, ViewChild,  } from '@angular/core';

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
  ApexTooltip,
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexLegend,
} from "ng-apexcharts";


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


@Component({
  selector: 'app-campaign-info',
  templateUrl: './campaign-info.component.html',
  styleUrls: ['./campaign-info.component.scss']
})
export class CampaignInfoComponent implements OnInit {

  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions!: Partial<ChartOptions>;
  gradient: any = [];
  allcoords: any = []

  public map!: google.maps.Map;
  private heatmap!: google.maps.visualization.HeatmapLayer;

  lat = -1.2344;
  long = 36.456;
  lat_lng = new Array();

  constructor(
    private ngZone: NgZone,
    private mapsAPILoader: MapsAPILoader,
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

    this.chartOptions = {
      series: [
        {
          name: "Customers",
          data: [20,90]
        }
      ],
      chart: {
        height: 350,
        type: "area"
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "smooth",
        colors: ['#ff9933']
      },
      xaxis: {
        categories: ['mon','tue']
      },
      yaxis: {
        title: {
          text: "Number of accounts"
        }
      },
      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm"
        }
      },
      colors: ["#ff9933"],
    };
  }

  ngOnInit(): void {
      }

    onMapLoad(mapInstance: google.maps.Map) {
      this.map = mapInstance;
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
}
