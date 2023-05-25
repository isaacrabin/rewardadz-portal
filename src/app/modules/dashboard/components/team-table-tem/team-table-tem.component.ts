import { Component, Input } from '@angular/core';
import { Team } from '../../models/team';

@Component({
  selector: '[app-team-table-tem]',
  templateUrl: './team-table-tem.component.html',
  styleUrls: ['./team-table-tem.component.scss']
})
export class TeamTableTemComponent {
  @Input() team = <Team>{};
}
