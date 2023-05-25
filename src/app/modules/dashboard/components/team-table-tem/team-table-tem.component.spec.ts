import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamTableTemComponent } from './team-table-tem.component';

describe('TeamTableTemComponent', () => {
  let component: TeamTableTemComponent;
  let fixture: ComponentFixture<TeamTableTemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamTableTemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamTableTemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
