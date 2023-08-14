import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptTraineeComponent } from './accept-trainee.component';

describe('AcceptTraineeComponent', () => {
  let component: AcceptTraineeComponent;
  let fixture: ComponentFixture<AcceptTraineeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcceptTraineeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcceptTraineeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
