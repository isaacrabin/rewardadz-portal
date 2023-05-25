import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-campaign-budget',
  templateUrl: './campaign-budget.component.html',
  styleUrls: ['./campaign-budget.component.scss']
})
export class CampaignBudgetComponent implements OnInit{

  detailsForm: FormGroup;

  constructor(private fb: FormBuilder){
   this.detailsForm = this.fb.group({})
  }

  ngOnInit(): void {

  }

  next(){}

}
