import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-new-campaign',
  templateUrl: './new-campaign.component.html',
  styleUrls: ['./new-campaign.component.scss']
})
export class NewCampaignComponent implements OnInit{
  detailsTab = false;
  filesTab = true;
  metricsTab = false;
  budgetTab = false
  detailsForm: FormGroup;



  constructor(
    private fb: FormBuilder,
    private spinner: NgxSpinnerService
  ){
    this.detailsForm = this.fb.group({

    })
  }
  ngOnInit(): void {

  }



  tabSelected(val: string){
    if(val === 'details'){
      this.filesTab = true
      this.detailsTab = false;
      this.metricsTab = false;
      this.budgetTab = false
    }
    else if(val === 'files'){
      this.detailsTab = true;
      this.filesTab = false;
      this.metricsTab = false;
      this.budgetTab = false
    }
    else if(val === 'metrics'){
      this.detailsTab = false;
      this.filesTab = false;
      this.metricsTab = true;
      this.budgetTab = false
    }
    else if(val === 'budget'){
      this.detailsTab = false;
      this.filesTab = false;
      this.metricsTab = false;
      this.budgetTab = true
    }


  }

}
