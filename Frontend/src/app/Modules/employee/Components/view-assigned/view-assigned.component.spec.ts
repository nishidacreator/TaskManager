import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAssignedComponent } from './view-assigned.component';

describe('ViewAssignedComponent', () => {
  let component: ViewAssignedComponent;
  let fixture: ComponentFixture<ViewAssignedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewAssignedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewAssignedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
