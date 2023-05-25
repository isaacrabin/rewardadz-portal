import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampainDetailsComponent } from './campain-details.component';

describe('CampainDetailsComponent', () => {
  let component: CampainDetailsComponent;
  let fixture: ComponentFixture<CampainDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampainDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CampainDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
