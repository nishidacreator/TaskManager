import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMinutesComponent } from './view-minutes.component';

describe('ViewMinutesComponent', () => {
  let component: ViewMinutesComponent;
  let fixture: ComponentFixture<ViewMinutesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewMinutesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewMinutesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
