import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMinuteDetailsComponent } from './view-minute-details.component';

describe('ViewMinuteDetailsComponent', () => {
  let component: ViewMinuteDetailsComponent;
  let fixture: ComponentFixture<ViewMinuteDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewMinuteDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewMinuteDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
