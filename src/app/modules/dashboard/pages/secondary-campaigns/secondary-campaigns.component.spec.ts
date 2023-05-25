import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondaryCampaignsComponent } from './secondary-campaigns.component';

describe('SecondaryCampaignsComponent', () => {
  let component: SecondaryCampaignsComponent;
  let fixture: ComponentFixture<SecondaryCampaignsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecondaryCampaignsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SecondaryCampaignsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
