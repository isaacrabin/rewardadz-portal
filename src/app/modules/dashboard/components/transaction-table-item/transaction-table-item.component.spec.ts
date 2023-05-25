import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionTableItemComponent } from './transaction-table-item.component';

describe('TransactionTableItemComponent', () => {
  let component: TransactionTableItemComponent;
  let fixture: ComponentFixture<TransactionTableItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransactionTableItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransactionTableItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
