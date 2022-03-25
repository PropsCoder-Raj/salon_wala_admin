import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreadProductsComponent } from './bread-products.component';

describe('BreadProductsComponent', () => {
  let component: BreadProductsComponent;
  let fixture: ComponentFixture<BreadProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BreadProductsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BreadProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
