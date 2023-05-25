import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignClicksComponent } from './campaign-clicks.component';

describe('CampaignClicksComponent', () => {
  let component: CampaignClicksComponent;
  let fixture: ComponentFixture<CampaignClicksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampaignClicksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CampaignClicksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
