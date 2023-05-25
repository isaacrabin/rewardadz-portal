import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignGenderComponent } from './campaign-gender.component';

describe('CampaignGenderComponent', () => {
  let component: CampaignGenderComponent;
  let fixture: ComponentFixture<CampaignGenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampaignGenderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CampaignGenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
