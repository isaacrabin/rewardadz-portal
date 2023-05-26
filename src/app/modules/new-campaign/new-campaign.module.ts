import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgmCoreModule } from '@agm/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AngularSvgIconModule } from 'angular-svg-icon';

import { SharedModule } from 'src/app/shared/shared.module';
import { CamapignAssetsComponent } from './components/campaign-assets/camapign-assets.component';
import { CampaignBudgetComponent } from './components/campaign-budget/campaign-budget.component';
import { CampaignDetailsComponent } from './components/campaign-details/campaign-details.component';
import { CampaignMetricsComponent } from './components/campaign-metrics/campaign-metrics.component';
import { LocationComponent } from './components/location/location.component';
import { NewCampaignRoutingModule } from './new-campaign-routing.module';
import { ApiService } from './service/api.service';
import { TokenInterceptor } from '../../core/interceptor/token.interceptor';

@NgModule({
  declarations: [
    CampaignDetailsComponent,
    CamapignAssetsComponent,
    CampaignMetricsComponent,
    CampaignBudgetComponent,
    LocationComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NewCampaignRoutingModule,
    AngularSvgIconModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBG3YReMMbQ9XhcsxJzNvTZwK3Qbn5pebE',
      libraries: ['places']
    }),
  ],
  providers:[
    ApiService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    }
  ]
})
export class NewCampaignModule { }
