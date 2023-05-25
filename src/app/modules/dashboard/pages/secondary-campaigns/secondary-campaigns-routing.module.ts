import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SecondaryCampaignsComponent } from './secondary-campaigns.component';

const routes: Routes = [
  {
    path: 'secondary-campaigns',
    component: SecondaryCampaignsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecondaryCampaignsRoutingModule { }
