import { Component, Input } from '@angular/core';
import { Transaction } from '../../models/transactions';

@Component({
  selector: '[app-transaction-table-item]',
  templateUrl: './transaction-table-item.component.html',
  styleUrls: ['./transaction-table-item.component.scss']
})
export class TransactionTableItemComponent {
 @Input() transaction = <Transaction>{};


}
