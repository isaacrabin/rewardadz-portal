import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignBudgetComponent } from './campaign-budget.component';

describe('CampaignBudgetComponent', () => {
  let component: CampaignBudgetComponent;
  let fixture: ComponentFixture<CampaignBudgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampaignBudgetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CampaignBudgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
