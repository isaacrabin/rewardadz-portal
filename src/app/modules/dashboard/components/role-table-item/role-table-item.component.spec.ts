import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleTableItemComponent } from './role-table-item.component';

describe('RoleTableItemComponent', () => {
  let component: RoleTableItemComponent;
  let fixture: ComponentFixture<RoleTableItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoleTableItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoleTableItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
