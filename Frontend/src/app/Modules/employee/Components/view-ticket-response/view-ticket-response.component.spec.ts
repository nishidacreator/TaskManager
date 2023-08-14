import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTicketResponseComponent } from './view-ticket-response.component';

describe('ViewTicketResponseComponent', () => {
  let component: ViewTicketResponseComponent;
  let fixture: ComponentFixture<ViewTicketResponseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewTicketResponseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewTicketResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
