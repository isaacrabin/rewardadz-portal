import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewCampaignRoutingModule } from './new-campaign-routing.module';
import { CampaignDetailsComponent } from './components/campaign-details/campaign-details.component';
import { CamapignAssetsComponent } from './components/campaign-assets/camapign-assets.component';
import { CampaignMetricsComponent } from './components/campaign-metrics/campaign-metrics.component';
import { CampaignBudgetComponent } from './components/campaign-budget/campaign-budget.component';
import { LocationComponent } from './components/location/location.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { ApiService } from './service/api.service';
import {FilePickerModule} from 'ngx-awesome-uploader';


@NgModule({
  declarations: [
    CampaignDetailsComponent,
    CamapignAssetsComponent,
    CampaignMetricsComponent,
    CampaignBudgetComponent,
    LocationComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    NewCampaignRoutingModule,
    FilePickerModule,
    AngularSvgIconModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBG3YReMMbQ9XhcsxJzNvTZwK3Qbn5pebE',
      libraries: ['places']
    }),
  ],
  providers:[
    ApiService
  ]
})
export class NewCampaignModule { }
