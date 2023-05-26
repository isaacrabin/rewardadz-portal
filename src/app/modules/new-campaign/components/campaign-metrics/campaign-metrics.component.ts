import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { error } from 'console';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-campaign-metrics',
  templateUrl: './campaign-metrics.component.html',
  styleUrls: ['./campaign-metrics.component.scss']
})
export class CampaignMetricsComponent implements OnInit {

  form: FormGroup;
  loading = false;
  submitted = false;
  geofencing = false;
  times: any = [];
  gender: any = [];
  agePattern = "[0-9]{2}";
  maxPattern = "[0-9]{2}";

  get f() {
    return this.form.controls;
  }

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private service: ApiService
    ){
   this.form = this.fb.group({
     gender:["",Validators.required],
      minAge:["",[Validators.required, Validators.pattern(this.agePattern)]],
      maxAge:["",[Validators.required, Validators.pattern(this.maxPattern)]],
      startTime:["",Validators.required],
      endTime:["",Validators.required],
      location:[false]
   })

    this. gender = [
    {genderType: 'Male',genderCode:'Male'},
    {genderType: 'Female',genderCode:'Female'},
    {genderType: 'All',genderCode:'All'}]

  this.times = [
    {name: '00:00 AM', time: '00:00'},
    {name: '01:00 AM', time: '01:00'},
    {name: '02:00 AM', time: '02:00'},
    {name: '03:00 AM', time: '03:00'},
    {name: '04:00 AM', time: '04:00'},
    {name: '05:00 AM', time: '05:00'},
    {name: '06:00 AM', time: '06:00'},
    {name: '07:00 AM', time: '07:00'},
    {name: '08:00 AM', time: '08:00'},
    {name: '09:00 AM', time: '09:00'},
    {name: '10:00 AM', time: '10:00'},
    {name: '11:00 AM', time: '11:00'},
    {name: '12:00 PM', time: '12:00'},
    {name: '13:00 PM', time: '13:00'},
    {name: '14:00 PM', time: '14:00'},
    {name: '15:00 PM', time: '15:00'},
    {name: '16:00 PM', time: '16:00'},
    {name: '17:00 PM', time: '17:00'},
    {name: '18:00 PM', time: '18:00'},
    {name: '19:00 PM', time: '19:00'},
    {name: '20:00 PM', time: '20:00'},
    {name: '21:00 PM', time: '21:00'},
    {name: '22:00 PM', time: '22:00'},
    {name: '23:00 PM', time: '15:00'}
  ];

  }

  ngOnInit(): void {

  }

  geoFence(event:any){
    this.geofencing = event.target.checked;
  }

  next(){
    this.router.navigate(['new-campaign/location'])
  }

  saveData(){
    this.submitted = true;
    const {gender, startTime, endTime, maxAge, minAge, location} = this.form.value;
    const campaignAddress = sessionStorage.getItem('campaignAddress');
    const publishPayload = JSON.parse(sessionStorage.getItem('publishPayload')?? '{}')
    if(!this.geofencing){
      this.loading = true;
      const payload = {
        gender : gender,
        ageMin: minAge,
        ageMax: maxAge,
        type: "primary",
      }
      sessionStorage.setItem('metricsPayload',JSON.stringify(payload));
      Object.assign(publishPayload,{ start_time: startTime ,
        end_time: endTime})
      this.service.newStep3(campaignAddress,payload).subscribe({
        next: (res)=> {
          this.loading = false;
          sessionStorage.setItem('publishPayload', JSON.stringify(publishPayload))
          this.toastr.success('Campaign metrics set successfully','');
          this.router.navigate(['./new-campaign/budget']);
        },
        error: (err) => {
          if(err.status === 403){
            this.toastr.info("Your session expired","");
            this.router.navigate(['./auth/sign-in']);
          }
          else if(err.status === 401){
            this.toastr.info("Contact your admin for access to this page","");
            this.router.navigate(['/dashboard/analytics']);
          }
          else{
            this.toastr.error(err);
          }
        }
      })

    }
    else{
      this.loading = true
      const payload = {
        gender : gender,
        ageMin: minAge,
        ageMax: maxAge,
        type: 'primary',
        country: ''
      }
      Object.assign(publishPayload,{ start_time: startTime,
      end_time: endTime})
      this.service.newStep3(campaignAddress,payload).subscribe((resp:any) =>{
        this.loading = false
        sessionStorage.setItem('publishPayload', JSON.stringify(publishPayload))
        this.toastr.success('Campaign metrics set successfully','');
        this.router.navigate(['./new-campaign/location']);
      })
    }

  }
}
