import { MapsAPILoader } from '@agm/core';
import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../service/api.service';

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

  latitude: any = 0;
  longitude: any = 0;
  geoCoder!: google.maps.Geocoder;
  zoom!: number;

  selectedLocation: any;
  campaignAddress: any;
  campaignRadius!: any;
  radiusToMap!: number;
  address!: string;

  loading = false;

  @ViewChild('search', { static: false })
  public searchElementRef!: ElementRef;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private toastr: ToastrService,
    private service: ApiService,
    ){
   this.form = this.fb.group({
    radius: [''],
    selectedLocation:['']
   })
  }

  ngOnInit(): void {
      //load Places Autocomplete
      this.mapsAPILoader.load().then(() => {
        this.setCurrentLocation();
        this.geoCoder = new google.maps.Geocoder;

        let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
        autocomplete.addListener("place_changed", () => {
          this.ngZone.run(() => {
            //get the place result
            let place: google.maps.places.PlaceResult = autocomplete.getPlace();

            //verify result
            if (place.geometry === undefined || place.geometry === null) {
              return;
            }

            //set latitude, longitude and zoom
            this.latitude = place.geometry.location?.lat();
            this.longitude = place.geometry.location?.lng();
            this.zoom = 7;
          });
        });
      });

  }

   //Lauch locatipn Setup
   launcLocationSetup(){
    window.location.reload()
  }

   // Get Current Location Coordinates
   private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 12;
      });
    }
  }

  setCurrentNewLocation() {
    this.loading = true;
    const formData = this.form.value;
    this.campaignRadius = formData.radius;
    if ('geolocation' in navigator) {
        if(this.campaignRadius < 10){
          this.radiusToMap = 20
        }
        else if(this.campaignRadius > 20){
          this.radiusToMap = 10
        }
        else{
          this.radiusToMap = parseInt(this.campaignRadius)
        }

      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = this.latitude
        this.longitude = this.longitude
        this.zoom = this.radiusToMap;
      });

      this.goToNext();
    }
  }

  getAddress(latitude: any, longitude: any) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results: any, status) => {
        if (status === 'OK') {
        if (results[0]) {
          this.zoom = 12;
          this.address = results[0].formatted_address;
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }

    });
  }

  next(){
    this.router.navigate(['app/new-campaign/budget'])
  }

  goToNext(){
    const payload = {
      campaignLat : this.latitude,
      campaignLong : this.longitude,
      camapaignRadius: this.campaignRadius * 1000
    }

    this.campaignAddress = sessionStorage.getItem('campaignAddress');
    this.service.addLocationSetup(this.campaignAddress,payload).subscribe((resp:any) =>{
      this.loading = false;

      this.toastr.success('Location setup successful','');
      this.router.navigate(['/app/new-campaign/budget'])

    })
  }



}
