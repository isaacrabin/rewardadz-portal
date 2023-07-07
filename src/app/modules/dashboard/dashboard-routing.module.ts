import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { NftComponent } from './pages/nft/nft.component';
import { PrimaryCampaignsComponent } from './pages/primary-campaigns/primary-campaigns.component';
import { SecondaryCampaignsComponent } from './pages/secondary-campaigns/secondary-campaigns.component';
import { ExpenditureComponent } from './pages/expenditure/expenditure.component';
import { RevenueComponent } from './pages/revenue/revenue.component';
import { ApiKeyComponent } from './pages/api-key/api-key.component';
import { RolesComponent } from './pages/roles/roles.component';
import { TeamComponent } from './pages/team/team.component';
import { NewCampaignComponent } from './pages/new-campaign/new-campaign.component';
import { EditCampaignComponent } from './components/edit-campaign/edit-campaign.component';
import { CampaignInfoComponent } from './components/campaign-info/campaign-info.component';
import { NewRoleComponent } from './components/new-role/new-role.component';
import { NewUserComponent } from './components/new-user/new-user.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'analytics', pathMatch: 'full' },
      { path: 'analytics', component: NftComponent },
      { path: 'primary-campaigns', component: PrimaryCampaignsComponent },
      { path: 'secondary-campaigns', component: SecondaryCampaignsComponent },
      { path: 'expenditure', component: ExpenditureComponent },
      { path: 'revenue', component: RevenueComponent },
      { path: 'api-key', component: ApiKeyComponent },
      { path: 'roles', component: RolesComponent },
      { path: 'team', component: TeamComponent},
      { path: 'edit-campaign/:id', component: EditCampaignComponent},
      { path: 'campaign-info/:id', component: CampaignInfoComponent},
      { path: 'campaign-questions/:id', component: CampaignInfoComponent},
      { path: 'new-campaign', component: NewCampaignComponent},
      { path: 'new-role', component: NewRoleComponent},
      { path: 'new-user', component: NewUserComponent},
      { path: '**', redirectTo: 'error/404' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
