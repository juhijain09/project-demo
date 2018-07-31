import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackAssetsComponent } from './track-assets.component';

describe('TrackAssetsComponent', () => {
  let component: TrackAssetsComponent;
  let fixture: ComponentFixture<TrackAssetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackAssetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackAssetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
