import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreadCategoryComponent } from './bread-category.component';

describe('BreadCategoryComponent', () => {
  let component: BreadCategoryComponent;
  let fixture: ComponentFixture<BreadCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BreadCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BreadCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
