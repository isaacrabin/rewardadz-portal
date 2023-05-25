import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignMetricsComponent } from './campaign-metrics.component';

describe('CampaignMetricsComponent', () => {
  let component: CampaignMetricsComponent;
  let fixture: ComponentFixture<CampaignMetricsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampaignMetricsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CampaignMetricsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
