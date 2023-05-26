import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AdType, Industry } from '../../model/model';
import { ApiService } from '../../service/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-campaign-details',
  templateUrl: './campaign-details.component.html',
  styleUrls: ['./campaign-details.component.scss']
})
export class CampaignDetailsComponent implements OnInit {
  detailsTab = false;
  filesTab = true;
  metricsTab = false;
  budgetTab = false
  submitted = false;
  loading = false;
  detailsForm: FormGroup;

  industry: Industry[];
  adtype: AdType[];

  get f() {
    return this.detailsForm.controls;
  }

  constructor(
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    private router: Router,
    private service: ApiService,
    private toastr: ToastrService
  ){
    this.detailsForm = this.fb.group({
      campaignCategory:["",[Validators.required]],
      linkUrl:[""],
      description:["",[Validators.required]],
      industryName:["",Validators.required],
      name:["",Validators.required],
      tag:["",Validators.required]
    });

    this.industry = [
      {industryCode: 'Finance',industryName:'Finance'},
      {industryCode: 'Technology',industryName:'Technology'},
      {industryCode: 'Manufacturing & Construction',industryName:'Manufacturing & Construction'},
      {industryCode: 'Health & Safety',industryName:'Health & Safety'},
      {industryCode: 'Transport',industryName:'Transport'},
      {industryCode: 'Agriculture',industryName:'Agriculture'},
      {industryCode: 'Education',industryName:'Education'},
      {industryCode: 'Environment & Water ',industryName:'Environment & Water'},
      {industryCode: 'Energy',industryName:'Energy'},
      {industryCode: 'Food & Beverage Sevices',industryName:'Food & Beverage Sevices'},
      {industryCode: 'Accomodation & Hospitality',industryName:'Accomodation & Hospitality'},
      {industryCode: 'Fashion & Cosmestics',industryName:'Fashion & Cosmestics'},
      {industryCode: 'Outdoor & Adventure',industryName:'Outdoor & Adventure'},
      {industryCode: 'Home Deco & Furniture',industryName:'Home Deco & Furniture'},
      {industryCode: 'Retail (Supermarkets & General Stores)',industryName:'Retail (Supermarkets & General Stores)'},
      {industryCode: 'Sports & Gaming',industryName:'Sports & Gaming'},
      {industryCode: 'Professional & Business services',industryName:'Professional & Business services'},
      {industryCode: 'Infrastructure',industryName:'Infrastructure'},
      {industryCode: 'Entertainment',industryName:'Entertainment'},
      {industryCode: 'Motor Vehicle, Bikes, Parts',industryName:'Motor Vehicle, Bikes, Parts'},
      {industryCode: 'Telecommunications',industryName:'Telecommunications'},
      {industryCode: 'Real Estates, Rentals, Leasing',industryName:'Real Estates, Rentals, Leasing'}
    ]

    this.adtype = [
      {fileTypeCode: 'Social',fileTypeName:'Social'},
      {fileTypeCode: 'Video',fileTypeName:'Video'},
      // {fileTypeCode: 'Audio',fileTypeName:'Audio'},
      {fileTypeCode: 'Survey',fileTypeName:'Survey'}
    ]
  }
  ngOnInit(): void {

  }


  saveDetails(){
    this.submitted= true;
    this.loading = true;
    const {
      campaignCategory,
      linkUrl,
      description,
      industryName,
      name,
      tag
    } = this.detailsForm.value;
    const userId = sessionStorage.getItem('userId');
    const orgEmail = sessionStorage.getItem('orgEmail');

    if (this.detailsForm.invalid) {
      this.toastr.warning("Provide all required fields");
      this.loading = false;
      return;
    }
    else{
      const payload = {
        ownerAddress:userId,
        name:name,
        description:description,
        industry:industryName,
        tags:tag,
        type: campaignCategory,
        linkURL:linkUrl
      }
      const pusblishPayload = {
        campaign_name: name,
        organization_name: industryName,
        org_email: orgEmail
      }
      this.service.newStep1(userId,payload).subscribe({
        next: (resp: any) => {
          this.loading = false
          if(resp.success === true){
            sessionStorage.setItem("campaignAddress",resp.data._id);
            sessionStorage.setItem('publishPayload',JSON.stringify(pusblishPayload));
            this.toastr.success('Campaign details saved successfully','');
            this.router.navigate(['new-campaign/files'])
            this.detailsForm.reset();
            }
            else{
             this.toastr.error("Error ocuured","")
            }
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
    });

    }


  }

}
