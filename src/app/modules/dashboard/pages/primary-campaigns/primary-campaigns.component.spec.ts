import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimaryCampaignsComponent } from './primary-campaigns.component';

describe('PrimaryCampaignsComponent', () => {
  let component: PrimaryCampaignsComponent;
  let fixture: ComponentFixture<PrimaryCampaignsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrimaryCampaignsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrimaryCampaignsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
