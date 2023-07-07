import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CampaignService } from 'src/app/core/services/campaign.service';

@Component({
  selector: 'app-edit-campaign',
  templateUrl: './edit-campaign.component.html',
  styleUrls: ['./edit-campaign.component.scss']
})
export class EditCampaignComponent implements OnInit {
  loading = false;
  form:FormGroup;
  submitted = false;
  campaignName = '';
  campaignDesc = '';
  address = '';

  get f() {
    return this.form.controls;
  }

  constructor(
    private fb: FormBuilder,
    private service: CampaignService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {
    this.form = this.fb.group({
      name: ["", Validators.required],
      description:["",Validators.required],
      tags:["",Validators.required],
      industry:["",Validators.required]

    })
  }

  ngOnInit(): void {
    this.getCampaignDetails();
  }

  getCampaignDetails(){
    this.loading = true;
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.address = id;
      this.service.fetchCampaignById(id).subscribe({
        next: (resp) => {
          this.loading = false;
          this.campaignName = resp.data.details.name;
          this.campaignDesc = resp.data.details.description;
          this.form.patchValue({
            name: resp.data.details.name,
            industry: resp.data.details.industry,
            description: resp.data.details.description,
            tags: resp.data.details.tags,
          });
        },
        error: (err) => {
          this.loading = false;
        }
      })
    });
  }

  saveData(){
    this.loading = true;
    const {name, description, tags, industry} = this.form.value;
    const payload = {
      menus: [
        {
          name: 'name',
          value: name
        },
        {
          name: 'description',
          value: description
        },
        {
          name:'industry',
          value: industry
        },
        { name:'tags',
          value: tags
        }
      ],
    }

    this.service.updateCampaign(this.address,payload.menus).subscribe({
      next:(resp) => {
        this.loading = false;
        this.toastr.success("Campaign edited successfully");
      },
      error:(err) => {
        this.loading = false;
      }
    })
  }

}
