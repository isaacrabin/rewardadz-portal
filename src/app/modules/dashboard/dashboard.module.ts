import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { NftComponent } from './pages/nft/nft.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AgmCoreModule } from '@agm/core';
import { DashboardComponent } from './dashboard.component';
import { NftSingleCardComponent } from './components/nft/nft-single-card/nft-single-card.component';
import { NftDualCardComponent } from './components/nft/nft-dual-card/nft-dual-card.component';
import { NftChartCardComponent } from './components/nft/nft-chart-card/nft-chart-card.component';

import { NgApexchartsModule } from 'ng-apexcharts';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { NftHeaderComponent } from './components/nft/nft-header/nft-header.component';
import { NftAuctionsTableComponent } from './components/nft/nft-auctions-table/nft-auctions-table.component';
import { NftAuctionsTableItemComponent } from './components/nft/nft-auctions-table-item/nft-auctions-table-item.component';
import { PrimaryCampaignsComponent } from './pages/primary-campaigns/primary-campaigns.component';
import { SecondaryCampaignsComponent } from './pages/secondary-campaigns/secondary-campaigns.component';
import { ExpenditureComponent } from './pages/expenditure/expenditure.component';
import { RevenueComponent } from './pages/revenue/revenue.component';
import { TeamComponent } from './pages/team/team.component';
import { RolesComponent } from './pages/roles/roles.component';
import { ApiKeyComponent } from './pages/api-key/api-key.component';
import { NewCampaignComponent } from './pages/new-campaign/new-campaign.component';
import { CampainDetailsComponent } from './components/campain-details/campain-details.component';
import { CampaignService } from 'src/app/core/services/campaign.service';
import { TransactionTableItemComponent } from './components/transaction-table-item/transaction-table-item.component';
import { TransactionService } from 'src/app/core/services/transaction.service';
import { TeamTableTemComponent } from './components/team-table-tem/team-table-tem.component';
import { TeamService } from 'src/app/core/services/team.service';
import { RoleTableItemComponent } from './components/role-table-item/role-table-item.component';
import { CampaignClicksComponent } from './components/campaign-clicks/campaign-clicks.component';
import { CampaignGenderComponent } from './components/campaign-gender/campaign-gender.component';
import { ConversionsImpressionsComponent } from './components/conversions-impressions/conversions-impressions.component';
import { AgeBreakdownComponent } from './components/age-breakdown/age-breakdown.component';
import { TokenInterceptor } from 'src/app/core/interceptor/token.interceptor';


@NgModule({
  declarations: [
    DashboardComponent,
    NftComponent,
    NftSingleCardComponent,
    NftDualCardComponent,
    NftChartCardComponent,
    NftHeaderComponent,
    NftAuctionsTableComponent,
    NftAuctionsTableItemComponent,
    PrimaryCampaignsComponent,
    SecondaryCampaignsComponent,
    ExpenditureComponent,
    RevenueComponent,
    TeamComponent,
    RolesComponent,
    ApiKeyComponent,
    NewCampaignComponent,
    CampainDetailsComponent,
    TransactionTableItemComponent,
    TeamTableTemComponent,
    RoleTableItemComponent,
    CampaignClicksComponent,
    CampaignGenderComponent,
    ConversionsImpressionsComponent,
    AgeBreakdownComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    HttpClientModule,
    NgApexchartsModule,
    AngularSvgIconModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBG3YReMMbQ9XhcsxJzNvTZwK3Qbn5pebE' + '&libraries=visualization'
   }),
  ],

  providers:[
    CampaignService,
    TransactionService,
    TeamService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    }
  ]
})
export class DashboardModule {}
