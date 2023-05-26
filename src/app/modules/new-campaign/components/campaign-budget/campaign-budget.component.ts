import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-campaign-budget',
  templateUrl: './campaign-budget.component.html',
  styleUrls: ['./campaign-budget.component.scss']
})
export class CampaignBudgetComponent implements OnInit{

  form: FormGroup;
  publishPayload;
  loading = false;
  submitted  = false;
  cname: any;
  userId = sessionStorage.getItem('userId');
  campaignAddress = sessionStorage.getItem('campaignAddress');


  get f() {
    return this.form.controls;
  }

  constructor(
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    private router: Router,
    private service: ApiService,
    private toastr: ToastrService,
    private _httpClient: HttpClient
  ){
   this.form = this.fb.group({
    total_budget:["",[Validators.required,Validators.pattern("^[0-9]+$")]],
    payout:["",[Validators.required,Validators.pattern("^[0-9]+$")]],
    daily_budget:["",[Validators.required,Validators.pattern("^[0-9]+$")]]
   })

   this.publishPayload = JSON.parse(sessionStorage.getItem('publishPayload')?? '{}')
  }

  ngOnInit(): void {
    this.fetchDetails();
  }

  fetchDetails(){
    this.service.fetchCampaignById(this.campaignAddress).subscribe({
      next:(resp)=>{
        this.cname = resp.data.details.name
      },
      error:(err)=>{
        this.toastr.error(err.message,'error')
      }
    })
}

  complete(){
    this.submitted = true;
      // stop here if form is invalid
      if (this.form.invalid) {
        return;
      }
      else{
        this.loading = true;
        const {total_budget,payout,daily_budget}=this.form.value;
        const campaignAddress = sessionStorage.getItem('campaignAddress');
        const payload = {
          totalBudget: total_budget,
          dailyBudget: daily_budget,
          numberOfUsers: total_budget / payout,
          payout: payout,
          feeType: 'plus',
          address: this.userId,
          campaignName:this.cname
        }
        Object.assign(this.publishPayload, {budget: total_budget,payout: payout})
        this.service.newStep4(campaignAddress, payload).subscribe({
          next: (res)=>{
            this.loading = false;
            this.completeAndpublish()
          },
          error: (err) => {
            this.loading = false;
            this.toastr.error('Error: ',err.message);
          }
        })

      }

  }

  completeAndpublish(){
    const campaignAddress = sessionStorage.getItem('campaignAddress');
    this.service.completeAndPublish(campaignAddress, this.publishPayload).subscribe({
      next:(res)=>{
        this.loading = false;
        this.toastr.success('Campaign Added Successfully','')
        this.router.navigate(['./dashboard/primary-campaigns'])
      },
      error: (err) =>{
        this.loading = false;
        this.toastr.error('Error: ',err.message);
      }
    })

  }

}
