import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationChangeInfoComponent } from './location-change-info.component';

describe('LocationChangeInfoComponent', () => {
  let component: LocationChangeInfoComponent;
  let fixture: ComponentFixture<LocationChangeInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationChangeInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationChangeInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
