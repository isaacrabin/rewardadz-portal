import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgeBreakdownComponent } from './age-breakdown.component';

describe('AgeBreakdownComponent', () => {
  let component: AgeBreakdownComponent;
  let fixture: ComponentFixture<AgeBreakdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgeBreakdownComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgeBreakdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
