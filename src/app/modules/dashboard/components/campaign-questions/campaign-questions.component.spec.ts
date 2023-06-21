import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignQuestionsComponent } from './campaign-questions.component';

describe('CampaignQuestionsComponent', () => {
  let component: CampaignQuestionsComponent;
  let fixture: ComponentFixture<CampaignQuestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampaignQuestionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CampaignQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
