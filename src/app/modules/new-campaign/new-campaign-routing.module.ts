import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CampaignDetailsComponent } from './components/campaign-details/campaign-details.component';
import { CamapignAssetsComponent } from './components/campaign-assets/camapign-assets.component';
import { CampaignMetricsComponent } from './components/campaign-metrics/campaign-metrics.component';
import { LocationComponent } from './components/location/location.component';
import { CampaignBudgetComponent } from './components/campaign-budget/campaign-budget.component';

const routes: Routes = [
  {
    path:'',
    redirectTo:'campaign-details',
    pathMatch:'full'
  },
  {
    path:'campaign-details',
    component: CampaignDetailsComponent
  },
  {
    path:'files',
    component: CamapignAssetsComponent
  },
  {
    path:'metrics',
    component: CampaignMetricsComponent
  },
  {
    path:'location',
    component: LocationComponent
  },
  {
    path:'budget',
    component: CampaignBudgetComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewCampaignRoutingModule { }
