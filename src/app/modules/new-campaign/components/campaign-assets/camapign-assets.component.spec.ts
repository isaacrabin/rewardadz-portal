import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CamapignAssetsComponent } from './camapign-assets.component';

describe('CamapignAssetsComponent', () => {
  let component: CamapignAssetsComponent;
  let fixture: ComponentFixture<CamapignAssetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CamapignAssetsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CamapignAssetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
