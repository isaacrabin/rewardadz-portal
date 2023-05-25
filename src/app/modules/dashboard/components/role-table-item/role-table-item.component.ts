import { Component, Input } from '@angular/core';
import { Role } from '../../models/role';

@Component({
  selector: '[app-role-table-item]',
  templateUrl: './role-table-item.component.html',
  styleUrls: ['./role-table-item.component.scss']
})
export class RoleTableItemComponent {
  @Input() role = <Role>{};
}
