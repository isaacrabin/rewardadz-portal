import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoQuestionsComponent } from './video-questions.component';

describe('VideoQuestionsComponent', () => {
  let component: VideoQuestionsComponent;
  let fixture: ComponentFixture<VideoQuestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VideoQuestionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VideoQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
