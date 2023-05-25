import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConversionsImpressionsComponent } from './conversions-impressions.component';

describe('ConversionsImpressionsComponent', () => {
  let component: ConversionsImpressionsComponent;
  let fixture: ComponentFixture<ConversionsImpressionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConversionsImpressionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConversionsImpressionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
