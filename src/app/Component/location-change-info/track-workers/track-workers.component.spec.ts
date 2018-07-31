import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackWorkersComponent } from './track-workers.component';

describe('TrackWorkersComponent', () => {
  let component: TrackWorkersComponent;
  let fixture: ComponentFixture<TrackWorkersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackWorkersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackWorkersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
