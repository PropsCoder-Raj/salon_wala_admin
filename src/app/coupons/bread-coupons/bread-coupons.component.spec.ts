import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreadCouponsComponent } from './bread-coupons.component';

describe('BreadCouponsComponent', () => {
  let component: BreadCouponsComponent;
  let fixture: ComponentFixture<BreadCouponsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BreadCouponsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BreadCouponsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
