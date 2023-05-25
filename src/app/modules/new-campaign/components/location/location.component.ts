import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit{

  form: FormGroup;
  gradient: any = [];
  allcoords: any = []

  public map!: google.maps.Map;
  private heatmap!: google.maps.visualization.HeatmapLayer;

  lat = -1.2344;
  long = 36.456;
  lat_lng = new Array();

  constructor(
    private fb: FormBuilder,
    private router: Router
    ){
   this.form = this.fb.group({})

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

  this.allcoords = [
    {lat: 37.782, lng: -122.447},
    {lat: 37.782, lng: -122.445},
    {lat: 37.782, lng: -122.443},
    {lat: 37.782, lng: -122.441},
    {lat: 37.782, lng: -122.439},
    {lat: 37.782, lng: -122.437},
    {lat: 37.782, lng: -122.435},
    {lat: 37.785, lng: -122.447},
    {lat: 37.785, lng: -122.445},
    {lat: 37.785, lng: -122.443},
    {lat: 37.785, lng: -122.441},
    {lat: 37.785, lng: -122.439},
    {lat: 37.785, lng: -122.437},
    {lat: 37.785, lng: -122.435}
  ];
  }

  ngOnInit(): void {

  }

  next(){
    this.router.navigate(['new-campaign/budget'])
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
