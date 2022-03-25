import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreadTaxComponent } from './bread-tax.component';

describe('BreadTaxComponent', () => {
  let component: BreadTaxComponent;
  let fixture: ComponentFixture<BreadTaxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BreadTaxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BreadTaxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
