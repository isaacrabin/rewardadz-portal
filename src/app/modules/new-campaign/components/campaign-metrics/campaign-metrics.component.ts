import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-campaign-metrics',
  templateUrl: './campaign-metrics.component.html',
  styleUrls: ['./campaign-metrics.component.scss']
})
export class CampaignMetricsComponent implements OnInit {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router
    ){
   this.form = this.fb.group({})
  }

  ngOnInit(): void {

  }

  next(){
    this.router.navigate(['new-campaign/location'])
  }
}
