import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BidJobListComponent } from './bid-job-list.component';

describe('BidJobListComponent', () => {
  let component: BidJobListComponent;
  let fixture: ComponentFixture<BidJobListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BidJobListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BidJobListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
