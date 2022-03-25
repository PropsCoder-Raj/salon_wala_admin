import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreadVendorComponent } from './bread-vendor.component';

describe('BreadVendorComponent', () => {
  let component: BreadVendorComponent;
  let fixture: ComponentFixture<BreadVendorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BreadVendorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BreadVendorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
